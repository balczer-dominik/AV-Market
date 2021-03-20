import { SortByOption } from "./type-graphql/AdSortingOptions";

export const formatCursor = (raw: string | null, sortBy: SortByOption) => {
  if (!raw) return null;
  console.log(sortBy);
  switch (sortBy) {
    case "createdAt":
      return new Date(parseInt(raw));
    case "updatedAt":
      return new Date(parseInt(raw));
    case "price":
      return parseInt(raw);
    default:
      return null;
  }
};
