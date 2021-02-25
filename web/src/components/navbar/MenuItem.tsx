import { Box, Collapse, Icon, useDisclosure, Text } from "@chakra-ui/react";
import React from "react";
import { isMobile } from "react-device-detect";
import { IconType } from "react-icons";
import { Categories, Category, MainCategory } from "./MenuRoutes";
import { CategoryDropDown } from "./CategoryDropDown";

interface MenuItemProps {
  icon: IconType;
  categoryName: MainCategory;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  icon,
  categoryName,
}) => {
  const { isOpen, onToggle } = useDisclosure();

  let category = Categories[categoryName];

  return (
    <>
      <Box
        py={[1, 1, 4]}
        onMouseEnter={() => {
          isMobile ? null : onToggle();
        }}
        onMouseLeave={() => {
          isMobile ? null : onToggle();
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
