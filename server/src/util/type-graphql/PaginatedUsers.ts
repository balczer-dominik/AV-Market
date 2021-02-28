import { User } from "../../entities/User";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  users: User[];
  @Field()
  hasMore: boolean;
}
