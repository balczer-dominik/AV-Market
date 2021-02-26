import * as Yup from "yup";
import {
  FIELD_REQUIRED,
  INCORRECT_EMAIL_FORMAT,
  USERNAME_TOO_LONG,
  USERNAME_TOO_SHORT,
} from "./strings";

export const RegisterValidator = Yup.object().shape({
  email: Yup.string().email(INCORRECT_EMAIL_FORMAT).required(FIELD_REQUIRED),
  username: Yup.string()
    .min(5, USERNAME_TOO_SHORT)
    .max(20, USERNAME_TOO_LONG)
    .required(FIELD_REQUIRED),
});
