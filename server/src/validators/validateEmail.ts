import { FieldError } from "../util/type-graphql/FieldError";
import { INCORRECT_EMAIL_FORMAT } from "../resource/strings";

export const validateEmail = (newEmail?: string): FieldError[] | null => {
  if (!newEmail) {
    return null;
  }

  const errors = [];

  if (!newEmail.includes("@")) {
    errors.push({
      field: "email",
      message: INCORRECT_EMAIL_FORMAT,
    });
  }

  return errors.length === 0 ? null : errors;
};
