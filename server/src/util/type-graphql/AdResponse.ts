import { Ad } from "../../entities/Ad";
import { Field, ObjectType } from "type-graphql";
import { Response } from "./Response";

@ObjectType()
export class AdResponse extends Response {
  @Field(() => Ad, { nullable: true })
  ad?: Ad;
}
