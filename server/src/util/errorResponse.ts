import { FieldError } from "./type-graphql/FieldError";

type Field =
  | "username"
  | "password"
  | "email"
  | "usernameOrEmail"
  | "avatar"
  | "oldPassword"
  | "newPassword"
  | "id"
  | "ad"
  | "feedback"
  | "message"
  | "partnerUsername"
  | "buyer"
  | "seller"
  | "driver"
  | "time"
  | "location";

export const errorResponse = (
  field: Field,
  message: string
): { errors: [FieldError] } => {
  return {
    errors: [{ field, message }],
  };
};
