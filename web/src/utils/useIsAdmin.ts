import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { ACCESS_DENIED, ERROR_GENERIC, ERROR_NOT_AUTHORIZED } from "./strings";
import { useBetterToast } from "./useSuccessToast";

export const useIsAdmin = () => {
  const [{ data, fetching }] = useMeQuery();
  const toast = useBetterToast();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/");
      toast("error", ERROR_GENERIC, ERROR_NOT_AUTHORIZED);
    }

    if (!fetching && data?.me && data.me.id !== 15) {
      router.replace("/");
      toast("error", ERROR_GENERIC, ACCESS_DENIED);
    }
  }, [fetching, data, router]);
};
