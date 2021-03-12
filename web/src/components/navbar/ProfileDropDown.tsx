import { TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { MeQuery } from "../../generated/graphql";
import { SEE_THROUGH_REGULAR_LIGHT_BROWN } from "../../utils/colors";
import { ProfileItems } from "./ProfileItems";

interface ProfileDropDownProps {
  userData: MeQuery;
}

export const ProfileDropDown: React.FC<ProfileDropDownProps> = ({
  userData,
}) => {
  return (
    <Box
      pos={{ base: "relative", md: "fixed" }}
      zIndex={3}
      display="block"
      w={{ base: "100%", md: "fit-content" }}
      right={{ base: "unset", md: "30px" }}
      top={{ base: "unset", md: "70px" }}
    >
      <Flex flexDir="row-reverse" mx={2}>
        <Icon
          as={TriangleUpIcon}
          color={SEE_THROUGH_REGULAR_LIGHT_BROWN}
          top={1}
          pos="relative"
        />
      </Flex>
      {userData ? <ProfileItems userData={userData} /> : null}
    </Box>
  );
};
