import { HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import React from "react";

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? (
        <IconButton aria-label="Collapse navbar" icon={<SmallCloseIcon/>} colorScheme="white">Collapse</IconButton>
      ) : (
        <IconButton aria-label="Expand navbar" icon={<HamburgerIcon />} colorScheme="white">Expand</IconButton>
      )}
    </Box>
  );
};
