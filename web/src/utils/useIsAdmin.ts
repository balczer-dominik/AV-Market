import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { ACCESS_DENIED, ERROR_GENERIC, ERROR_NOT_AUTHORIZED } from "./strings";

export const useIsAdmin = () => {
  const [{ data, fetching }] = useMeQuery();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/");
      toast({
        title: ERROR_GENERIC,
        description: ERROR_NOT_AUTHORIZED,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    if (!fetching && data?.me && data.me.id !== 15) {
      router.replace("/");
      toast({
        title: ERROR_GENERIC,
        description: ACCESS_DENIED,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [fetching, data, router]);
};
