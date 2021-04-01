import { InputType, Field } from "type-graphql";

@InputType()
export class FeedbackInput {
  @Field()
  recipientId: number;
  @Field()
  adId: number;
  @Field()
  satisfied: boolean;
  @Field({ nullable: true })
  comment?: string;
}
