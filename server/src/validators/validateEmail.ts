import { FieldError } from "src/util/type-graphql/FieldError";
import { INCORRECT_EMAIL_FORMAT } from "../resource/strings";

export const validateEmail = (newEmail: string) => {
  const errors = [];

  if (!newEmail.includes("@")) {
    errors.push({
      field: "email",
      message: INCORRECT_EMAIL_FORMAT,
    });
  }

  return errors.length === 0 ? null : errors;
};
