import { UserResponse } from "./type-graphql/UserResponse";

type Field =
  | "username"
  | "password"
  | "email"
  | "usernameOrEmail"
  | "avatar"
  | "oldPassword"
  | "newPassword"
  | "id";

export const errorResponse = (field: Field, message: string): UserResponse => {
  return {
    errors: [{ field, message }],
  };
};
