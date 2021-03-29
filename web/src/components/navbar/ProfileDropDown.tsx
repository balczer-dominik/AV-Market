import { TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { ProfileItems } from "@components/ProfileItems";
import { MeQuery } from "@generated/graphql";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";

interface ProfileDropDownProps {
  userData: MeQuery;
}

export const ProfileDropDown: React.FC<ProfileDropDownProps> = ({
  userData,
}) => {
  const {
    theme: { BACK_COLOR_SEE_THROUGH },
  } = useContext(ThemeContext);
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
          color={BACK_COLOR_SEE_THROUGH}
          top={1}
          pos="relative"
        />
      </Flex>
      {userData ? <ProfileItems userData={userData} /> : null}
    </Box>
  );
};
