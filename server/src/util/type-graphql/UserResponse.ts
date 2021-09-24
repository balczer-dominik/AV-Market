import { User } from "../../entities/User";
import { Field, ObjectType } from "type-graphql";
import { Response } from "./Response";

@ObjectType()
export class UserResponse extends Response {
  @Field(() => User, { nullable: true })
  user?: User;
}
