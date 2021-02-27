import {
  Box,
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { BiLogIn } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { useMeQuery } from "../../generated/graphql";
import { REGULAR_BROWN } from "../../utils/colors";
import { isServer } from "../../utils/isServer";
import { LOGIN_LABEL, REGISTER_LABEL } from "../../utils/strings";
import { Login } from "../Login";

export const ProfileLinks: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const {
    isOpen: loginOpen,
    onOpen: openLogin,
    onClose: closeLogin,
  } = useDisclosure();

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
                {REGISTER_LABEL}
              </Button>
            </NextLink>
            <Button
              variant="solid"
              bgColor={REGULAR_BROWN}
              color="white"
              colorScheme="blue"
              onClick={openLogin}
            >
              <Icon as={BiLogIn} mr={2} />
              {LOGIN_LABEL}
            </Button>
          </Flex>
        )}
      </Stack>
      <Login onClose={closeLogin} isOpen={loginOpen} />
    </Box>
  );
};
