import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { AdImage } from "./AdImage";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Field()
  @Column({ default: false })
  featured: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
