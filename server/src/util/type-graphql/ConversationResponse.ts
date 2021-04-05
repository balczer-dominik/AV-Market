import { Field, ObjectType } from "type-graphql";
import { Conversation } from "../../entities/Conversation";
import { FieldError } from "./FieldError";

@ObjectType()
export class ConversationResponse {
  @Field(() => Conversation, { nullable: true })
  conversation?: Conversation;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
