import { Feedback } from "../../entities/Feedback";
import { ObjectType, Field } from "type-graphql";
import { Response } from "./Response";

@ObjectType()
export class FeedbackResponse extends Response {
  @Field(() => Feedback, { nullable: true })
  feedback?: Feedback;
}
