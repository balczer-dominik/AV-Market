import { Delivery } from "../../entities/Delivery";
import { Field, ObjectType } from "type-graphql";
import { Response } from "./Response";

@ObjectType()
export class DeliveryResponse extends Response {
  @Field(() => Delivery, { nullable: true })
  delivery?: Delivery;
}
