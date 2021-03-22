import dateFormat from "dateformat";

export const formatDate = (raw: string) =>
  dateFormat(new Date(parseInt(raw)), "yyyy.mm.dd. HH:MM");
