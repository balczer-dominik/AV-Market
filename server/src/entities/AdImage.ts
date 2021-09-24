import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Ad } from "./Ad";

@ObjectType()
@Entity()
export class AdImage extends BaseEntity {
  @Field()
  @Column()
  src!: string;

  @Field(() => Ad)
  @ManyToOne(() => Ad, (ad) => ad.images)
  ad!: Ad;

  @Field()
  @Column()
  adId!: number;
}
