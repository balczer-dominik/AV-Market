import { FieldError } from "@generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};

  if (!errors) {
    return null;
  }

  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};
