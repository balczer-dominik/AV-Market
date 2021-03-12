import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { BiDetail, BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MeQuery } from "../../generated/graphql";
import {
  LIGHTER_REGULAR_LIGHT_BROWN,
  SEE_THROUGH_REGULAR_LIGHT_BROWN,
} from "../../utils/colors";
import {
  LOGOUT_LABEL,
  MY_AD_LABEL,
  PROFILE_VIEW_LABEL,
} from "../../utils/strings";
import { ProfileDrowDownLink } from "./ProfileDrowDownLink";

interface ProfileItemsProps {
  userData: MeQuery;
}

export const ProfileItems: React.FC<ProfileItemsProps> = ({ userData }) => {
  return (
    <Box
      bg={{
        base: LIGHTER_REGULAR_LIGHT_BROWN,
        md: SEE_THROUGH_REGULAR_LIGHT_BROWN,
      }}
      p={3}
      borderRadius={2}
    >
      <Text fontWeight="bold" display={{ base: "none", md: "block" }} my={1}>
        {userData.me.username}
      </Text>
      <ProfileDrowDownLink
        icon={FaUser}
        href={`/profile/view/${userData.me.id}`}
        label={PROFILE_VIEW_LABEL}
      />
      <ProfileDrowDownLink
        icon={BiDetail}
        href={`/profile/ads/${userData.me.id}`}
        label={MY_AD_LABEL}
      />
      <ProfileDrowDownLink
        icon={BiLogOut}
        label={LOGOUT_LABEL}
        href={""}
        logout
      />
    </Box>
  );
};
