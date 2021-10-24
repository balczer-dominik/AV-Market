import { Box, Flex } from "@chakra-ui/react";
import { AdListing } from "@components/AdListing";
import { MainCategory } from "@components/MenuRoutes";
import { RegularButton } from "@components/RegularButton";
import { Repeat } from "@components/Repeat";
import { Spinner } from "@components/Spinner";
import { OrderOption, SortByOption, useAdsQuery } from "@generated/graphql";
import { LOAD_MORE_BUTTON } from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";

interface PaginatedAdsProps {
  pageVariables: {
    dateCursor: any;
    priceCursor: any;
  };
  searchVariables: {
    sortBy: SortByOption;
    order: OrderOption;
    title: string;
    wear: any;
    priceLower: any;
    priceUpper: any;
    county: any;
    city: any;
  };
  isLastPage: Boolean;
  onLoadMore: ({
    dateCursor,
    priceCursor,
  }: {
    dateCursor: string;
    priceCursor: string;
  }) => void;
  category: MainCategory;
  subcategory: string;
}

export const PaginatedAds: React.FC<PaginatedAdsProps> = ({
  pageVariables,
  searchVariables,
  isLastPage,
  onLoadMore,
  category,
  subcategory,
}) => {
  const {
    theme: { FRONT_COLOR_LIGHTER },
  } = useContext(ThemeContext);
  //Query
  const [{ data, fetching }] = useAdsQuery({
    variables: {
      search: {
        category: category,
        subcategory: subcategory,
        title: searchVariables.title,
        wear: searchVariables.wear,
        priceLower: searchVariables.priceLower,
        priceUpper: searchVariables.priceUpper,
        county: searchVariables.county,
        city: searchVariables.city,
      },
      sortBy: { sortBy: searchVariables.sortBy, order: searchVariables.order },
      dateCursor: pageVariables.dateCursor,
      priceCursor: pageVariables.priceCursor,
      first: 10,
    },
    pause: category === undefined || subcategory === undefined,
  });

  const ads = data ? data.ads.ads : null;
  const hasMore = data ? data.ads.hasMore : null;

  const handleLoadMore = () => {
    const last = ads[ads.length - 1];
    onLoadMore({
      dateCursor: last.createdAt,
      priceCursor:
        searchVariables.sortBy === SortByOption.Price
          ? last.price.toString()
          : null,
    });
  };

  return (
    <>
      {fetching ? (
        <Repeat n={3}>
          <Box my={2} w="full">
            <Spinner height="153px" />
          </Box>
        </Repeat>
      ) : ads ? (
        ads.map((ad, i) => (
          <>
            <AdListing ad={ad} noOutline mt={0} />
            {i === ads.length - 1 && isLastPage ? (
              <Flex
                justify="center"
                w="full"
                pt={4}
                borderColor={FRONT_COLOR_LIGHTER}
                borderTopWidth="1px"
                borderstyle="solid"
              >
                {hasMore ? (
                  <RegularButton onClick={handleLoadMore}>
                    {LOAD_MORE_BUTTON}
                  </RegularButton>
                ) : null}
              </Flex>
            ) : null}
          </>
        ))
      ) : null}
    </>
  );
};
