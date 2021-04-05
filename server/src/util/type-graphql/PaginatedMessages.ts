import { Message } from "../../entities/Message";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedMessages {
  @Field(() => [Message])
  messages: Message[];

  @Field(() => Boolean, { defaultValue: false })
  hasMore?: boolean;
}
