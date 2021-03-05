import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons/lib";
import { REGULAR_BROWN } from "../../utils/colors";

interface ProfileSectionProps {
  title: string;
  icon: IconType;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <Box
      border="2px"
      borderColor={REGULAR_BROWN}
      borderRadius="10px"
      p={3}
      boxShadow="md"
      h="min-content"
    >
      <Flex
        justify="space-between"
        align="center"
        borderBottom="4px"
        borderBottomColor={REGULAR_BROWN}
        pb={2}
      >
        <Heading size="md">{title}</Heading>
        <Icon h={30} w={30} as={icon} />
      </Flex>
      {children}
    </Box>
  );
};
