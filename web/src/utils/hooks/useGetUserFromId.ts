import { useUserQuery } from "@generated/graphql";
import { useGetIdFromUrl } from "@utils/hooks/useGetIdFromUrl";

export const useGetUserFromId = () => {
  const intId = useGetIdFromUrl();
  return useUserQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
