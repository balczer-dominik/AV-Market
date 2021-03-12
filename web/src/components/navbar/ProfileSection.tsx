import {
  Box,
  Flex,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { BiLogIn } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { useMeQuery } from "../../generated/graphql";
import { LIGHTER_REGULAR_BROWN, REGULAR_BROWN } from "../../utils/colors";
import { isServer } from "../../utils/isServer";
import { LOGIN_LABEL, REGISTER_LABEL } from "../../utils/strings";
import { LoginDialogue } from "../LoginDialogue";
import { PostAdButton } from "./PostAdButton";
import { ProfileContainer } from "./ProfileContainer";

export const ProfileSection: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [{ data, fetching: meFetching }] = useMeQuery({ pause: isServer() });
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
          <Flex
            align={{ base: "unset", md: "center" }}
            flexDir={{ base: "column", md: "row" }}
          >
            <PostAdButton />
            <ProfileContainer />
          </Flex>
        ) : (
          <Flex justify="space-between">
            <NextLink href="/register">
              <Link>
                <IconButton
                  mr={3}
                  p={2}
                  bgColor={REGULAR_BROWN}
                  color="white"
                  _hover={{ bgColor: LIGHTER_REGULAR_BROWN }}
                  as={FaUserPlus}
                  aria-label={REGISTER_LABEL}
                />
              </Link>
            </NextLink>
            <Link>
              <IconButton
                bgColor={REGULAR_BROWN}
                color="white"
                _hover={{ bgColor: LIGHTER_REGULAR_BROWN }}
                onClick={openLogin}
                aria-label={LOGIN_LABEL}
                as={BiLogIn}
                p={2}
              />
            </Link>
          </Flex>
        )}
      </Stack>
      <LoginDialogue onClose={closeLogin} isOpen={loginOpen} />
    </Box>
  );
};
