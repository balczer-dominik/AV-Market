import { User } from "../entities/User";
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
import { FindConditions, LessThan } from "typeorm";
import { Ad } from "../entities/Ad";
import { Feedback } from "../entities/Feedback";
import { isAuth } from "../middleware/authMiddleware";
import {
  AD_ARCHIEVED,
  AD_NOT_FOUND,
  AD_NOT_OWNED_BY_SPECIFIED_USER,
  ERROR_CANNOT_RATE_SELF,
  ERROR_GENERIC,
  FEEDBACK_NOT_FOUND,
  UNAUTHORIZED,
} from "../resource/strings";
import { MyContext } from "../types";
import { errorResponse } from "../util/errorResponse";
import { FeedbackInput } from "../util/type-graphql/FeedbackInput";
import { FeedbackResponse } from "../util/type-graphql/FeedbackResponse";
import { FieldError } from "../util/type-graphql/FieldError";
import { PaginatedFeedbacks } from "../util/type-graphql/PaginatedFeedback";

@Resolver(Feedback)
export class FeedbackResolver {
  @FieldResolver(() => User)
  async author(@Root() feedback: Feedback) {
    return await User.findOne(feedback.authorId);
  }

  @FieldResolver(() => User)
  async recipient(@Root() feedback: Feedback) {
    return await User.findOne(feedback.recipientId);
  }

  @FieldResolver(() => User)
  async ad(@Root() feedback: Feedback) {
    return await Ad.findOne(feedback.adId);
  }

  @Query(() => PaginatedFeedbacks)
  async feedbacks(
    @Arg("first", () => Int, { defaultValue: 8 }) first: number,
    @Arg("authorId", () => Int, { nullable: true }) authorId?: number,
    @Arg("recipientId", () => Int, { nullable: true }) recipientId?: number,
    @Arg("cursor", () => String, { nullable: true }) cursor?: string | null,
    @Arg("satisified", () => Boolean, { nullable: true }) satisfied?: boolean
  ): Promise<PaginatedFeedbacks> {
    const firstPlusOne = first + 1;

    if ((authorId && recipientId) || (!authorId && !recipientId)) {
      return { feedbacks: [], hasMore: false };
    }

    let conditions: FindConditions<Feedback>;

    if (authorId) {
      conditions = { authorId };
    } else {
      conditions = { recipientId };
    }

    //Satisfied filter
    if (typeof satisfied === "boolean") {
      conditions = { ...conditions, satisfied };
    }

    //Cursor
    if (cursor) {
      conditions = {
        ...conditions,
        createdAt: LessThan(new Date(parseInt(cursor))),
      };
    }

    const result = await Feedback.find({
      where: conditions,
      order: { createdAt: "DESC" },
      take: firstPlusOne,
    });

    return {
      feedbacks: result.slice(0, first),
      hasMore: result.length === firstPlusOne,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => FeedbackResponse)
  async leaveFeedback(
    @Arg("options", () => FeedbackInput)
    { adId, recipientId, comment, satisfied }: FeedbackInput,
    @Ctx() { req }: MyContext
  ) {
    const ad = await Ad.findOne(adId);

    if (!ad) {
      return errorResponse("ad", AD_NOT_FOUND);
    }

    if (recipientId === req.session.userId) {
      return errorResponse("feedback", ERROR_CANNOT_RATE_SELF);
    }

    if (ad.archieved) {
      return errorResponse("ad", AD_ARCHIEVED);
    }

    if (ad.ownerId !== recipientId) {
      return errorResponse("ad", AD_NOT_OWNED_BY_SPECIFIED_USER);
    }

    const generated: Partial<Feedback> = (
      await Feedback.insert({
        adId,
        recipientId,
        comment,
        satisfied,
        authorId: req.session.userId!,
      })
    ).raw[0];

    if (!generated?.id) {
      return errorResponse("feedback", ERROR_GENERIC);
    }

    console.log(generated);

    return {
      feedback: { comment, ...generated, adId, recipientId, satisfied },
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => FieldError, { nullable: true })
  async deleteFeedback(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    const feedback = await Feedback.findOne(id);

    if (!feedback) {
      return errorResponse("feedback", FEEDBACK_NOT_FOUND);
    }

    if (feedback.authorId !== req.session.userId) {
      return errorResponse("feedback", UNAUTHORIZED);
    }

    feedback.remove();

    return null;
  }
}
