import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons/lib";
import { useLogoutMutation } from "../../generated/graphql";
import { LIGHTER_REGULAR_BROWN, REGULAR_BROWN } from "../../utils/colors";

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
  const [, useLogout] = useLogoutMutation();
  const router = useRouter();

  return (
    <Flex
      align="center"
      color={{ base: REGULAR_BROWN, md: LIGHTER_REGULAR_BROWN }}
      _hover={{ color: REGULAR_BROWN }}
      onClick={
        logout
          ? () => {
              useLogout();
              router.reload();
            }
          : null
      }
    >
      <Icon as={icon} mr={2} />
      <NextLink href={href}>
        <Link style={{ textDecoration: "none" }}>
          <Text my={1}>{label}</Text>
        </Link>
      </NextLink>
    </Flex>
  );
};
