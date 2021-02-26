import { CacheExchangeOpts } from "@urql/exchange-graphcache/dist/types/cacheExchange";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const cacheExchanges: CacheExchangeOpts = {
  updates: {
    Mutation: {
      register: (_result, args, cache, info) => {
        betterUpdateQuery<RegisterMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if (result.register.errors) {
              return query;
            } else {
              return {
                me: result.register.user,
              };
            }
          }
        );
      },
      login: (_result, args, cache, info) => {
        betterUpdateQuery<LoginMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if (result.login.errors) {
              return query;
            } else {
              return {
                me: result.login.user,
              };
            }
          }
        );
      },
    },
  },
};
