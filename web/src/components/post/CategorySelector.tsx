import { Flex, SimpleGrid } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { propNames } from "@chakra-ui/styled-system";
import React from "react";
import { FaGhost } from "react-icons/fa";
import { Categories, MainCategories, MainCategory } from "../navbar/MenuRoutes";
import { CategoryTile } from "./CategoryTile";

interface CategorySelectorProps {
  selected: String;
  select: (value: React.SetStateAction<string>) => void;
  main?: MainCategory;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selected,
  select,
  main,
}) => {
  return (
    <SimpleGrid minChildWidth="150px" spacing="20px" mt={4}>
      {main
        ? Categories[main].subcategories.map((sc) => (
            <CategoryTile
              name={sc.title}
              icon={sc.icon}
              disabled={selected !== sc.title}
              select={select}
            />
          ))
        : MainCategories.map((mc) => (
            <CategoryTile
              name={Categories[mc].title}
              value={mc as MainCategory}
              icon={Categories[mc].icon}
              disabled={selected !== mc}
              select={select}
            />
          ))}
    </SimpleGrid>
  );
};
