import dateFormat from "dateformat";

export const formatDateMessage = (raw: string) => {
  const date = new Date(parseInt(raw));
  const now = new Date();
  const difference = now.getTime() - date.getTime();

  const oneDay = 1000 * 3600 * 24;
  const oneYear = oneDay * 365;

  const format =
    difference > oneYear
      ? "yyyy.mm.dd."
      : difference > oneDay
      ? "mm.dd."
      : "HH:MM";

  return dateFormat(date, format);
};

export const formatDate = (raw: string) =>
  dateFormat(new Date(parseInt(raw)), "yyyy.mm.dd. HH:MM");

export const formatDateWithSeconds = (raw: string) =>
  dateFormat(new Date(parseInt(raw)), "yyyy.mm.dd. HH:MM:ss");
