import {
  Arg,
  Ctx,
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
import { MyContext } from "../types";
import { errorResponse } from "../util/errorResponse";
import { ConversationResponse } from "../util/type-graphql/ConversationResponse";
import { PaginatedMessages } from "../util/type-graphql/PaginatedMessages";

@Resolver(Message)
export class MessageResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => ConversationResponse)
  async sendMessage(
    @Ctx() { req }: MyContext,
    @Arg("content", () => String) content: string,
    @PubSub() pubsub: PubSubEngine,
    @Arg("partnerUsername", () => String, { nullable: true })
    partnerUsername?: string,
    @Arg("conversationId", () => Int, { nullable: true })
    convoId?: number
  ): Promise<ConversationResponse> {
    const ownId = req.session.userId!;
    let conversationId = convoId;

    //Check if we got both or neither partner and conversationId (only one can and must be supplied at one)
    if (
      (partnerUsername && conversationId) ||
      (!partnerUsername && !conversationId)
    ) {
      console.log("both");
      return errorResponse("message", ERROR_WRONG_PARAMTERES);
    }

    //User supplied partnerId
    if (partnerUsername) {
      //We check if the partner exists
      const partner = await User.findOne({
        where: { username: partnerUsername },
      });
      if (!partner) {
        return errorResponse("message", USER_NOT_FOUND);
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
      console.log(authorized);
      if (!authorized) {
        return errorResponse("message", UNAUTHORIZED);
      }
    }

    const message = new Message();
    message.content = content;
    message.authorId = ownId;
    message.conversationId = conversationId!;

    const saved = await message.save();

    pubsub.publish("message", saved);

    const conversation = await Conversation.findOne({
      relations: ["participants", "messages"],
      where: { id: conversationId },
    });

    return { conversation };
  }

  @UseMiddleware(isAuth)
  @Query(() => [Message])
  async recentMessages(
    @Ctx() { req }: MyContext,
    @Arg("first", () => Int, { defaultValue: 10 }) first: number,
    @Arg("cursor", () => String, { nullable: true }) cursor?: string
  ): Promise<Message[]> {
    const ownId = req.session.userId!;

    //Get their conversation
    const query = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from((qb) => {
        return qb
          .select("*")
          .addSelect(
            'MAX("subQuery"."createdAt") over (partition by "subQuery"."conversationId")',
            "newest"
          )
          .from((subQuery) => {
            return subQuery
              .select(`Conversation.id`, "conversationId")
              .addSelect(`messages.id`, "messageId")
              .addSelect(`messages.createdAt`, "createdAt")
              .from(Conversation, `Conversation`)
              .leftJoin(`Conversation.messages`, "messages")
              .leftJoin(`Conversation.participants`, "participants")
              .where("participants.id = :ownId", { ownId });
          }, "subQuery");
      }, "partitionQuery")
      .where(`"partitionQuery"."createdAt" = "partitionQuery"."newest"`)
      .orderBy(`"partitionQuery"."newest"`, "DESC");

    if (cursor) {
      query.andWhere(`"partitionQuery"."newest" < :cursor`, {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const raw = await query.take(first).getRawMany();
    const messages = await Message.findByIds(raw.map((r) => r.messageId));

    return messages;
  }

  //Might not use it
  @UseMiddleware(isAuth)
  @Query(() => Conversation, { nullable: true })
  async conversation(
    @Ctx() { req }: MyContext,
    @Arg("conversationId", () => Int) conversationId: number
  ): Promise<Conversation | undefined> {
    const userId = req.session.userId!;

    const conversation = await Conversation.findOne(conversationId, {
      relations: ["participants", "messages"],
    });

    //Authorization
    if (!conversation) {
      return undefined;
    }

    if (!conversation.participants.map((p) => p.id).includes(userId)) {
      return undefined;
    }

    conversation.messages = conversation.messages.reverse();

    return conversation;
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
      hasMore: messages.length === limitPlusOne,
    };
  }

  @Subscription(() => Message, {
    topics: "message",
    filter: ({ context: { req }, payload }) =>
      req.session.userId === payload.recipientId,
  })
  async messageNotification(@Root() message: Message): Promise<Message> {
    return message;
  }
}
