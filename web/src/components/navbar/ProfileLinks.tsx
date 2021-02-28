import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { LIGHTER_REGULAR_BROWN, REGULAR_BROWN } from "../../utils/colors";
import { isServer } from "../../utils/isServer";
import { LOGIN_LABEL, LOGOUT_LABEL, REGISTER_LABEL } from "../../utils/strings";
import { LoginDialogue } from "../LoginDialogue";

export const ProfileLinks: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [{ data, fetching: meFetching }] = useMeQuery({ pause: isServer() });
  const {
    isOpen: loginOpen,
    onOpen: openLogin,
    onClose: closeLogin,
  } = useDisclosure();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const router = useRouter();

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
        {meFetching ? (
          "..."
        ) : data?.me ? (
          <Flex align="center" justify="space-between">
            <Text mr={4}>{data.me.username}</Text>
            <Button
              bgColor={REGULAR_BROWN}
              _hover={{ bgColor: LIGHTER_REGULAR_BROWN }}
              onClick={async () => {
                await logout();
                router.reload();
              }}
              isLoading={logoutFetching}
            >
              <Icon as={BiLogOut} color="white" />
            </Button>
          </Flex>
        ) : (
          <Flex justify="space-between">
            <NextLink href="/register">
              <Button
                mr={5}
                variant="solid"
                bgColor={REGULAR_BROWN}
                color="white"
                _hover={{ bgColor: LIGHTER_REGULAR_BROWN }}
              >
                <Icon as={FaUserPlus} mr={2} />
                {REGISTER_LABEL}
              </Button>
            </NextLink>
            <Button
              variant="solid"
              bgColor={REGULAR_BROWN}
              color="white"
              _hover={{ bgColor: LIGHTER_REGULAR_BROWN }}
              onClick={openLogin}
            >
              <Icon as={BiLogIn} mr={2} />
              {LOGIN_LABEL}
            </Button>
          </Flex>
        )}
      </Stack>
      <LoginDialogue onClose={closeLogin} isOpen={loginOpen} />
    </Box>
  );
};
