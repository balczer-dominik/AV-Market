import { CacheExchangeOpts } from "@urql/exchange-graphcache/dist/types/cacheExchange";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  UploadAvatarMutation,
} from "@generated/graphql";
import { betterUpdateQuery } from "@utils/urql/betterUpdateQuery";

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
      uploadAvatar: (_result, _args, cache, _info) => {
        betterUpdateQuery<UploadAvatarMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          () => ({ me: null })
        );
      },
    },
  },
};
