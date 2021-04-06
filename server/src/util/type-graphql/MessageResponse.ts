import { Field, ObjectType } from "type-graphql";
import { Message } from "../../entities/Message";
import { FieldError } from "./FieldError";

@ObjectType()
export class MessageResponse {
  @Field(() => Message, { nullable: true })
  message?: Message;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
