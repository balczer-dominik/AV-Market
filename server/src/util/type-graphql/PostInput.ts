import { GraphQLUpload } from "apollo-server-express";
import { InputType, Field, Int } from "type-graphql";
import { Upload } from "./Upload";

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
  @Field({ nullable: true })
  desc?: string;
  @Field()
  wear: string;
  @Field(() => [GraphQLUpload], { nullable: true })
  images?: [Upload];
}
