import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { UserAdminRow } from "../../components/UserAdminRow";
import { useGetUsersQuery } from "../../generated/graphql";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTEST_REGULAR_BROWN,
} from "../../utils/colors";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import { useIsAdmin } from "../../utils/useIsAdmin";

interface UsersProps {}

const Users: React.FC<UsersProps> = ({}) => {
  useIsAdmin();
  const [page, setPage] = useState(0);
  const [{ data, fetching }, getUsers] = useGetUsersQuery({
    variables: { limit: 5, offset: 5 * page },
    pause: isServer(),
  });

  return (
    <Layout variant="regular">
      {data ? (
        <Box>
          <Table mb={10} size={"sm"}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Username</Th>
                <Th>E-mail</Th>
                <Th>Banned</Th>
                <Th textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.getUsers.users.map((user) => (
                <UserAdminRow user={user} />
              ))}
            </Tbody>
          </Table>
          <Flex justify="space-between" my={10} align="center">
            <Flex w={"40%"} justify="flex-start">
              <Button
                color={"white"}
                bgColor={LIGHTER_REGULAR_BROWN}
                _hover={{ bgColor: LIGHTEST_REGULAR_BROWN }}
                display={page !== 0 ? "block" : "none"}
                onClick={() => setPage(page - 1)}
              >
                Previous page
              </Button>
            </Flex>
            <Box w={"20%"} textAlign="center">
              <Text>Page {page + 1}</Text>
            </Box>

            <Flex w={"40%"} justify="flex-end">
              <Button
                bgColor={LIGHTER_REGULAR_BROWN}
                _hover={{ bgColor: LIGHTEST_REGULAR_BROWN }}
                color={"white"}
                display={data?.getUsers.hasMore ? "block" : "none"}
                onClick={() => setPage(page + 1)}
              >
                Next page
              </Button>
            </Flex>
          </Flex>
        </Box>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Users);
