import { Field, ObjectType } from "type-graphql";
import { Message } from "../../entities/Message";
import { FieldError } from "./FieldError";

@ObjectType()
export class MessageResponse extends Response {
  @Field(() => Message, { nullable: true })
  message?: Message;
}
