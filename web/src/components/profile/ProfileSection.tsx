import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IconType } from "react-icons/lib";
import { ThemeContext } from "@utils/ThemeProvider";

interface ProfileSectionProps {
  title: string;
  icon: IconType;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  icon,
  children,
}) => {
  const {
    theme: { FRONT_COLOR },
  } = useContext(ThemeContext);
  return (
    <Box
      border="2px"
      borderColor={FRONT_COLOR}
      borderRadius="10px"
      p={3}
      boxShadow="md"
      h="min-content"
    >
      <Flex
        justify="space-between"
        align="center"
        borderBottom="4px"
        borderBottomColor={FRONT_COLOR}
        pb={2}
      >
        <Heading size="md">{title}</Heading>
        <Icon h={30} w={30} as={icon} />
      </Flex>
      {children}
    </Box>
  );
};
