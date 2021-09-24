import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Ad } from "./Ad";
import { User } from "./User";

@ObjectType()
@Entity()
export class Feedback extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.feedbacks)
  author!: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.karma)
  recipient!: User;

  @Field(() => Ad)
  @ManyToOne(() => Ad, (ad) => ad.feedbacks)
  ad!: Ad;

  @Field()
  @Column()
  authorId!: number;

  @Field()
  @Column()
  recipientId!: number;

  @Field()
  @Column()
  adId!: number;

  @Field()
  @Column()
  satisfied!: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  comment?: string;
}
