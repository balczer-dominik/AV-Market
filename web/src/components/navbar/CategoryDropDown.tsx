import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import {
  FRONT_COLOR_LIGHTER,
  BACK_COLOR_LIGHTER,
  FRONT_COLOR,
  BACK_COLOR_SEE_THROUGH,
} from "../../utils/colors";
import {
  formatBrowseCategory,
  formatBrowseSubCategory,
} from "../../utils/formatLinks";
import { Categories, Category, MainCategory } from "./MenuRoutes";

interface SubcategoryProps {
  category: Category;
}

export const CategoryDropDown: React.FC<SubcategoryProps> = ({ category }) => {
  return (
    <Box
      pos={{ base: "relative", md: "absolute" }}
      zIndex={3}
      bg={{
        base: BACK_COLOR_LIGHTER,
        md: BACK_COLOR_SEE_THROUGH,
      }}
      display="block"
      w={{ base: "100%", md: 230 }}
      px={3}
      py={2}
      mt={2}
    >
      <NextLink href={formatBrowseCategory(category.key)}>
        <Link style={{ textDecoration: "none" }}>
          <Text
            fontWeight="bold"
            display={{ base: "none", md: "block" }}
            my={3}
          >
            {category.title}
          </Text>
        </Link>
      </NextLink>

      {category.subcategories.map((sc) => (
        <Flex
          align="center"
          color={{ base: FRONT_COLOR, md: FRONT_COLOR_LIGHTER }}
          _hover={{ color: FRONT_COLOR }}
        >
          <Icon as={sc.icon ?? CloseIcon} mr={2} />
          <NextLink href={`/ad/${category.route}/${sc.route}`}>
            <Link style={{ textDecoration: "none" }}>
              <Text my={1}>{sc.title}</Text>
            </Link>
          </NextLink>
        </Flex>
      ))}
    </Box>
  );
};
