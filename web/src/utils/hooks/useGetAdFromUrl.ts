import { useRouter } from "next/router";
import { useAdQuery } from "@generated/graphql";

export const useGetAdFromUrl = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching }] = useAdQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  const ad = !fetching && data ? data.ad.ad : null;

  return { fetching, ad };
};
