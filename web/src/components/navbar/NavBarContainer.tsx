import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ThemeContext } from "@utils/hooks/ThemeProvider";

export const NavBarContainer: React.FC = ({ children, ...props }) => {
  const {
    theme: { FRONT_COLOR, BACK_COLOR },
  } = useContext(ThemeContext);
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
