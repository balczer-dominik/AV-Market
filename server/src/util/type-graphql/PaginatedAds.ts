import { Ad } from "../../entities/Ad";
import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/User";

@ObjectType()
export class PaginatedAds {
  @Field(() => User, { nullable: true })
  owner?: User;
  @Field(() => [Ad])
  ads: Ad[];
  @Field()
  hasMore: boolean;
}
