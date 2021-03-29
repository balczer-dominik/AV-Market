import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { useLogoutMutation } from "@generated/graphql";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { IconType } from "react-icons/lib";

interface ProfileDrowDownLinkProps {
  icon: IconType;
  label: string;
  href: string;
  logout?: boolean;
}

export const ProfileDrowDownLink: React.FC<ProfileDrowDownLinkProps> = ({
  icon,
  label,
  href,
  logout = false,
}) => {
  const {
    theme: { FRONT_COLOR_LIGHTER, FRONT_COLOR },
  } = useContext(ThemeContext);
  const [, useLogout] = useLogoutMutation();
  const router = useRouter();

  return (
    <Flex
      align="center"
      color={{ base: FRONT_COLOR, md: FRONT_COLOR_LIGHTER }}
      _hover={{ color: FRONT_COLOR }}
      onClick={
        logout
          ? () => {
              useLogout();
              localStorage.removeItem("userId");
              router.reload();
            }
          : null
      }
    >
      <Icon as={icon} mr={2} />
      <NextLink href={href} passHref>
        <Link style={{ textDecoration: "none" }}>
          <Text my={1}>{label}</Text>
        </Link>
      </NextLink>
    </Flex>
  );
};
