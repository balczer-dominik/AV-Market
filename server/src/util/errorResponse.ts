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
  | "message";

export const errorResponse = (field: Field, message: string) => {
  return {
    errors: [{ field, message }],
  };
};
