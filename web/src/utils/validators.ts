import * as Yup from "yup";
import {
  FIELD_REQUIRED,
  INCORRECT_EMAIL_FORMAT,
  PASSWORDS_MUST_MATCH,
  PASSWORD_DOESNT_CONTAIN_CAPITAL,
  PASSWORD_TOO_LONG,
  PASSWORD_TOO_SHORT,
  USERNAME_TOO_LONG,
  USERNAME_TOO_SHORT,
} from "./strings";

export const RegisterValidator = Yup.object().shape({
  email: Yup.string().required(FIELD_REQUIRED).email(INCORRECT_EMAIL_FORMAT),
  username: Yup.string()
    .required(FIELD_REQUIRED)
    .min(5, USERNAME_TOO_SHORT)
    .max(20, USERNAME_TOO_LONG),
  password: Yup.string()
    .required(FIELD_REQUIRED)
    .min(8, PASSWORD_TOO_SHORT)
    .max(32, PASSWORD_TOO_LONG)
    .matches(/\w*[A-Z]\w*/, PASSWORD_DOESNT_CONTAIN_CAPITAL),
  passwordConfirm: Yup.string()
    .required(FIELD_REQUIRED)
    .oneOf([Yup.ref("password"), null], PASSWORDS_MUST_MATCH),
});
