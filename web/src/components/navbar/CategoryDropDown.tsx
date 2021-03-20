import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTER_REGULAR_LIGHT_BROWN,
  REGULAR_BROWN,
  SEE_THROUGH_REGULAR_LIGHT_BROWN,
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
        base: LIGHTER_REGULAR_LIGHT_BROWN,
        md: SEE_THROUGH_REGULAR_LIGHT_BROWN,
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
          color={{ base: REGULAR_BROWN, md: LIGHTER_REGULAR_BROWN }}
          _hover={{ color: REGULAR_BROWN }}
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
