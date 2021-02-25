import { Box, Collapse, Icon, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import { isMobile } from "react-device-detect";
import { IconType } from "react-icons";

interface MenuItemProps {
  icon: IconType;
  alt: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ children, icon, alt }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Box
        py={[1, 1, 4]}
        onMouseEnter={() => {
          isMobile ? null : onToggle();
        }}
        onMouseLeave={() => {
          isMobile ? null : onToggle();
        }}
      >
        <Icon as={icon} w={10} h={10} display={["none", "block"]} />
        <Text display={["block", "none"]} fontWeight="bold" onClick={onToggle}>
          {alt}
        </Text>
        <Collapse in={isOpen}>{children}</Collapse>
      </Box>
    </>
  );
};
