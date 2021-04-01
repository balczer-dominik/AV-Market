import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class KarmaResponse {
  @Field(() => Int)
  satisfied: number;
  @Field(() => Int)
  unsatisfied: number;
}
