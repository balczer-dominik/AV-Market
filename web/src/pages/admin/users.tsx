import {
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Box,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { FaCheck, FaHammer } from "react-icons/fa";
import { Layout } from "../../components/Layout";
import { UserAdminRow } from "../../components/userAdminRow";
import {
  useBanUserMutation,
  useGetUsersQuery,
  useUnbanUserMutation,
} from "../../generated/graphql";
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
            <Box>
              <Button
                display={page !== 0 ? "block" : "none"}
                onClick={() => setPage(page - 1)}
              >
                Previous page
              </Button>
            </Box>

            <Text>Page {page + 1}</Text>
            <Box>
              <Button
                display={data?.getUsers.hasMore ? "block" : "none"}
                onClick={() => setPage(page + 1)}
              >
                Next page
              </Button>
            </Box>
          </Flex>
        </Box>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Users);
