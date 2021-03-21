import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { BiDetail } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiShinyEntrance } from "react-icons/gi";
import { ImLocation, ImPriceTag } from "react-icons/im";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { AdDetail } from "../../../components/ad/AdDetail";
import { AdRecent } from "../../../components/ad/AdRecent";
import { Breadcrumbs } from "../../../components/ad/Breadcrumbs";
import { Layout } from "../../../components/Layout";
import {
  Categories,
  MainCategory,
} from "../../../components/navbar/MenuRoutes";
import { BACK_COLOR_LIGHTER, FRONT_COLOR } from "../../../utils/colors";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { formatDate } from "../../../utils/formatDate";
import { formatImageGallery } from "../../../utils/formatImageGallery";
import {
  formatBrowseCategory,
  formatBrowseSubCategory,
  formatProfileLink,
} from "../../../utils/formatLinks";
import { formatLocation } from "../../../utils/formatLocation";
import { formatPrice } from "../../../utils/formatPrice";
import {
  HOME_PAGE,
  LOADING_TITLE,
  NO_IMAGES,
  OTHER_ADS_LABEL,
  SEARCH_AD_PAGE_TITLE,
} from "../../../utils/strings";
import { useGetAdFromUrl } from "../../../utils/useGetAdFromUrl";

interface ViewAdProps {}

const ViewAd: React.FC<ViewAdProps> = ({}) => {
  const [{ data }] = useGetAdFromUrl();
  const ad = data ? data.ad.ad : null;

  const breadItems = () => [
    {
      href: "/",
      label: HOME_PAGE,
    },
    {
      href: "/ad/search",
      label: SEARCH_AD_PAGE_TITLE,
    },
    {
      href: formatBrowseCategory(ad.category as MainCategory),
      label: Categories[ad.category].title,
    },
    {
      href: formatBrowseSubCategory(
        ad.category as MainCategory,
        ad.subCategory
      ),
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
              {ad.images.length !== 0 ? (
                <ReactImageGallery
                  items={formatImageGallery(ad.images)}
                  autoPlay
                  showNav={false}
                  showPlayButton={false}
                  showBullets
                  infinite
                />
              ) : (
                <Flex
                  w="full"
                  bgColor={BACK_COLOR_LIGHTER}
                  color={FRONT_COLOR}
                  align="center"
                  justify="space-around"
                  flexDir="column"
                  borderRadius="10px"
                  h="270px"
                  display={{ base: "none", md: "flex" }}
                >
                  <Icon as={BsImageFill} h={100} w={100} />
                  {NO_IMAGES}
                </Flex>
              )}
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
