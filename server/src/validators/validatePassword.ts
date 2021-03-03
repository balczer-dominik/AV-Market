import { PASSWORD_TOO_LONG, PASSWORD_TOO_SHORT } from "../resource/strings";

export const validatePassword = (password: string) => {
  const errors = [];

  if (password.length < 8) {
    errors.push({
      field: "password",
      message: PASSWORD_TOO_SHORT,
    });
  }

  if (password.length > 32) {
    errors.push({
      field: "password",
      message: PASSWORD_TOO_LONG,
    });
  }

  return errors.length === 0 ? null : errors;
};
