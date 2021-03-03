import { MainCategory, Wear } from "../resource/strings";
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
  location!: string;

  @Field()
  @Column()
  price!: number;

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

  @OneToMany(() => AdImage, (adImage) => adImage.ad)
  images: AdImage[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
