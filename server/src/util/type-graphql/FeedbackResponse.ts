import { Feedback } from "../../entities/Feedback";
import { ObjectType, Field } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType()
export class FeedbackResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Feedback, { nullable: true })
  feedback?: Feedback;
}
