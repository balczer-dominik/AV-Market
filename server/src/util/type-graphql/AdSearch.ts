import { InputType, Field, Int } from "type-graphql";

@InputType()
export class AdSearch {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  wear?: string;
  @Field({ nullable: true })
  category?: string;
  @Field({ nullable: true })
  subcategory?: string;
  @Field(() => Int, { nullable: true })
  priceLower?: number;
  @Field(() => Int, { nullable: true })
  priceUpper?: number;
  @Field({ nullable: true, defaultValue: "" })
  county?: string;
  @Field({ nullable: true, defaultValue: "" })
  city?: string;
}
