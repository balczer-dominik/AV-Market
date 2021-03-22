import { BrowseAds } from "@components/browse/BrowseAds";
import { Layout } from "@components/Layout";
import { MainCategory } from "@components/MenuRoutes";
import { createUrqlClient } from "@utils/createUrqlClient";
import { getCategoriesFromURL } from "@utils/getCategoriesFromURL";
import { SEARCH_AD_PAGE_TITLE } from "@utils/strings";
import { withUrqlClient } from "next-urql";
import React from "react";

export const SearchAdPage: React.FC<{}> = () => {
  const { category, subcategory } = getCategoriesFromURL();

  return (
    <Layout title={SEARCH_AD_PAGE_TITLE}>
      <BrowseAds
        category={category as MainCategory}
        subcategory={subcategory}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(SearchAdPage);
