import { Box, Collapse, Icon, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import { isMobile } from "react-device-detect";
import { IconType } from "react-icons";
import { Categories, Category, MainCategory } from "./MenuRoutes";
import { CategoryDropDown } from "./CategoryDropDown";

interface MenuItemProps {
  icon: IconType;
  category: MainCategory;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  category: categoryName,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const category = Categories[categoryName];

  return (
    <>
      <Box
        py={[0.5, 1, 4]}
        onMouseEnter={() => {
          isMobile || isOpen ? null : onToggle();
        }}
        onMouseLeave={() => {
          isMobile || !isOpen ? null : onToggle();
        }}
      >
        <Icon as={icon} w={10} h={10} display={["none", "block"]} />
        <Text display={["block", "none"]} fontWeight="bold" onClick={onToggle}>
          {category.title}
        </Text>
        <Collapse in={isOpen}>
          <CategoryDropDown category={category} />
        </Collapse>
      </Box>
    </>
  );
};
