import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Spinner } from "@components/Spinner";
import { Ad } from "@generated/graphql";
import { formatAdLink, formatAdSrc } from "@utils/formatters/formatLinks";
import { formatPrice } from "@utils/formatters/formatPrice";
import { FEATURED_LABEL } from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import NextLink from "next/link";
import React, { useContext } from "react";
import { BsImageFill } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";

interface FeaturedCarouselProps {
  ads;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ ads }) => {
  const {
    theme: {
      WHITE,
      BACK_COLOR_LIGHTEST_ALT,
      FRONT_COLOR_ALT,
      FRONT_COLOR_LIGHTER,
    },
  } = useContext(ThemeContext);
  return (
    <>
      <Heading size="xl" my={4}>
        {FEATURED_LABEL}
      </Heading>
      {ads ? (
        <Carousel
          autoPlay
          emulateTouch
          infiniteLoop
          showStatus={false}
          showThumbs={false}
        >
          {ads.map((ad) => (
            <NextLink href={formatAdLink(ad.id)} passHref>
              <Link>
                <Flex
                  borderRadius="10px"
                  position="relative"
                  justify="center"
                  align="center"
                  bgColor={BACK_COLOR_LIGHTEST_ALT}
                  color={FRONT_COLOR_ALT}
                  h={{ base: "300px", md: "500px" }}
                >
                  <Image
                    borderRadius="10px"
                    objectFit="cover"
                    src={formatAdSrc(ad.thumbnail)}
                    h={{ base: "300px", md: "500px" }}
                    fallback={<Icon h={50} w={50} as={BsImageFill} />}
                  />

                  <Box
                    display={ad.featured ? "block" : "none"}
                    position="absolute"
                    top={2}
                    left={2}
                    bgColor={FRONT_COLOR_LIGHTER}
                    color={WHITE}
                  >
                    <Heading size="sm" p={1}>
                      {FEATURED_LABEL.toUpperCase()}
                    </Heading>
                  </Box>

                  <Heading
                    bgColor={FRONT_COLOR_ALT}
                    color={WHITE}
                    position="absolute"
                    bottom={2}
                    left={2}
                    p={1}
                    borderRadius="5px"
                    as={VStack}
                    align="start"
                  >
                    <Text fontSize={{ base: "sm", md: "lg" }}>{ad.title}</Text>
                    <Text fontSize={{ base: "lg", md: "2xl" }}>
                      {formatPrice(ad.price)}
                    </Text>
                  </Heading>
                </Flex>
              </Link>
            </NextLink>
          ))}
        </Carousel>
      ) : (
        <Spinner height={{ base: "300px", md: "500px" }} />
      )}
    </>
  );
};
