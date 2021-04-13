import { cacheExchange } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { dedupExchange, subscriptionExchange } from "urql";
import { cacheExchanges } from "@utils/urql/cacheExchanges";
import { SubscriptionClient } from "subscriptions-transport-ws";

const subscriptionClient = process.browser
  ? new SubscriptionClient("ws://localhost:4000/grapqhl", { reconnect: true })
  : null;

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
      subscriptionExchange({
        forwardSubscription(operation) {
          return subscriptionClient.request(operation);
        },
      }),
    ],
  };
};
