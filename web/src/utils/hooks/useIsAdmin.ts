import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "@generated/graphql";
import {
  ERROR_NOT_AUTHORIZED,
  ERROR_GENERIC,
  ERROR_NOT_AUTHENTICATED,
} from "src/resources/strings";
import { useBetterToast } from "@utils/hooks/useBetterToast";

export const useIsAdmin = () => {
  const [{ data, fetching }] = useMeQuery();
  const toast = useBetterToast();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.push("/");
      toast("error", ERROR_GENERIC, ERROR_NOT_AUTHENTICATED);
    }

    if (!fetching && data?.me && data.me.id !== 15) {
      router.push("/");
      toast("error", ERROR_GENERIC, ERROR_NOT_AUTHORIZED);
    }
  }, [fetching, data, router]);
};
