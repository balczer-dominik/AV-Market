import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import {
  REGULAR_LIGHT_BROWN,
  REGULAR_BROWN,
  LIGHTER_REGULAR_BROWN,
  DARKER_REGULAR_BROWN,
} from "../../utils/colors";

interface WearTileProps {
  name: string;
  icon?: IconType;
  disabled: boolean;
  leftmost?: Boolean;
  rightmost?: Boolean;
  select: () => void;
}

export const WearTile: React.FC<WearTileProps> = ({
  name,
  icon,
  disabled,
  leftmost = false,
  rightmost = false,
  select,
}) => {
  return (
    <Link style={{ textDecoration: "none" }} onClick={() => select()} w="20%">
      <Flex
        w="100%"
        h="100%"
        textAlign="center"
        pt={1}
        flexDir={"column"}
        justify={"space-evenly"}
        align="center"
        bgColor={disabled ? LIGHTER_REGULAR_BROWN : DARKER_REGULAR_BROWN}
        color={"white"}
        transition="ease-out 65ms"
        borderLeftRadius={leftmost ? "10px" : "0px"}
        borderRightRadius={rightmost ? "10px" : "0px"}
        borderColor={REGULAR_LIGHT_BROWN}
        borderWidth="1px"
        borderStyle="solid"
      >
        <Text fontSize={12} fontWeight="bold">
          {name}
        </Text>
      </Flex>
    </Link>
  );
};
