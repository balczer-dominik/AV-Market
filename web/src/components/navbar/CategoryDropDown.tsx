import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Category } from "./MenuRoutes";
import NextLink from "next/link";
import { CloseIcon } from "@chakra-ui/icons";

interface SubcategoryProps {
  category: Category;
}

export const CategoryDropDown: React.FC<SubcategoryProps> = ({ category }) => {
  return (
    <Box
      pos={{ base: "relative", md: "absolute" }}
      zIndex="1"
      bg={{ base: "#e3deca", md: "rgba(218, 212, 190, 0.5)" }}
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
        <Flex align="center">
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
