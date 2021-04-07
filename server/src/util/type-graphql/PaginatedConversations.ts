import { Conversation } from "../../entities/Conversation";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedConversations {
  @Field(() => [Conversation])
  conversations: Conversation[];

  @Field({ defaultValue: false })
  hasMore: boolean;
}
