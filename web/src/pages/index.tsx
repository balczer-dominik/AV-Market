import { Stack, VStack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import { Layout } from "@components/Layout";
import { createUrqlClient } from "@utils/createUrqlClient";
import { SHOP_LABEL } from "@utils/strings";
import { withUrqlClient } from "next-urql";
import React from "react";

const Index = () => (
  <Layout title="Főoldal" variant="regular">
    <VStack>
      <Stack flexDir={{ base: "column", md: "row" }}>
        <VStack>
          <Heading>{SHOP_LABEL}</Heading>
        </VStack>
      </Stack>
    </VStack>
  </Layout>
);

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
