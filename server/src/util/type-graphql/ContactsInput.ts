import { InputType, Field } from "type-graphql";

@InputType()
export class ContactsInput {
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  messenger?: string;
  @Field({ nullable: true })
  phone?: string;
}
