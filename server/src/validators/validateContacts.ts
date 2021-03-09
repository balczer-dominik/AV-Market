import { ContactsInput } from "src/util/type-graphql/ContactsInput";
import { FieldError } from "src/util/type-graphql/FieldError";
import { validateEmail } from "./validateEmail";
import { validatePhone } from "./validatePhone";

export const validateContacts = ({
  email,
  phone,
}: ContactsInput): FieldError[] | null => {
  let errors: FieldError[] = [];

  const emailValidation = validateEmail(email);
  const phoneValidation = validatePhone(phone);

  if (emailValidation) {
    errors = errors.concat(emailValidation);
  }

  if (phoneValidation) {
    errors = errors.concat(phoneValidation);
  }

  return errors.length === 0 ? null : errors;
};
