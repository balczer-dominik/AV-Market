import { Flex } from "@chakra-ui/layout";
import { Spinner as ChakraSpinner } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ThemeContext } from "@utils/hooks/ThemeProvider";

export const Spinner: React.FC<{
  height: string | { base: string; md: string };
}> = ({ height }) => {
  const {
    theme: { BACK_COLOR_LIGHTEST, FRONT_COLOR },
  } = useContext(ThemeContext);
  return (
    <Flex
      align="center"
      justify="center"
      bgColor={BACK_COLOR_LIGHTEST}
      borderRadius="5px"
      w="full"
      h={height}
      minH={height}
    >
      <ChakraSpinner color={FRONT_COLOR} />
    </Flex>
  );
};
