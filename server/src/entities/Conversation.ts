import { Field, ObjectType } from "type-graphql";
import { Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Message } from "./Message";
import { User } from "./User";

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable()
  participants: User[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
