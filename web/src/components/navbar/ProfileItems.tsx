import { Box, Text } from "@chakra-ui/react";
import { ProfileDrowDownLink } from "@components/ProfileDrowDownLink";
import { MeQuery } from "@generated/graphql";
import {
  LOGOUT_LABEL,
  MY_AD_LABEL,
  PROFILE_VIEW_LABEL,
} from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";
import { BiDetail, BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

interface ProfileItemsProps {
  userData: MeQuery;
}

export const ProfileItems: React.FC<ProfileItemsProps> = ({ userData }) => {
  const {
    theme: { BACK_COLOR_LIGHTER, BACK_COLOR_SEE_THROUGH },
  } = useContext(ThemeContext);
  return (
    <Box
      bg={{
        base: BACK_COLOR_LIGHTER,
        md: BACK_COLOR_SEE_THROUGH,
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
