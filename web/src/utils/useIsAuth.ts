import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/");
      toast({
        title: "Hiba",
        description: "Hiba",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [fetching, data, router]);
};
