import { Stack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { OrderOption, SortByOption } from "../../generated/graphql";
import {
  formatBrowseCategory,
  formatBrowseSubCategory,
} from "../../utils/formatLinks";
import { HOME_PAGE } from "../../utils/strings";
import { Breadcrumbs } from "../ad/Breadcrumbs";
import { Categories, MainCategory } from "../navbar/MenuRoutes";
import { AdSearchbox } from "./AdSearchbox";
import { AdSortingButtons } from "./AdSortingButtons";
import { PaginatedAds } from "./PaginatedAds";

interface BrowseAdsProps {
  category?: MainCategory;
  subcategory?: string;
}

export const BrowseAds: React.FC<BrowseAdsProps> = ({
  category,
  subcategory,
}) => {
  //Search state
  const [searchVariables, setSearchVariables] = useState({
    sortBy: SortByOption.CreatedAt,
    order: OrderOption.Desc,
    title: "",
    wear: null,
    priceLower: null,
    priceUpper: null,
    county: null,
    city: null,
  });

  //Pagination state
  const [pageVariables, setPageVariables] = useState([
    {
      dateCursor: null,
      priceCursor: null,
    },
  ]);

  useEffect(() => {
    setPageVariables([{ dateCursor: null, priceCursor: null }]);
  }, [searchVariables]);

  const breadItems = [
    {
      label: HOME_PAGE,
      href: "/",
    },
  ];

  if (category) {
    breadItems.push({
      label: Categories[category].title,
      href: formatBrowseCategory(category),
    });
  }

  if (subcategory) {
    breadItems.push({
      label: subcategory,
      href: formatBrowseSubCategory(category, subcategory),
    });
  }

  return (
    <>
      <Breadcrumbs items={breadItems} />
      <Stack
        mt={4}
        flexDir={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        h="full"
        justify={{ base: "unset", md: "space-between" }}
      >
        <AdSearchbox state={searchVariables} setter={setSearchVariables} />
        <VStack w={{ base: "full", md: "65%" }}>
          <AdSortingButtons
            setter={setSearchVariables}
            state={searchVariables}
          />
          {pageVariables.map((variables, i) => (
            <PaginatedAds
              key={"" + variables.dateCursor}
              pageVariables={variables}
              searchVariables={searchVariables}
              category={category}
              subcategory={subcategory}
              isLastPage={i === pageVariables.length - 1}
              onLoadMore={({ dateCursor, priceCursor }) =>
                setPageVariables([
                  ...pageVariables,
                  { dateCursor, priceCursor },
                ])
              }
            />
          ))}
        </VStack>
      </Stack>
    </>
  );
};
