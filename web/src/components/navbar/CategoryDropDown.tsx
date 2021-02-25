import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Category } from "./MenuRoutes";
import NextLink from "next/link";

interface SubcategoryProps {
  category: Category;
}

export const CategoryDropDown: React.FC<SubcategoryProps> = ({ category }) => {
  return (
    <Box
      pos={["relative", "absolute"]}
      zIndex="1"
      bgColor="#DAD4BE"
      display="block"
      w={230}
      px={3}
      py={2}
      mt={2}
    >
      <NextLink href={category.route}>
        <Link style={{ textDecoration: "none" }}>
          <Text fontWeight="bold" display={["none", "block"]}>
            {category.title}
          </Text>
        </Link>
      </NextLink>

      {category.subcategories.map((sc) => (
        <NextLink href={sc.route}>
          <Link style={{ textDecoration: "none" }}>
            <Text>{sc.title}</Text>
          </Link>
        </NextLink>
      ))}
    </Box>
  );
};
