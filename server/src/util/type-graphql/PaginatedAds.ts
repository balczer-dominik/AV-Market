import { Ad } from "../../entities/Ad";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedAds {
  @Field(() => [Ad])
  ads: Ad[];
  @Field()
  hasMore: boolean;
}
