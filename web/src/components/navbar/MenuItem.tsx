import {
  Box,
  Collapse,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CategoryDropDown } from "@components/CategoryDropDown";
import { Categories, MainCategory } from "@components/MenuRoutes";
import { ThemeContext } from "@utils/ThemeProvider";
import React, { useContext } from "react";
import { isMobile } from "react-device-detect";
import { IoIosArrowDown } from "react-icons/io";

interface MenuItemProps {
  category: MainCategory;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  category: categoryName,
}) => {
  const {
    theme: { FRONT_COLOR_DARKER, FRONT_COLOR },
  } = useContext(ThemeContext);
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
        color={isOpen ? FRONT_COLOR_DARKER : FRONT_COLOR}
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
