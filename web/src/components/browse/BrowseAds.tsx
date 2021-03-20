import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  OrderOption,
  SortByOption,
  useAdsQuery,
} from "../../generated/graphql";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTEST_REGULAR_BROWN,
} from "../../utils/colors";
import {
  formatBrowseCategory,
  formatBrowseSubCategory,
} from "../../utils/formatLinks";
import {
  HOME_PAGE,
  NEXT_PAGE_LABEL,
  PAGE_LABEL,
  PREVIOUS_PAGE_LABEL,
} from "../../utils/strings";
import { AdListing } from "../ad/AdListing";
import { Breadcrumbs } from "../ad/Breadcrumbs";
import { Categories, MainCategory } from "../navbar/MenuRoutes";
import { RegularButton } from "../RegularButton";
import { Repeat } from "../Repeat";
import { Spinner } from "../Spinner";
import { AdSearchbox } from "./AdSearchbox";
import { AdSortingButtons } from "./AdSortingButtons";

interface BrowseAdsProps {
  category?: MainCategory;
  subcategory?: string;
}

export const BrowseAds: React.FC<BrowseAdsProps> = ({
  category,
  subcategory,
}) => {
  //State
  const [state, setState] = useState({
    sortBy: SortByOption.CreatedAt,
    order: OrderOption.Desc,
    title: "",
    wear: null,
    priceLower: null,
    priceUpper: null,
    county: null,
    city: null,
  });

  useEffect(() => {
    setPage({ cursor: null, page: 1, previous: [null] });
  }, [state]);

  //Pagination state
  const [{ cursor, page, previous }, setPage] = useState({
    cursor: null,
    page: 1,
    previous: [null],
  });

  //Query
  const [{ data, fetching }, getAds] = useAdsQuery({
    variables: {
      search: {
        category: category,
        subcategory: subcategory,
        title: state.title,
        wear: state.wear,
        priceLower: state.priceLower,
        priceUpper: state.priceUpper,
        county: state.county,
        city: state.city,
      },
      sortBy: { sortBy: state.sortBy, order: state.order },
      cursor: cursor,
      first: 10,
    },
    pause: category === undefined || subcategory === undefined,
  });

  const ads = data ? data.ads.ads : null;
  const hasMore = data ? data.ads.hasMore : null;

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
        <AdSearchbox state={state} setter={setState} />
        <VStack w={{ base: "full", md: "65%" }}>
          <AdSortingButtons setter={setState} state={state} />
          {fetching ? (
            <Repeat n={4}>
              <Spinner height="150px" />
            </Repeat>
          ) : ads ? (
            ads.map((ad) => <AdListing ad={ad} />)
          ) : null}
          <Stack justify="space-between" align="center" w="full" my="30px">
            <Flex w={"40%"} justify="flex-start">
              <Button
                color={"white"}
                bgColor={LIGHTER_REGULAR_BROWN}
                _hover={{ bgColor: LIGHTEST_REGULAR_BROWN }}
                display={page !== 1 ? "block" : "none"}
                onClick={() => {
                  setPage({
                    cursor: previous[previous.length - 1],
                    previous: previous.splice(previous.length - 1, 1),
                    page: page - 1,
                  });
                }}
              >
                {PREVIOUS_PAGE_LABEL}
              </Button>
            </Flex>
            <Box w={"20%"} textAlign="center">
              <Text>
                {PAGE_LABEL} {page}
              </Text>
            </Box>

            <Flex w={"40%"} justify="flex-end">
              <Button
                bgColor={LIGHTER_REGULAR_BROWN}
                _hover={{ bgColor: LIGHTEST_REGULAR_BROWN }}
                color={"white"}
                display={hasMore ? "block" : "none"}
                onClick={() => {
                  setPage({
                    previous: previous.splice(previous.length, 0, cursor),
                    cursor: ads[ads.length - 1][state.sortBy],
                    page: page + 1,
                  });
                }}
              >
                {NEXT_PAGE_LABEL}
              </Button>
            </Flex>
          </Stack>
        </VStack>
      </Stack>
    </>
  );
};
