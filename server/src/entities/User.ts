import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { Feedback } from "./Feedback";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  county?: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  city?: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  messenger?: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  phone?: string;

  @Field(() => Boolean)
  @Column({ default: false })
  banned: boolean;

  @OneToMany(() => Ad, (ad) => ad.owner)
  ads: Ad[];

  @OneToMany(() => Feedback, (feedback) => feedback.author)
  feedbacks: Feedback[];

  @OneToMany(() => Feedback, (feedback) => feedback.recipient)
  karma: Feedback[];

  @OneToMany(() => Message, (message) => message.author)
  sentMessages: Feedback[];

  @OneToMany(() => Message, (message) => message.recipient)
  receivedMessages: Feedback[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
