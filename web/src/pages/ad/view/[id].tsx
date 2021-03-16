import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { BiDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { GiShinyEntrance } from "react-icons/gi";
import { ImLocation, ImPriceTag } from "react-icons/im";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { AdDetail } from "../../../components/ad/AdDetail";
import { AdRecent } from "../../../components/ad/AdRecent";
import { Breadcrumbs } from "../../../components/ad/Breadcrumbs";
import { Layout } from "../../../components/Layout";
import { Categories } from "../../../components/navbar/MenuRoutes";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { formatDate } from "../../../utils/formatDate";
import { formatImageGallery } from "../../../utils/formatImageGallery";
import { formatProfileLink } from "../../../utils/formatLinks";
import { formatLocation } from "../../../utils/formatLocation";
import { formatPrice } from "../../../utils/formatPrice";
import {
  HOME_PAGE,
  LOADING_TITLE,
  OTHER_ADS_LABEL,
} from "../../../utils/strings";
import { useGetAdFromUrl } from "../../../utils/useGetAdFromUrl";

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
    <Layout title={ad ? ad.title : LOADING_TITLE}>
      {ad ? (
        <Box>
          <Breadcrumbs items={breadItems()} />
          <Flex mt={4} flexDir={{ base: "column-reverse", md: "row" }}>
            <Box w="400px" alignSelf="start">
              <ReactImageGallery
                items={formatImageGallery(ad.images)}
                autoPlay
                showNav={false}
                showPlayButton={false}
                showBullets
                infinite
              />
            </Box>
            <Box w="auto" ml={4}>
              <Heading size="md">{ad.title}</Heading>
              <Text>{formatDate(ad.createdAt)}</Text>
              <AdDetail
                icon={FaUser}
                text={ad.owner.username}
                avatar={ad.owner.avatar}
                href={formatProfileLink(ad.owner.id)}
              />
              <AdDetail icon={GiShinyEntrance} text={ad.wear} />
              <AdDetail
                icon={ImLocation}
                text={formatLocation(ad.owner.county, ad.owner.city)}
              />
              <AdDetail icon={ImPriceTag} text={formatPrice(ad.price)} />
              <AdDetail icon={BiDetail} text={ad.desc} />
            </Box>
          </Flex>
          <AdRecent
            owner={ad.owner.username}
            label={OTHER_ADS_LABEL}
            recent={ad.recent}
            ownerId={ad.owner.id}
          />
        </Box>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ViewAd);
