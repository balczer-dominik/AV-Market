import { Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { FaUserPlus } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import NextLink from "next/link";
import { REGULAR_BROWN } from "../../utils/colors";

export const ProfileLinks: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [{ data, fetching }] = useMeQuery();
  console.log(data);

  let content = null;

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      mb={{ base: 4, md: 0 }}
      pt={{ base: 4, md: 0 }}
      borderTop={{ base: "1px solid", md: "none" }}
    >
      <Stack
        spacing={3}
        align="left"
        justify={["flex-start", "flex-start", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
      >
        {fetching ? (
          "..."
        ) : data?.me ? (
          <Text>{data.me.username}</Text>
        ) : (
          <Flex justify="space-between">
            <NextLink href="/register">
              <Button
                mr={5}
                variant="solid"
                bgColor={REGULAR_BROWN}
                color="white"
                colorScheme="green"
              >
                <Icon as={FaUserPlus} mr={2} />
                Regisztráció
              </Button>
            </NextLink>
            <Button
              variant="solid"
              bgColor={REGULAR_BROWN}
              color="white"
              colorScheme="blue"
            >
              <Icon as={BiLogIn} mr={2} />
              Bejelentkezés
            </Button>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};
