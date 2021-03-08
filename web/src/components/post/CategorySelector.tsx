import { SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import { Categories, MainCategories } from "../navbar/MenuRoutes";
import { CategoryTile } from "./CategoryTile";

interface CategorySelectorProps {
  category: { main: string; sub: string; wear: string };
  setCategory: (
    value: React.SetStateAction<{
      main: string;
      sub: string;
      wear: string;
    }>
  ) => void;
  sub?: Boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  category,
  setCategory: setCategory,
  sub = false,
}) => {
  return (
    <SimpleGrid minChildWidth="150px" spacing="20px" mt={4}>
      {sub
        ? Categories[category.main].subcategories.map((sc) => (
            <CategoryTile
              name={sc.title}
              icon={sc.icon}
              disabled={category.sub !== sc.title}
              select={() =>
                setCategory({
                  main: category.main,
                  sub: sc.title,
                  wear: category.wear,
                })
              }
            />
          ))
        : MainCategories.map((mc) => (
            <CategoryTile
              name={Categories[mc].title}
              icon={Categories[mc].icon}
              disabled={category.main !== mc}
              select={() =>
                setCategory({ main: mc, sub: "", wear: category.wear })
              }
            />
          ))}
    </SimpleGrid>
  );
};
