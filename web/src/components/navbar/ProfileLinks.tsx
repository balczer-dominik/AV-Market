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
      w={{ base: null, md: "25%" }}
    >
      <Stack
        spacing={3}
        align="left"
        justify={{ base: "flex-start", md: "flex-end" }}
        direction={{ base: "column", md: "row" }}
      >
        {meFetching ? (
          "..."
        ) : data?.me ? (
          <Flex align="center" justify="space-between">
            <Text mr={4}>{data.me.username}</Text>
            <IconButton
              bgColor={REGULAR_BROWN}
              color="white"
              _hover={{ bgColor: LIGHTER_REGULAR_BROWN }}
              onClick={async () => {
                await logout();
                router.reload();
              }}
              aria-label={LOGOUT_LABEL}
              as={BiLogOut}
              p={2}
            />
          </Flex>
        ) : (
          <Flex justify="space-between">
            <NextLink href="/register">
              <IconButton
                mr={3}
                p={2}
                bgColor={REGULAR_BROWN}
                color="white"
                _hover={{ bgColor: LIGHTER_REGULAR_BROWN }}
                as={FaUserPlus}
                aria-label={REGISTER_LABEL}
              />
            </NextLink>
            <IconButton
              bgColor={REGULAR_BROWN}
              color="white"
              _hover={{ bgColor: LIGHTER_REGULAR_BROWN }}
              onClick={openLogin}
              aria-label={LOGIN_LABEL}
              as={BiLogIn}
              p={2}
            />
          </Flex>
        )}
      </Stack>
      <LoginDialogue onClose={closeLogin} isOpen={loginOpen} />
    </Box>
  );
};
