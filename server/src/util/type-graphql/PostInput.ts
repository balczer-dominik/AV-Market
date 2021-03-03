import { InputType, Field, Int } from "type-graphql";

@InputType()
export class PostInput {
  @Field()
  category: string;
  @Field()
  subCategory: string;
  @Field()
  title: string;
  @Field(() => Int)
  price: number;
  @Field()
  wear: string;
}
