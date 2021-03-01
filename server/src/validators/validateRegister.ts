import {
  INCORRECT_EMAIL_FORMAT,
  PASSWORD_TOO_SHORT,
  USERNAME_CONTAINS_FORBIDDEN,
  USERNAME_TOO_SHORT,
} from "../resource/strings";
import { UsernamePasswordInput } from "../util/type-graphql/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  const errors = [];

  if (!options.email.includes("@")) {
    errors.push({
      field: "email",
      message: INCORRECT_EMAIL_FORMAT,
    });
  }

  if (options.username.length < 5) {
    errors.push({
      field: "username",
      message: USERNAME_TOO_SHORT,
    });
  }

  if (options.username.includes("@")) {
    errors.push({
      field: "username",
      message: USERNAME_CONTAINS_FORBIDDEN,
    });
  }

  if (options.password.length < 8) {
    errors.push({
      field: "password",
      message: PASSWORD_TOO_SHORT,
    });
  }

  return errors.length === 0 ? null : errors;
};
