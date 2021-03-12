import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Ad } from "../../generated/graphql";
import {
  DARKER_REGULAR_BROWN,
  LIGHTER_REGULAR_BROWN,
  REGULAR_BROWN,
} from "../../utils/colors";
import {
  formatAdLink,
  formatAdSrc,
  formatProfileLink,
} from "../../utils/formatLinks";
import { formatPrice } from "../../utils/formatPrice";
import { OWNER_OTHER_ADS } from "../../utils/strings";
import NextLink from "next/link";

interface AdRecentProps {
  owner: string;
  ownerId: number;
  recent: Partial<Ad>[];
}

export const AdRecent: React.FC<AdRecentProps> = ({
  owner,
  recent,
  ownerId,
}) => {
  return (
    <Box mt={4}>
      <Heading fontSize="xl" color={LIGHTER_REGULAR_BROWN}>
        <NextLink href={formatProfileLink(ownerId)}>
          <Link style={{ textDecoration: "none" }} color={DARKER_REGULAR_BROWN}>
            <b>{owner}</b>
          </Link>
        </NextLink>{" "}
        {OWNER_OTHER_ADS}
      </Heading>
      <SimpleGrid justify="space-around" minChildWidth="150px" spacing="5px">
        {recent.map((ad) => (
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
            />
            <Text isTruncated fontSize={14} mb={1}>
              {ad.title}
            </Text>
            <Tag bgColor={REGULAR_BROWN} w="fit-content">
              {formatPrice(ad.price)}
            </Tag>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};
