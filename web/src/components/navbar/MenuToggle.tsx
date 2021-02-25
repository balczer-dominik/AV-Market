import { HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Icon, IconButton } from "@chakra-ui/react";
import React from "react";

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? (
        <IconButton
          aria-label="Collapse navbar"
          as={SmallCloseIcon}
          color="#777672"
        >
          Collapse
        </IconButton>
      ) : (
        <IconButton
          aria-label="Expand navbar"
          as={HamburgerIcon}
          color="#777672"
        >
          Expand
        </IconButton>
      )}
    </Box>
  );
};
