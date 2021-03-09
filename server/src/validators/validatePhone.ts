import { FieldError } from "../util/type-graphql/FieldError";
import {
  INCORRECT_PHONE_FORMAT,
  INCORRECT_PHONE_LENGTH,
} from "../resource/strings";

export const validatePhone = (phone?: string): FieldError[] | null => {
  if (!phone) {
    return null;
  }

  const errors: FieldError[] = [];

  if (!phone.match(/^[0-9]*$/)) {
    errors.push({
      field: "phone",
      message: INCORRECT_PHONE_FORMAT,
    });
  }

  if (phone.length !== 9) {
    errors.push({
      field: "phone",
      message: INCORRECT_PHONE_LENGTH,
    });
  }

  return errors.length === 0 ? null : errors;
};
