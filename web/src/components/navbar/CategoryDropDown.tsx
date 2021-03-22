import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useContext } from "react";
import { formatBrowseCategory } from "@utils/formatLinks";
import { ThemeContext } from "@utils/ThemeProvider";
import { Category } from "@components/MenuRoutes";

interface SubcategoryProps {
  category: Category;
}

export const CategoryDropDown: React.FC<SubcategoryProps> = ({ category }) => {
  const {
    theme: {
      FRONT_COLOR_LIGHTER,
      BACK_COLOR_LIGHTER,
      FRONT_COLOR,
      BACK_COLOR_SEE_THROUGH,
      FRONT_COLOR_DARKER,
    },
  } = useContext(ThemeContext);
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
      mt={{ base: 2, md: 4 }}
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
          _hover={{ color: FRONT_COLOR_DARKER }}
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
