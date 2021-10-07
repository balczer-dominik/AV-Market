import { Field, Float, InputType } from "type-graphql";

@InputType()
export class DeliveryInput {
  @Field()
  sellerId: number;

  @Field()
  driverId: number;

  @Field()
  adId: number;

  @Field(() => String)
  time: string;

  @Field(() => Float)
  longitude: number;

  @Field(() => Float)
  latitude: number;

  @Field()
  notes: string;
}
