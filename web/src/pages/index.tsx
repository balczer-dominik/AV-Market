import { Flex, SimpleGrid, Stack, VStack } from "@chakra-ui/layout";
import { Heading, Text, Image, Icon, Tag } from "@chakra-ui/react";
import { FeaturedCarousel } from "@components/FeaturedCarousel";
import { Layout } from "@components/Layout";
import { RegularButton } from "@components/RegularButton";
import { useAdsQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import {
  ADVERTISE_LABEL,
  BROWSE_ADS_LABEL,
  POST_LABEL,
  RECENT_ADS,
  SHOP_LABEL,
} from "@utils/strings";
import { ThemeContext } from "@utils/ThemeProvider";
import { withUrqlClient } from "next-urql";
import React, { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NextLink from "next/link";
import { BsImageFill } from "react-icons/bs";
import { formatPrice } from "@utils/formatPrice";

const Index = () => {
  const {
    theme: {
      BACK_COLOR_LIGHTER,
      BACK_COLOR_LIGHTEST_ALT,
      FRONT_COLOR_ALT,
      WHITE,
    },
  } = useContext(ThemeContext);
  const [{ data, fetching }] = useAdsQuery({
    variables: {
      first: 11,
      search: {},
      sortBy: {},
    },
  });

  const ads = !fetching && data ? (data.ads.ads ? data.ads.ads : null) : null;

  return (
    <Layout title="Főoldal" variant="regular">
      <Stack
        flexDir={{ base: "column", md: "row" }}
        justify="space-around"
        w="full"
        align="center"
        bgColor={BACK_COLOR_LIGHTER}
        borderRadius="10px"
        py={4}
        px={{ base: 4, md: 0 }}
      >
        <VStack align="start" spacing={4} w={{ base: "full", md: "320px" }}>
          <Heading size="xl">{SHOP_LABEL}</Heading>
          <NextLink href="/ad/search">
            <RegularButton w={{ base: "full", md: "320px" }} h="60px">
              <Text fontSize="xl">{BROWSE_ADS_LABEL}</Text>
            </RegularButton>
          </NextLink>
        </VStack>
        <VStack align="start" spacing={4} w={{ base: "full", md: "320px" }}>
          <Heading size="xl">{ADVERTISE_LABEL}</Heading>
          <NextLink href="/ad/post">
            <RegularButton w={{ base: "full", md: "320px" }} h="60px">
              <Text fontSize="xl">{POST_LABEL}</Text>
            </RegularButton>
          </NextLink>
        </VStack>
      </Stack>
      <FeaturedCarousel ads={ads?.filter((_, i) => i < 5)} />
      <Heading size="xl" my={4}>
        {RECENT_ADS}
      </Heading>
      <SimpleGrid minChildWidth="250px" columns={3} spacing={4}>
        {ads
          ?.filter((_, i) => i >= 5)
          .map((ad) => (
            <VStack align="start">
              <Image
                src={ad.thumbnail}
                h="100px"
                objectFit="cover"
                fallback={
                  <Flex
                    w="full"
                    justify="center"
                    align="center"
                    h="100px"
                    bgColor={BACK_COLOR_LIGHTEST_ALT}
                    color={FRONT_COLOR_ALT}
                    borderRadius="5px"
                  >
                    <Icon as={BsImageFill} />
                  </Flex>
                }
                borderRadius="5px"
              />
              <Heading size="sm" isTruncated>
                {ad.title}
              </Heading>
              <Tag bgColor={FRONT_COLOR_ALT} w="fit-content" color={WHITE}>
                {formatPrice(ad.price)}
              </Tag>
            </VStack>
          ))}
      </SimpleGrid>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
