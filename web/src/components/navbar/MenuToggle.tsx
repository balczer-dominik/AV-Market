import { HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ThemeContext } from "@utils/hooks/ThemeProvider";

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }) => {
  const {
    theme: { FRONT_COLOR },
  } = useContext(ThemeContext);
  return (
    <Box
      w={{ base: null, md: "0%" }}
      display={{ base: "block", md: "none" }}
      onClick={toggle}
    >
      {isOpen ? (
        <IconButton
          aria-label="Collapse navbar"
          as={SmallCloseIcon}
          color={FRONT_COLOR}
        >
          Collapse
        </IconButton>
      ) : (
        <IconButton
          aria-label="Expand navbar"
          as={HamburgerIcon}
          color={FRONT_COLOR}
        >
          Expand
        </IconButton>
      )}
    </Box>
  );
};
