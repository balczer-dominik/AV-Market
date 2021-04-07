import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { FindConditions, getConnection, LessThan } from "typeorm";
import { Conversation } from "../entities/Conversation";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { isAuth } from "../middleware/authMiddleware";
import {
  ERROR_WRONG_PARAMTERES,
  UNAUTHORIZED,
  USER_NOT_FOUND,
} from "../resource/strings";
import { MessagePayload, MyContext } from "../types";
import { errorResponse } from "../util/errorResponse";
import { MessageResponse } from "../util/type-graphql/MessageResponse";
import { PaginatedMessages } from "../util/type-graphql/PaginatedMessages";

@Resolver(Message)
export class MessageResolver {
  @FieldResolver(() => User)
  async author(@Root() message: Message) {
    return await User.findOne(message.authorId);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => MessageResponse)
  async sendMessage(
    @Ctx() { req }: MyContext,
    @Arg("content", () => String) content: string,
    @PubSub() pubsub: PubSubEngine,
    @Arg("partnerUsername", () => String, { nullable: true })
    partnerUsername?: string,
    @Arg("conversationId", () => Int, { nullable: true })
    convoId?: number
  ): Promise<MessageResponse> {
    const ownId = req.session.userId!;
    let conversationId = convoId;

    //Check if we got both or neither partner and conversationId (only one can and must be supplied at one)
    if (
      (partnerUsername && conversationId) ||
      (!partnerUsername && !conversationId)
    ) {
      return errorResponse("message", ERROR_WRONG_PARAMTERES);
    }

    //User supplied partnerId
    if (partnerUsername) {
      //We check if the partner exists
      const partner = await User.findOne({
        where: { username: partnerUsername },
      });
      if (!partner) {
        return errorResponse("partnerUsername", USER_NOT_FOUND);
      }

      //Get their conversation
      const result = await getConnection()
        .createQueryBuilder()
        .select(`"conversationId"`)
        .addSelect(`COUNT(*) as matches`)
        .from((subQuery) => {
          return subQuery
            .select("*")
            .from(Conversation, `Conversation`)
            .leftJoin(`Conversation.participants`, "participants")
            .where("participants.id = :ownId", { ownId })
            .orWhere("participants.id = :partnerId", { partnerId: partner.id });
        }, "subQuery")
        .having(`COUNT(*) = :match`, { match: 2 })
        .groupBy('"subQuery"."conversationId"')
        .getRawOne();

      conversationId = result ? result.conversationId : null;

      // if(conversationId){
      //   return errorResponse("partnerUsername", CONVERSATION_ALREADY_EXISTS)
      // }

      //If it doesn't exist, we create one
      if (!conversationId) {
        const user = await User.findOne(ownId);
        const newConvo = new Conversation();
        newConvo.participants = [user!, partner];
        conversationId = (await newConvo.save()).id;
      }
    }
    //User supplied the conversationId
    else {
      //We check if he is in the conversation (or if it even exists)
      const authorized = await getConnection()
        .createQueryBuilder()
        .select("*")
        .from(Conversation, `Conversation`)
        .leftJoin(`Conversation.participants`, "participants")
        .where("participants.id = :ownId", { ownId })
        .andWhere("Conversation.id = :conversationId", { conversationId })
        .getRawOne();
      if (!authorized) {
        return errorResponse("message", UNAUTHORIZED);
      }
    }

    const message = new Message();
    message.content = content;
    message.authorId = ownId;
    message.conversationId = conversationId!;
    await message.save();

    const conversation = await Conversation.findOne({
      relations: ["participants", "messages"],
      where: { id: conversationId },
    });

    pubsub.publish("message", {
      message,
      recipientIds: conversation!.participants
        .filter((p) => p.id !== ownId)
        .map((r) => r.id),
    } as MessagePayload);

    return { message };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async readMessages(
    @Ctx() { req }: MyContext,
    @Arg("conversationId", () => Int) conversationId: number
  ): Promise<Boolean> {
    const userId = req.session.userId;

    const conversation = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Conversation, `Conversation`)
      .leftJoin(`Conversation.participants`, "participants")
      .leftJoin(`Conversation.messages`, "messages")
      .where("participants.id = :userId", { userId })
      .andWhere("messages.read = false")
      .andWhere("Conversation.id = :conversationId", { conversationId })
      .getRawMany();

    //Authorization
    if (conversation.length === 0) {
      return false;
    }

    const messages = await Message.findByIds(conversation.map((m) => m.id));
    messages.forEach((m) => (m.read = true));
    await Message.save(messages);

    return true;
  }

  //Might not use it
  @UseMiddleware(isAuth)
  @Query(() => PaginatedMessages, { nullable: true })
  async messages(
    @Ctx() { req }: MyContext,
    @Arg("conversationId", () => Int) conversationId: number,
    @Arg("first", () => Int, { defaultValue: 20 }) first: number,
    @Arg("cursor", () => String, { nullable: true }) cursor?: string
  ): Promise<PaginatedMessages> {
    const userId = req.session.userId!;
    const limitPlusOne = first + 1;

    const conversation = await Conversation.findOne(conversationId, {
      relations: ["participants"],
    });

    //Authorization
    if (!conversation) {
      return { messages: [] };
    }

    if (!conversation.participants.map((p) => p.id).includes(userId)) {
      return { messages: [] };
    }

    const conditions: FindConditions<Message> = {
      conversationId,
    };

    if (cursor) {
      conditions.createdAt = LessThan(new Date(parseInt(cursor)));
    }

    const messages = await Message.find({
      where: conditions,
      take: limitPlusOne,
      order: { createdAt: "DESC" },
    });

    return {
      messages: messages.slice(0, first),
      partner: conversation.participants.filter((p) => p.id !== userId)[0],
      hasMore: messages.length === limitPlusOne,
    };
  }

  @Subscription(() => Message, {
    topics: "message",
    filter: ({ context: { req }, payload }) =>
      payload.recipientIds.includes(req.session.userId),
  })
  async messageNotification(@Root() payload: MessagePayload): Promise<Message> {
    return payload.message;
  }
}
