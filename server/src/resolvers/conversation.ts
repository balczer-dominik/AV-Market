import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection, Not } from "typeorm";
import { Conversation } from "../entities/Conversation";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { isAuth } from "../middleware/authMiddleware";
import { MyContext } from "../types";
import { PaginatedConversations } from "../util/type-graphql/PaginatedConversations";

@Resolver(Conversation)
export class ConversationResolver {
  @UseMiddleware(isAuth)
  @FieldResolver(() => Message)
  async latest(@Root() conversation: Conversation) {
    return await Message.findOne({
      where: { conversationId: conversation.id },
      order: { createdAt: "DESC" },
    });
  }

  @UseMiddleware(isAuth)
  @FieldResolver(() => User)
  async partner(
    @Root() conversation: Conversation,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    return (await Conversation.findOne(conversation.id, {
      relations: ["participants"],
    }))!.participants.find((p) => p.id !== req.session.userId)!;
  }

  @UseMiddleware(isAuth)
  @FieldResolver(() => [User])
  async participants(@Root() conversation: Conversation): Promise<User[]> {
    return (await Conversation.findOne(conversation.id, {
      relations: ["participants"],
    }))!.participants;
  }

  @UseMiddleware(isAuth)
  @Query(() => PaginatedConversations, { nullable: true })
  async recentConversations(
    @Ctx() { req }: MyContext,
    @Arg("first", () => Int, { defaultValue: 10 }) first: number,
    @Arg("cursor", () => String, { nullable: true }) cursor?: string,
    @Arg("partnerUsernameFilter", () => String, { nullable: true })
    partnerUsernameFilter?: string
  ): Promise<PaginatedConversations> {
    const limitPlusOne = first + 1;
    const userId = req.session.userId!;

    const query = await getConnection()
      .createQueryBuilder()
      .select('"candidateId"', "id")
      .from((qb) => {
        return qb
          .select("*")
          .addSelect(
            'MAX("createdAt") over (partition by messages."conversationId")',
            "newest"
          )
          .from(Message, "messages")
          .innerJoin(
            (qb) => {
              return qb
                .select('"innerQuery"."conversationId"', "candidateId")
                .addSelect('"innerQuery"."partnerId"', "partnerId")
                .addSelect("participants.id", "ownId")
                .from(Conversation, "cOwn")
                .innerJoin("cOwn.participants", "participants")
                .innerJoinAndSelect(
                  (qb) => {
                    return qb
                      .select("cPartner.id", "conversationId")
                      .addSelect("participants.id", "partnerId")
                      .from(Conversation, "cPartner")
                      .innerJoin("cPartner.participants", "participants")
                      .where(
                        "participants.username LIKE :partnerUsernameFilter",
                        {
                          partnerUsernameFilter: `%${partnerUsernameFilter}%`,
                        }
                      )
                      .andWhere("participants.id != :userId", { userId });
                  },
                  "innerQuery",
                  '"innerQuery"."conversationId" = "cOwn"."id"'
                )
                .where("participants.id = :userId", { userId });
            },
            "candidates",
            `"candidateId" = messages."conversationId"`
          );
      }, "partitionQuery")
      .where(`"partitionQuery"."createdAt" = "partitionQuery"."newest"`)
      .orderBy(`"partitionQuery"."newest"`, "DESC");

    if (cursor) {
      query.andWhere(`"partitionQuery"."newest" < :cursor`, {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const conversations = await query.take(limitPlusOne).getRawMany();

    return {
      conversations: conversations.slice(0, first),
      hasMore: conversations.length === limitPlusOne,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async readConversation(
    @Arg("conversationId", () => Int) conversationId: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const userId = req.session.userId;

    await Message.update(
      { conversationId, authorId: Not(userId!) },
      { read: true }
    );

    return true;
  }
}
