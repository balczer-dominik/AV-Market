import { Ad } from "../../entities/Ad";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType()
export class AdResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Ad, { nullable: true })
  ad?: Ad;
}
