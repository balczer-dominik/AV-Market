import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@ObjectType()
@Entity()
export class Delivery extends BaseEntity {
  //Users

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.deliveriesFromUser)
  seller: User;

  @Field()
  @Column({ nullable: false })
  sellerId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.deliveriesToUser)
  buyer: User;

  @Field()
  @Column({ nullable: false })
  buyerId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.deliveriesByUser)
  driver: User;

  @Field()
  @Column({ nullable: false })
  driverId: number;

  //Approvals

  @Field()
  @Column({ default: null })
  sellerApproval?: boolean;

  @Field()
  @Column({ default: null })
  driverApproval?: boolean;

  //Details

  @Field()
  @Column({ nullable: false })
  location: string;
}
