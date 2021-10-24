import { Box, Flex, VStack } from "@chakra-ui/react";
import { AdRecent } from "@components/AdRecent";
import { Layout } from "@components/Layout";
import { LocationMap } from "@components/LocationMap";
import { UserCard } from "@components/UserCard";
import { UserDetails } from "@components/UserDetails";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import { LOADING_TITLE, USERS_RECENT_ADS_LABEL } from "src/resources/strings";
import { useGetUserFromId } from "@utils/hooks/useGetUserFromId";
import { withUrqlClient } from "next-urql";
import React from "react";
import { UserRatings } from "@components/profile/UserRatings";

interface ViewProfileProps {}

const ViewProfile: React.FC<ViewProfileProps> = ({}) => {
  const [{ data, fetching }] = useGetUserFromId();
  const user = data ? data.user : null;
  return (
    <Layout title={user ? `${user.username} profilja` : LOADING_TITLE}>
      {user ? (
        <Flex
          align="flex-start"
          flexDir={{ base: "column", md: "row" }}
          mx={5}
          justify="space-between"
        >
          <UserCard
            userId={user.id}
            username={user.username}
            avatarSrc={user.avatar}
            karmaP={user.karma.satisfied}
            karmaN={user.karma.unsatisfied}
            adCount={user.adCount}
            deliveryCount={5}
            fetching={fetching}
          />
          <VStack w={{ base: "full", md: "68%" }}>
            <UserDetails
              email={user.email}
              phone={user.phone}
              messenger={user.messenger}
              city={user.city}
              county={user.county}
            />
            <LocationMap
              longitude={user.longitude}
              latitude={user.latitude}
            />
            <AdRecent
              owner={user.username}
              ownerId={user.id}
              label={USERS_RECENT_ADS_LABEL}
              recent={user.recent}
            />
            <UserRatings userId={user.id} />
          </VStack>
        </Flex>
      ) : (
        <Box>{user ? user.username : null}</Box>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(ViewProfile);
