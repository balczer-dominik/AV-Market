import { Flex } from "@chakra-ui/react";
import useScrollPosition from "@react-hook/window-scroll";
import React from "react";
import { REGULAR_BROWN, REGULAR_LIGHT_BROWN } from "../../utils/colors";

export const NavBarContainer: React.FC = ({ children, ...props }) => {
  const scrollY = useScrollPosition(60);
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        color={REGULAR_BROWN}
        shadow="xl"
        px={5}
        {...props}
        bgColor={REGULAR_LIGHT_BROWN}
      >
        {children}
      </Flex>
    </>
  );
};
