import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity as BaseEntityORM,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
export class BaseEntity extends BaseEntityORM {
  @Field()
  @PrimaryGeneratedColumn()
  protected id!: number;

  @Field(() => String)
  @CreateDateColumn()
  protected createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  protected updatedAt: Date;
}
