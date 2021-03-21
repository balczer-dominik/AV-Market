import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Tag,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { BsImageFill } from "react-icons/bs";
import { Ad } from "../../generated/graphql";
import {
  FRONT_COLOR_DARKER,
  FRONT_COLOR_LIGHTER,
  FRONT_COLOR_LIGHTEST,
  BACK_COLOR_LIGHTEST,
  FRONT_COLOR,
  WHITE,
} from "../../utils/colors";
import {
  formatAdLink,
  formatAdsLink,
  formatAdSrc,
  formatProfileLink,
} from "../../utils/formatLinks";
import { formatPrice } from "../../utils/formatPrice";
import { NO_OTHER_RECENT_ADS, OTHERS_LABEL } from "../../utils/strings";

interface AdRecentProps {
  owner: string;
  ownerId: number;
  label: string;
  recent: Partial<Ad>[];
}

export const AdRecent: React.FC<AdRecentProps> = ({
  owner,
  label,
  recent,
  ownerId,
}) => {
  return (
    <Box mt={4} w="full">
      <Flex justify="space-between" mb={2} aling="center">
        <Heading fontSize="xl" color={FRONT_COLOR_LIGHTER}>
          <NextLink href={formatProfileLink(ownerId)}>
            <Link style={{ textDecoration: "none" }} color={FRONT_COLOR_DARKER}>
              <b>{owner}</b>
            </Link>
          </NextLink>{" "}
          {label}
        </Heading>
        <NextLink href={formatAdsLink(ownerId)}>
          <Link style={{ textDecoration: "none" }} color={FRONT_COLOR_LIGHTEST}>
            {OTHERS_LABEL}
          </Link>
        </NextLink>
      </Flex>

      <SimpleGrid justify="space-around" minChildWidth="150px" spacing="5px">
        {recent.length !== 0 ? (
          recent.map((ad) => (
            <Flex
              w="150px"
              justify="space-between"
              flexDir="column"
              p={2}
              as={Link}
              href={formatAdLink(ad.id)}
              style={{ textDecoration: "none" }}
              justifySelf="center"
            >
              <Image
                src={formatAdSrc(ad.thumbnail)}
                h={32}
                w="100%"
                objectFit="cover"
                fallback={
                  <Flex
                    h={32}
                    w="100%"
                    borderColor={FRONT_COLOR_LIGHTEST}
                    borderRadius="5px"
                    borderWidth="1px"
                    borderStyle="solid"
                    color={FRONT_COLOR}
                    align="center"
                    justify="space-around"
                    flexDir="column"
                    display={{ base: "none", md: "flex" }}
                  >
                    <Icon as={BsImageFill} h={50} w={50} />
                  </Flex>
                }
              />
              <Text isTruncated fontSize={14} mb={1}>
                {ad.title}
              </Text>
              <Tag bgColor={FRONT_COLOR} w="fit-content" color={WHITE}>
                {formatPrice(ad.price)}
              </Tag>
            </Flex>
          ))
        ) : (
          <Flex
            h="150px"
            w="full"
            align="center"
            justify="center"
            bgColor={FRONT_COLOR_LIGHTER}
            borderRadius="10px"
            color={BACK_COLOR_LIGHTEST}
          >
            {NO_OTHER_RECENT_ADS}
          </Flex>
        )}
      </SimpleGrid>
    </Box>
  );
};
