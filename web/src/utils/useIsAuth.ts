import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { ERROR_GENERIC, ERROR_NOT_AUTHORIZED } from "./strings";
import { useBetterToast } from "./useSuccessToast";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const toast = useBetterToast();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/");
      toast("error", ERROR_GENERIC);
    }
  }, [fetching, data, router]);
};
