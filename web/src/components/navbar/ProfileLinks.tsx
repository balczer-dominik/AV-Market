import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTER_REGULAR_LIGHT_BROWN,
  REGULAR_BROWN,
} from "../../utils/colors";
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
            <NextLink href="/profile/edit">
              <Link>
                <Flex
                  mr={2}
                  align={"center"}
                  flexDir={{ base: "row", md: "row-reverse" }}
                >
                  <Image
                    mr={2}
                    borderRadius={"5px"}
                    borderColor={LIGHTER_REGULAR_BROWN}
                    borderWidth={3}
                    borderStyle="solid"
                    h={10}
                    w={10}
                    src={`/avatar/${data.me.avatar}.png`}
                    fallback={
                      <Flex
                        align={"center"}
                        justify={"center"}
                        bgColor={LIGHTER_REGULAR_LIGHT_BROWN}
                        h={10}
                        w={10}
                        borderRadius={"5px"}
                        border={`3px ${LIGHTER_REGULAR_BROWN} solid`}
                      >
                        <Icon as={FaUser} h={6} w={6} />
                      </Flex>
                    }
                  />
                  <Text mr={2}>{data.me.username}</Text>
                </Flex>
              </Link>
            </NextLink>
            <IconButton
              bgColor={REGULAR_BROWN}
              color="white"
              _hover={{ bgColor: LIGHTER_REGULAR_BROWN }}
              onClick={async () => {
                await logout();
                router.replace("/");
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
