import {
  PRICE_TOO_HIGH,
  PRICE_TOO_LOW,
  TITLE_TOO_LONG,
  TITLE_TOO_SHORT,
} from "../resource/strings";

export const validatePost = (title: string, price: number) => {
  const errors = [];

  if (price <= 0) {
    errors.push({
      field: "price",
      message: PRICE_TOO_LOW,
    });
  }

  if (price > 10 * 1000 * 1000 * 1000) {
    errors.push({
      field: "price",
      message: PRICE_TOO_HIGH,
    });
  }

  if (title.length < 5) {
    errors.push({
      field: "title",
      message: TITLE_TOO_SHORT,
    });
  }

  if (title.length > 60) {
    errors.push({
      field: "title",
      message: TITLE_TOO_LONG,
    });
  }

  return errors.length === 0 ? null : errors;
};
