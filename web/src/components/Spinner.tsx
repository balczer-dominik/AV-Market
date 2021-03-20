import { Flex } from "@chakra-ui/layout";
import { Spinner as ChakraSpinner } from "@chakra-ui/react";
import React from "react";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTEST_REGULAR_LIGHT_BROWN,
  REGULAR_BROWN,
} from "../utils/colors";

export const Spinner: React.FC<{ height: string }> = ({ height }) => {
  return (
    <Flex
      align="center"
      justify="center"
      bgColor={LIGHTEST_REGULAR_LIGHT_BROWN}
      borderRadius="5px"
      w="full"
      h={height}
      minH={height}
    >
      <ChakraSpinner color={REGULAR_BROWN} />
    </Flex>
  );
};
