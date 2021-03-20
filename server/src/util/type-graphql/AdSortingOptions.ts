import { Field, InputType, registerEnumType } from "type-graphql";

export enum SortByOption {
  createdAt = "createdAt",
  price = "price",
  updatedAt = "updatedAt",
}

export enum OrderOption {
  DESC = "DESC",
  ASC = "ASC",
}

@InputType()
export class AdSortingOptions {
  @Field(() => SortByOption, { defaultValue: SortByOption.createdAt })
  sortBy: SortByOption;
  @Field(() => OrderOption, { defaultValue: OrderOption.DESC })
  order: OrderOption;
}

export const registerAdSortingEnums = () => {
  registerEnumType(SortByOption, {
    name: "SortByOption",
    description: "Options for sorting ads",
  });
  registerEnumType(OrderOption, { name: "OrderOption" });
};
