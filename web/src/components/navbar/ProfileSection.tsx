import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useContext } from "react";
import { BiLogIn } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { LOGIN_LABEL, REGISTER_LABEL } from "../../utils/strings";
import { ThemeContext } from "../../utils/ThemeProvider";
import { LoginDialogue } from "../LoginDialogue";
import { PostAdButton } from "./PostAdButton";
import { ProfileContainer } from "./ProfileContainer";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const ProfileSection: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const {
    theme: { FRONT_COLOR_LIGHTER, WHITE, FRONT_COLOR_ALT },
  } = useContext(ThemeContext);
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
            <ThemeSwitcher />
            <PostAdButton />
            <ProfileContainer />
          </Flex>
        ) : (
          <Flex justify="space-between">
            <ThemeSwitcher />
            <HStack>
              <NextLink href="/register">
                <Link>
                  <IconButton
                    p={2}
                    bgColor={FRONT_COLOR_ALT}
                    color={WHITE}
                    _hover={{ bgColor: FRONT_COLOR_LIGHTER }}
                    as={FaUserPlus}
                    aria-label={REGISTER_LABEL}
                  />
                </Link>
              </NextLink>

              <Link>
                <IconButton
                  bgColor={FRONT_COLOR_ALT}
                  color={WHITE}
                  _hover={{ bgColor: FRONT_COLOR_LIGHTER }}
                  onClick={openLogin}
                  aria-label={LOGIN_LABEL}
                  as={BiLogIn}
                  p={2}
                />
              </Link>
            </HStack>
          </Flex>
        )}
      </Stack>
      <LoginDialogue onClose={closeLogin} isOpen={loginOpen} />
    </Box>
  );
};
