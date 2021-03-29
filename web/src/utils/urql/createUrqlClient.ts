import { cacheExchange } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { dedupExchange } from "urql";
import { cacheExchanges } from "@utils/urql/cacheExchanges";

export const createUrqlClient = (ssrExchange: any) => {
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
    },
    exchanges: [
      dedupExchange,
      ssrExchange,
      multipartFetchExchange,
      cacheExchange(cacheExchanges),
    ],
  };
};
