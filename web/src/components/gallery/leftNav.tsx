import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/react";
import React from "react";
import { BiLeftArrow } from "react-icons/bi";

export const leftNav = (
  onClick: React.MouseEventHandler<HTMLElement>,
  disabled: boolean
): React.ReactNode => {
  return (
    <Box onClick={onClick}>
      <Icon as={BiLeftArrow} />
    </Box>
  );
};
