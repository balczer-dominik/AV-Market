import { User } from "../../entities/User";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserResponse extends Response {
  @Field(() => User, { nullable: true })
  user?: User;
}
