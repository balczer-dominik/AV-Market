import { PubSubEngine } from "graphql-subscriptions";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { FindConditions, getConnection, LessThan } from "typeorm";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { isAuth } from "../middleware/authMiddleware";
import { MyContext } from "../types";
import { MessagesResponse } from "../util/type-graphql/MessagesResponse";

@Resolver(Message)
export class MessageResolver {
  @FieldResolver(() => User, { nullable: true })
  async author(@Root() message: Message): Promise<User | undefined> {
    const author = await User.findOne(message.authorId);
    return author;
  }

  @FieldResolver(() => User, { nullable: true })
  async recipient(@Root() message: Message): Promise<User | undefined> {
    const recipient = await User.findOne(message.recipientId);
    return recipient;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Message)
  async sendMessage(
    @Arg("recipientId", () => Int) recipientId: number,
    @Arg("content") content: string,
    @Ctx() { req }: MyContext,
    @PubSub() pubsub: PubSubEngine
  ): Promise<Partial<Message>> {
    const authorId = req.session.userId!;

    const partial: Partial<Message> = {
      authorId,
      recipientId,
      content,
    };

    const generated: Message = (await Message.insert(partial)).raw[0];

    pubsub.publish("message", { ...partial, ...generated });

    return { ...partial, ...generated };
  }

  @UseMiddleware(isAuth)
  @Query(() => [Message])
  async recentMessages(
    @Ctx() { req }: MyContext,
    @Arg("first", () => Int, { defaultValue: 10 }) first: number,
    @Arg("cursor", () => String, { nullable: true }) cursor?: string
  ): Promise<Message[]> {
    const recipientId = req.session.userId!;

    const query = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from((subQuery) => {
        return subQuery
          .select("*")
          .from(Message, "Message")
          .where('"Message"."recipientId" = :recipientId', { recipientId })
          .distinctOn(['"Message"."authorId"'])
          .orderBy('"Message"."authorId"')
          .addOrderBy('"Message"."createdAt"', "DESC");
      }, "grouped");

    if (cursor) {
      query.where('grouped."createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const messages: Message[] = await query.take(first).getRawMany();

    return messages;
  }

  @UseMiddleware(isAuth)
  @Query(() => MessagesResponse)
  async messages(
    @Ctx() { req }: MyContext,
    @Arg("partnerId", () => Int) partnerId: number,
    @Arg("first", () => Int, { defaultValue: 20 }) first: number,
    @Arg("cursor", () => String, { nullable: true }) cursor?: string
  ): Promise<MessagesResponse> {
    const ownId = req.session.userId!;

    const author = await User.findOne(partnerId);
    if (!author) {
      return { messages: [], author };
    }

    const query = Message.createQueryBuilder()
      .where(
        '"Message"."authorId" = :partnerId AND "Message"."recipientId" = :ownId',
        { ownId, partnerId }
      )
      .orWhere(
        '"Message"."authorId" = :ownId AND "Message"."recipientId" = :partnerId',
        { ownId, partnerId }
      )
      .orderBy('"Message"."createdAt"', "DESC");

    if (cursor) {
      query.andWhere('"Message"."createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const messages = await query.take(first).getMany();

    return { messages, author };
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
