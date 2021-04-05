import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Conversation } from "./Conversation";
import { User } from "./User";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentMessages)
  author: User;

  @Field(() => Conversation)
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Field()
  @Column()
  authorId!: number;

  @Field()
  @Column()
  conversationId!: number;

  @Field()
  @Column()
  content: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
