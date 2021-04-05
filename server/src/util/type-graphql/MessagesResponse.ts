import { Message } from "../../entities/Message";
import { User } from "../../entities/User";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MessagesResponse {
  @Field(() => [Message])
  messages: Message[];

  @Field(() => User, { nullable: true })
  author?: User;
}
