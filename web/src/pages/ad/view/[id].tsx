import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import ReactImageGallery from "react-image-gallery";
import { Breadcrumbs } from "../../../components/ad/Breadcrumbs";
import { Layout } from "../../../components/Layout";
import { Categories } from "../../../components/navbar/MenuRoutes";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { formatImageGallery } from "../../../utils/formatImageGallery";
import { HOME_PAGE } from "../../../utils/strings";
import { useGetAdFromUrl } from "../../../utils/useGetAdFromUrl";
import "react-image-gallery/styles/css/image-gallery.css";

interface ViewAdProps {}

const ViewAd: React.FC<ViewAdProps> = ({}) => {
  const [{ data }] = useGetAdFromUrl();
  const ad = data ? data.ad.ad : null;

  const breadItems = () => [
    {
      href: "",
      label: HOME_PAGE,
    },
    {
      href: "/" + Categories[ad.category].route,
      label: Categories[ad.category].title,
    },
    {
      href: `/${Categories[ad.category].route}/${
        Categories[ad.category].subcategories.find(
          (sc) => sc.title === ad.subCategory
        ).route
      }`,
      label: ad.subCategory,
    },
    {
      href: `/ad/view/${ad.id}`,
      label: ad.title,
    },
  ];

  return (
    <Layout>
      {ad ? (
        <Box>
          <Breadcrumbs items={breadItems()} />
          <Box w="300px">
            <ReactImageGallery
              items={formatImageGallery(ad.images)}
              autoPlay={false}
            />
          </Box>
        </Box>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ViewAd);
