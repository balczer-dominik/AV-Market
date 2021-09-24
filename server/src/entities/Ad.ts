import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { AdImage } from "./AdImage";
import { Feedback } from "./Feedback";
import { User } from "./User";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  price!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  desc: string;

  @Field()
  @Column()
  wear!: string;

  @Field()
  @Column()
  category!: string;

  @Field()
  @Column()
  subCategory!: string;

  @Field()
  @ManyToOne(() => User, (user) => user.ads)
  owner!: User;

  @Field()
  @Column()
  ownerId!: number;

  @OneToMany(() => AdImage, (adImage) => adImage.ad)
  images: AdImage[];

  @OneToMany(() => Feedback, (feedback) => feedback.ad)
  feedbacks: Feedback[];

  @Field()
  @Column({ default: false })
  featured: boolean;

  @Field()
  @Column({ default: false })
  archieved: boolean;
}
