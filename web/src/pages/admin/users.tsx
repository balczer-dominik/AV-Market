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
import { Layout } from "@components/Layout";
import { UserAdminRow } from "@components/UserAdminRow";
import { useGetUsersQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import { isServer } from "@utils/isServer";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useIsAdmin } from "@utils/hooks/useIsAdmin";
import { withUrqlClient } from "next-urql";
import React, { useContext, useState } from "react";

const Users: React.FC<{}> = () => {
  useIsAdmin();
  const {
    theme: { FRONT_COLOR_LIGHTER, FRONT_COLOR_LIGHTEST, WHITE },
  } = useContext(ThemeContext);
  const [page, setPage] = useState(0);
  const [{ data }] = useGetUsersQuery({
    variables: { limit: 5, offset: 5 * page },
    pause: isServer(),
  });

  return (
    <Layout title="Felhasználók kezelése" variant="regular">
      {data ? (
        <Box>
          <Table mb={10} size={"sm"}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Avatar</Th>
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
                color={WHITE}
                bgColor={FRONT_COLOR_LIGHTER}
                _hover={{ bgColor: FRONT_COLOR_LIGHTEST }}
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
                bgColor={FRONT_COLOR_LIGHTER}
                _hover={{ bgColor: FRONT_COLOR_LIGHTEST }}
                color={WHITE}
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
