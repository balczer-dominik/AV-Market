import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { AdControls } from "@components/ad/AdControls";
import { AdSuggestionBox } from "@components/ad/AdSuggestionBox";
import { FeedbackSuggestion } from "@components/ad/FeedbackSuggestion";
import { AdDetail } from "@components/AdDetail";
import { AdRecent } from "@components/AdRecent";
import { Breadcrumbs } from "@components/Breadcrumbs";
import { Layout } from "@components/Layout";
import { Categories, MainCategory } from "@components/MenuRoutes";
import { Spinner } from "@components/Spinner";
import { formatDate } from "@utils/formatters/formatDate";
import { formatImageGallery } from "@utils/formatters/formatImageGallery";
import {
  formatBrowseCategory,
  formatBrowseSubCategory,
  formatProfileLink,
} from "@utils/formatters/formatLinks";
import { formatLocation } from "@utils/formatters/formatLocation";
import { formatPrice } from "@utils/formatters/formatPrice";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useGetAdFromUrl } from "@utils/hooks/useGetAdFromUrl";
import { useMeId } from "@utils/hooks/useMeId";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import { withUrqlClient } from "next-urql";
import React, { useContext } from "react";
import { BiDetail, BiErrorCircle } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import { FaHeart, FaUser } from "react-icons/fa";
import { GiShinyEntrance, GiTruck } from "react-icons/gi";
import { ImLocation, ImPriceTag } from "react-icons/im";
import { RiTruckFill } from "react-icons/ri";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  AD_NOT_FOUND,
  DELIVERY_SUGGESTION_BUTTON_LABEL,
  DELIVERY_SUGGESTION_LABEL,
  FEEDBACK_SUGGESTION_LABEL,
  HOME_PAGE,
  LEAVE_FEEDBACK_LABEL,
  LOADING_TITLE,
  NO_IMAGES,
  OTHER_ADS_LABEL,
  SEARCH_AD_PAGE_TITLE,
} from "src/resources/strings";

const ViewAd: React.FC<{}> = () => {
  const {
    theme: { BACK_COLOR_LIGHTER, FRONT_COLOR },
  } = useContext(ThemeContext);
  const { fetching, ad } = useGetAdFromUrl();
  const meId = useMeId();

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
    <Layout title={!fetching ? (ad ? ad.title : AD_NOT_FOUND) : LOADING_TITLE}>
      {!fetching ? (
        ad ? (
          <Box>
            <Breadcrumbs items={breadItems()} />
            <AdControls adId={ad.id} ownerId={ad.owner.id} />
            <Flex mt={4} flexDir={{ base: "column", md: "row" }}>
              <Box w={{ base: "100%", md: "400px" }} alignSelf="start">
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
            {meId == ad.owner.id ? null : (
              <>
                <AdSuggestionBox
                  label={DELIVERY_SUGGESTION_LABEL}
                  href={`/delivery/${ad.id}`}
                  buttonLabel={DELIVERY_SUGGESTION_BUTTON_LABEL}
                  ButtonIcon={RiTruckFill}
                />
                <AdSuggestionBox
                  label={FEEDBACK_SUGGESTION_LABEL}
                  href={`/feedback/${ad.owner.id}`}
                  buttonLabel={LEAVE_FEEDBACK_LABEL}
                  ButtonIcon={FaHeart}
                />
              </>
            )}
            <AdRecent
              owner={ad.owner.username}
              label={OTHER_ADS_LABEL}
              recent={ad.recent}
              ownerId={ad.owner.id}
            />
          </Box>
        ) : (
          <Flex flexDir="column" justify="center" align="center" height="500px">
            <Icon as={BiErrorCircle} h={50} w={50} />
            <Heading size="md">{AD_NOT_FOUND}</Heading>
          </Flex>
        )
      ) : (
        <Spinner height="500px" />
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ViewAd);
