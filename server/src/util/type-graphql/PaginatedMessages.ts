import { Message } from "../../entities/Message";
import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/User";

@ObjectType()
export class PaginatedMessages {
  @Field(() => [Message])
  messages: Message[];

  @Field(() => User, { nullable: true })
  partner?: User;

  @Field(() => Boolean, { defaultValue: false })
  hasMore?: boolean;
}
