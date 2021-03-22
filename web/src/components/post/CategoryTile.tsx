import Icon from "@chakra-ui/icon";
import { Flex, Link, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IconType } from "react-icons";
import { ThemeContext } from "../../utils/ThemeProvider";

interface CategoryTileProps {
  name: string;
  icon: IconType;
  disabled: boolean;
  select: () => void;
}

export const CategoryTile: React.FC<CategoryTileProps> = ({
  name,
  icon,
  disabled,
  select,
}) => {
  const {
    theme: { FRONT_COLOR, WHITE },
  } = useContext(ThemeContext);
  return (
    <Link
      style={{ textDecoration: "none" }}
      ml={"auto"}
      mr={"auto"}
      onClick={() => select()}
    >
      <Flex
        textAlign="center"
        pt={1}
        flexDir={"column"}
        justify={"space-evenly"}
        align="center"
        bgColor={disabled ? "gray.200" : FRONT_COLOR}
        color={disabled ? "gray.400" : WHITE}
        transition="ease-out 65ms"
        h={24}
        w={40}
        borderRadius="10px"
      >
        <Icon as={icon} h={10} w={10} />
        <Text>{name}</Text>
      </Flex>
    </Link>
  );
};
