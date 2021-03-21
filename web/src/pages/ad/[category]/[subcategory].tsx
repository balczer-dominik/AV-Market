import { withUrqlClient } from "next-urql";
import React from "react";
import { BrowseAds } from "../../../components/browse/BrowseAds";
import { Layout } from "../../../components/Layout";
import {
  Categories,
  MainCategory,
} from "../../../components/navbar/MenuRoutes";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { getCategoriesFromURL } from "../../../utils/getCategoriesFromURL";

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
