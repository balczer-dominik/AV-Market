import { Flex, SimpleGrid, Stack, VStack } from "@chakra-ui/layout";
import { Heading, Text, Image, Icon, Tag, Link } from "@chakra-ui/react";
import { FeaturedCarousel } from "@components/FeaturedCarousel";
import { Layout } from "@components/Layout";
import { RegularButton } from "@components/RegularButton";
import { useAdsQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import {
  ADVERTISE_LABEL,
  BROWSE_ADS_LABEL,
  POST_LABEL,
  RECENT_ADS,
  SHOP_LABEL,
} from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { withUrqlClient } from "next-urql";
import React, { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NextLink from "next/link";
import { BsImageFill } from "react-icons/bs";
import { formatPrice } from "@utils/formatters/formatPrice";
import { formatAdLink, formatAdSrc } from "@utils/formatters/formatLinks";

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
        pt={2}
        pb={4}
        px={{ base: 4, md: 0 }}
      >
        <VStack align="start" spacing={4} w={{ base: "full", md: "320px" }}>
          <Heading size="xl">{SHOP_LABEL}</Heading>
          <RegularButton
            w={{ base: "full", md: "320px" }}
            h="60px"
            href="/ad/search"
          >
            <Text fontSize="xl">{BROWSE_ADS_LABEL}</Text>
          </RegularButton>
        </VStack>
        <VStack align="start" spacing={4} w={{ base: "full", md: "320px" }}>
          <Heading size="xl">{ADVERTISE_LABEL}</Heading>
          <RegularButton
            w={{ base: "full", md: "320px" }}
            h="60px"
            href="/ad/post"
          >
            <Text fontSize="xl">{POST_LABEL}</Text>
          </RegularButton>
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
            <NextLink href={formatAdLink(ad.id)} passHref>
              <Link style={{ textDecoration: "none" }}>
                <VStack align="start">
                  <Image
                    src={formatAdSrc(ad.thumbnail)}
                    w="100%"
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
                  <Heading size="sm" isTruncated maxW="100%">
                    {ad.title}
                  </Heading>
                  <Tag bgColor={FRONT_COLOR_ALT} w="fit-content" color={WHITE}>
                    {formatPrice(ad.price)}
                  </Tag>
                </VStack>
              </Link>
            </NextLink>
          ))}
      </SimpleGrid>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
