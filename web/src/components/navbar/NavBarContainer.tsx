import { Flex } from "@chakra-ui/react";
import useScrollPosition from "@react-hook/window-scroll";
import React from "react";
import { CategoryDropDown } from "./CategoryDropDown";

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
        color="#777672"
        shadow="xl"
        px={5}
        {...props}
        bgColor="#DAD4BE"
      >
        {children}
      </Flex>
    </>
  );
};
