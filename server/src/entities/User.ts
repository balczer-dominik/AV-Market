import { Field, Float, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Ad } from "./Ad";
import { BaseEntity } from "./BaseEntity";
import { Conversation } from "./Conversation";
import { Delivery } from "./Delivery";
import { Feedback } from "./Feedback";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  //User details
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

  //Contacts

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  county?: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  city?: string;

  @Field(() => Float, { nullable: true })
  @Column("float", { default: null, nullable: true })
  longitude?: number;

  @Field(() => Float, { nullable: true })
  @Column("float", { default: null, nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  messenger?: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  phone?: string;

  //Flags

  @Field(() => Boolean)
  @Column({ default: false })
  banned: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  delivers: boolean;

  //Owned entities

  @OneToMany(() => Ad, (ad) => ad.owner)
  ads: Ad[];

  @OneToMany(() => Feedback, (feedback) => feedback.author)
  feedbacks: Feedback[];

  @OneToMany(() => Feedback, (feedback) => feedback.recipient)
  karma: Feedback[];

  @ManyToMany(() => Conversation, (conversation) => conversation.participants)
  conversations: Conversation[];

  @OneToMany(() => Message, (message) => message.author)
  sentMessages: Message[];

  @OneToMany(() => Delivery, (delivery) => delivery.seller)
  deliveriesFromUser: Delivery[];

  @OneToMany(() => Delivery, (delivery) => delivery.buyer)
  deliveriesToUser: Delivery[];

  @OneToMany(() => Delivery, (delivery) => delivery.driver)
  deliveriesByUser: Delivery[];
}
