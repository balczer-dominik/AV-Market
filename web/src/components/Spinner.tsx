import { Flex } from "@chakra-ui/layout";
import { Spinner as ChakraSpinner } from "@chakra-ui/react";
import React from "react";
import {
  FRONT_COLOR_LIGHTER,
  BACK_COLOR_LIGHTEST,
  FRONT_COLOR,
} from "../utils/colors";

export const Spinner: React.FC<{ height: string }> = ({ height }) => {
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
