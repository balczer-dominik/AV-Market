import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class NearbyDriver extends User {
  @Field({ nullable: true })
  distance?: number;
}
