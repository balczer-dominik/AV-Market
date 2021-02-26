import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";
import { cacheExchanges } from "./cacheExchanges";

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
    },
    exchanges: [
      dedupExchange,
      ssrExchange,
      fetchExchange,
      cacheExchange(cacheExchanges),
    ],
  };
};
