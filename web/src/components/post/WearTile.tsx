import { Flex, Link, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IconType } from "react-icons";
import { ThemeContext } from "@utils/hooks/ThemeProvider";

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
  disabled,
  leftmost = false,
  rightmost = false,
  select,
}) => {
  const {
    theme: { FRONT_COLOR_DARKER, FRONT_COLOR_LIGHTER_ALT, BACK_COLOR, WHITE },
  } = useContext(ThemeContext);
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
        bgColor={disabled ? FRONT_COLOR_LIGHTER_ALT : FRONT_COLOR_DARKER}
        color={WHITE}
        transition="ease-out 65ms"
        borderLeftRadius={leftmost ? "10px" : "0px"}
        borderRightRadius={rightmost ? "10px" : "0px"}
        borderColor={BACK_COLOR}
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
