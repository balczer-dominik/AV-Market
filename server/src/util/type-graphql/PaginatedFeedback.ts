import { Field, ObjectType } from "type-graphql";
import { Feedback } from "../../entities/Feedback";

@ObjectType()
export class PaginatedFeedbacks {
  @Field(() => [Feedback])
  feedbacks: Feedback[];
  @Field()
  hasMore: boolean;
}
