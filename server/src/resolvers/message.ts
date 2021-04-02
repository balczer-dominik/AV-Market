import { PubSubEngine } from "graphql-subscriptions";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
  PubSub,
} from "type-graphql";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { isAuth } from "../middleware/authMiddleware";
import { MyContext } from "../types";

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

  //TODO: pagination
  @UseMiddleware(isAuth)
  @Query(() => [Message])
  async recentMessages(@Ctx() { req }: MyContext): Promise<Message[]> {
    const recipientId = req.session.userId!;

    const test = Message.createQueryBuilder()
      .where('"Message"."recipientId" = :recipientId', { recipientId })
      .distinctOn(['"Message"."authorId"'])
      .orderBy('"Message"."authorId"')
      .addOrderBy('"Message"."createdAt"', "DESC")
      //   .addSelect('MAX("Message"."createdAt")', "latest")
      //   .addGroupBy('"Message"."authorId"')
      .getMany();

    return test;
  }

  @Subscription(() => Message, {
    topics: "message",
    filter: ({ context: { req }, payload }) =>
      req.session.userId === payload.recipientId,
  })
  async messageNotification(
    @Root() message: Message,
    @Ctx() context: MyContext
  ): Promise<Message> {
    console.log(context);
    return message;
  }
}
