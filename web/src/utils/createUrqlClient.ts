import {
  cacheExchange,
  dedupExchange,
  errorExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
    },
    exchanges: [dedupExchange, ssrExchange, fetchExchange],
  };
};
