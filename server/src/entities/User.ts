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

  @Field(() => Boolean)
  @Column({ default: false })
  banned: boolean;

  @OneToMany(() => Ad, (ad) => ad.owner)
  ads: Ad[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
