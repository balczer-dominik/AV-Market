import { Flex } from "@chakra-ui/react";
import React from "react";
import { FRONT_COLOR, BACK_COLOR } from "../../utils/colors";

export const NavBarContainer: React.FC = ({ children, ...props }) => {
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        color={FRONT_COLOR}
        shadow="xl"
        px={5}
        {...props}
        bgColor={BACK_COLOR}
      >
        {children}
      </Flex>
    </>
  );
};
