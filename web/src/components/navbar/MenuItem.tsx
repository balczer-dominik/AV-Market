import {
  Box,
  Collapse,
  Icon,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { isMobile } from "react-device-detect";
import { IconType } from "react-icons";
import { Categories, Category, MainCategory } from "./MenuRoutes";
import { CategoryDropDown } from "./CategoryDropDown";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CloseIcon } from "@chakra-ui/icons";
import { DARKER_REGULAR_BROWN, REGULAR_BROWN } from "../../utils/colors";

interface MenuItemProps {
  category: MainCategory;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  category: categoryName,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const category = Categories[categoryName];

  return (
    <Box
      py={{ base: 1, md: 4 }}
      my={{ base: 2, md: 0 }}
      onMouseEnter={() => {
        isMobile || isOpen ? null : onToggle();
      }}
      onMouseLeave={() => {
        isMobile || !isOpen ? null : onToggle();
      }}
    >
      <Icon
        as={category.icon}
        w={10}
        h={10}
        display={{ base: "none", md: "block" }}
        color={isOpen ? DARKER_REGULAR_BROWN : REGULAR_BROWN}
      />

      <Flex
        align="center"
        onClick={onToggle}
        display={{ base: "flex", md: "none" }}
      >
        <Flex align="center">
          <Icon as={category.icon} mr={2} />
          <Text fontWeight="bold">{category.title}</Text>
        </Flex>

        <Icon
          as={IoIosArrowDown}
          ml={"auto"}
          transform={isOpen ? null : "rotate(180deg)"}
          transition={"0.3s"}
        />
      </Flex>

      <Collapse in={isOpen}>
        <CategoryDropDown category={category} />
      </Collapse>
    </Box>
  );
};
