import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { REGULAR_BROWN } from "../../utils/colors";
import { MainCategory } from "../navbar/MenuRoutes";

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
        bgColor={disabled ? "gray.200" : REGULAR_BROWN}
        color={disabled ? "gray.400" : "white"}
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
