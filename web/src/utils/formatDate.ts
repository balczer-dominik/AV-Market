import dateFormat from "dateformat";
import timeStamp from "unix-timestamp";

export const formatDate = (raw: string) =>
  dateFormat(new Date(parseInt(raw)), "yyyy.mm.dd. HH:MM");
