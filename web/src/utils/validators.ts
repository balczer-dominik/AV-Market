import * as Yup from "yup";
import {
  FIELD_REQUIRED,
  INCORRECT_EMAIL_FORMAT,
  PASSWORDS_MUST_MATCH,
  PASSWORD_DOESNT_CONTAIN_CAPITAL,
  PASSWORD_TOO_LONG,
  PASSWORD_TOO_SHORT,
  USERNAME_CONTAINS_FORBIDDEN,
  USERNAME_TOO_LONG,
  USERNAME_TOO_SHORT,
} from "./strings";

const emailValidation = Yup.string().email(INCORRECT_EMAIL_FORMAT);

const emailValidationRequired = emailValidation.required(FIELD_REQUIRED);

const usernameValidation = Yup.string()
  .required(FIELD_REQUIRED)
  .min(5, USERNAME_TOO_SHORT)
  .max(20, USERNAME_TOO_LONG)
  .matches(/^[a-zA-Z0-9]{5,20}$/, USERNAME_CONTAINS_FORBIDDEN);

const passwordValidation = Yup.string()
  .required(FIELD_REQUIRED)
  .min(8, PASSWORD_TOO_SHORT)
  .max(32, PASSWORD_TOO_LONG)
  .matches(/\w*[A-Z]\w*/, PASSWORD_DOESNT_CONTAIN_CAPITAL);

const passwordConfirmValidation = (ref: string) =>
  Yup.string()
    .required(FIELD_REQUIRED)
    .oneOf([Yup.ref(ref), null], PASSWORDS_MUST_MATCH);

export const RegisterValidator = Yup.object().shape({
  email: emailValidationRequired,
  username: usernameValidation,
  password: passwordValidation,
  passwordConfirm: passwordConfirmValidation("password"),
});

export const ChangeEmailValidator = Yup.object().shape({
  newEmail: emailValidation,
});

export const ChangePasswordValidator = Yup.object().shape({
  newPassword: passwordValidation,
  newPasswordConfirm: passwordConfirmValidation("newPassword"),
});
