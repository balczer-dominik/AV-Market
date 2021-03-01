import { CacheExchangeOpts } from "@urql/exchange-graphcache/dist/types/cacheExchange";
import {
  ChangeEmailMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeFullDocument,
  MeFullQuery,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const cacheExchanges: CacheExchangeOpts = {
  updates: {
    Mutation: {
      register: (_result, _args, cache, _info) => {
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
      login: (_result, _args, cache, _info) => {
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
      logout: (_result, _args, cache, _info) => {
        betterUpdateQuery<LogoutMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          () => ({ me: null })
        );
      },
    },
  },
};
