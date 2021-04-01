import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { User } from "./User";

@ObjectType()
@Entity()
export class Feedback extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
