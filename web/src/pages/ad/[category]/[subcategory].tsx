import { BrowseAds } from "@components/BrowseAds";
import { Layout } from "@components/Layout";
import { Categories, MainCategory } from "@components/MenuRoutes";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import { getCategoriesFromURL } from "@utils/getCategoriesFromURL";
import { withUrqlClient } from "next-urql";
import React from "react";

const SubCategoryPage: React.FC<{}> = ({}) => {
  const { category, subcategory } = getCategoriesFromURL();

  return (
    <Layout title={`${Categories[category].title} > ${subcategory}`}>
      <BrowseAds
        category={category as MainCategory}
        subcategory={subcategory}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(SubCategoryPage);
