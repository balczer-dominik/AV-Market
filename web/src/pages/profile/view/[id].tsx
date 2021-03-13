import { Box, Flex, Heading, HStack, Image } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../../components/Layout";
import { UserCard } from "../../../components/profile/UserCard";
import { User } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetUserFromId } from "../../../utils/useGetUserFromId";

interface ViewProfileProps {}

const ViewProfile: React.FC<ViewProfileProps> = ({}) => {
  const [{ data }] = useGetUserFromId();
  const user = data ? data.user : null;
  return (
    <Layout>
      {user ? (
        <Flex align="flex-start" flexDir={{ base: "column", md: "row" }} mx={5}>
          <UserCard
            userId={user.id}
            username={user.username}
            avatarSrc={user.avatar}
            karmaP={34}
            karmaN={3}
            adCount={user.adCount}
            deliveryCount={5}
          />
          <HStack>
            {/* <UserDetails />
          <AdRecent />
          <UserRatings /> */}
          </HStack>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ViewProfile);
