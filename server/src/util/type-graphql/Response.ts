import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType()
export class Response {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
