import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Category } from "./MenuRoutes";
import NextLink from "next/link";
import { CloseIcon } from "@chakra-ui/icons";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTER_REGULAR_LIGHT_BROWN,
  LIGHTEST_REGULAR_BROWN,
  REGULAR_BROWN,
  SEE_THROUGH_REGULAR_LIGHT_BROWN,
} from "../../utils/colors";

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
      <NextLink href={category.route}>
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
          <NextLink href={sc.route}>
            <Link style={{ textDecoration: "none" }}>
              <Text my={1}>{sc.title}</Text>
            </Link>
          </NextLink>
        </Flex>
      ))}
    </Box>
  );
};
