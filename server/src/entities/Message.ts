import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Conversation } from "./Conversation";
import { User } from "./User";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
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

  @Field({ defaultValue: false })
  @Column({ default: false })
  read: boolean;
}
