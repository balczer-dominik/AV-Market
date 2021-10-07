import { Field, Float, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../util/type-graphql/BaseEntity";
import { Ad } from "./Ad";
import { User } from "./User";

@ObjectType()
@Entity()
export class Delivery extends BaseEntity {
  //Users

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.deliveriesFromUser)
  seller: User;

  @Field()
  @Column()
  sellerId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.deliveriesToUser)
  buyer: User;

  @Field()
  @Column()
  buyerId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.deliveriesByUser)
  driver: User;

  @Field()
  @Column()
  driverId: number;

  //Approvals

  @Field({ nullable: true })
  @Column({ default: null })
  sellerApproval?: boolean;

  @Field({ nullable: true })
  @Column({ default: null })
  driverApproval?: boolean;

  @Field({ nullable: true })
  @Column({ default: null })
  buyerApproval?: boolean;

  //Details

  @Field(() => Ad)
  @ManyToOne(() => Ad, (ad) => ad.deliveries)
  ad: Ad;

  @Field()
  @Column()
  adId: number;

  @Field(() => Float)
  @Column()
  longitude: number;

  @Field(() => Float)
  @Column()
  latitude: number;

  @Field()
  @Column({ nullable: true })
  notes?: string;

  @Field()
  @Column()
  time: Date;
}
