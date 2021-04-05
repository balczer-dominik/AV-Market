import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable()
  participants: User[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
