import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../../components/Layout";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface ViewProfileProps {}

const ViewProfile: React.FC<ViewProfileProps> = ({}) => {
  return (
    <Layout>
      <Flex align="flex-start" mx={5}>
        <Box display={{ base: "none", md: "block" }} px={2}>
          <Image
            src={"https://placedog.net/250/250?random"}
            borderRadius="10px"
            mb={3}
          />
          <Heading size={"md"}>{"username"}</Heading>
        </Box>
        <Box>
          <Box>Sor1</Box>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ViewProfile);
