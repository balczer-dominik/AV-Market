export const formatLocation = (county: string, city: string) =>
  `${county ? county + (city ? ", " : "") : ""}${city ?? ""}`;
