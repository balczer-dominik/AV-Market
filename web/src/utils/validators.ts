import * as Yup from "yup";
import {
  FIELD_REQUIRED,
  INCORRECT_EMAIL_FORMAT,
  PASSWORDS_MUST_MATCH,
  PASSWORD_DOESNT_CONTAIN_CAPITAL,
  PASSWORD_TOO_LONG,
  PASSWORD_TOO_SHORT,
  PRICE_CONTAINS_FORBIDDEN,
  PRICE_TOO_HIGH,
  PRICE_TOO_LOW,
  TITLE_TOO_LONG,
  TITLE_TOO_SHORT,
  USERNAME_CONTAINS_FORBIDDEN,
  USERNAME_TOO_LONG,
  USERNAME_TOO_SHORT,
} from "@utils/strings";

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

const titleValidation = Yup.string()
  .required(FIELD_REQUIRED)
  .min(5, TITLE_TOO_SHORT)
  .max(60, TITLE_TOO_LONG);

const priceValidation = Yup.number()
  .typeError(PRICE_CONTAINS_FORBIDDEN)
  .min(50, PRICE_TOO_LOW)
  .max(999999999, PRICE_TOO_HIGH);

const priceValidationRequired = priceValidation.required();

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

export const PostValidator = Yup.object().shape({
  title: titleValidation,
  price: priceValidationRequired,
});

export const SearchAdValidation = Yup.object().shape({
  priceLower: priceValidation,
  priceUpper: priceValidation,
});
