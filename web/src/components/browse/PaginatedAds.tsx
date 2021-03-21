import React from "react";
import {
  OrderOption,
  SortByOption,
  useAdsQuery,
} from "../../generated/graphql";
import { LOAD_MORE_BUTTON } from "../../utils/strings";
import { AdListing } from "../ad/AdListing";
import { MainCategory } from "../navbar/MenuRoutes";
import { RegularButton } from "../RegularButton";
import { Repeat } from "../Repeat";
import { Spinner } from "../Spinner";

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
        <Repeat n={10}>
          <Spinner height="150px" />
        </Repeat>
      ) : ads ? (
        ads.map((ad, i) => (
          <>
            <AdListing ad={ad} />
            {i === 9 && hasMore && isLastPage ? (
              <RegularButton onClick={handleLoadMore}>
                {LOAD_MORE_BUTTON}
              </RegularButton>
            ) : null}
          </>
        ))
      ) : null}
    </>
  );
};
