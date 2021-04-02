import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sentMessages)
  author!: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.receivedMessages)
  recipient!: User;

  @Field()
  @Column()
  authorId!: number;

  @Field()
  @Column()
  recipientId!: number;

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
