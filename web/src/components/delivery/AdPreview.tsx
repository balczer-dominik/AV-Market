import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Flex, Heading, HStack, Link, VStack } from "@chakra-ui/layout";
import { useAdPreviewQuery } from "@generated/graphql";
import { Text } from "@chakra-ui/react";
import {
  formatAdLink,
  formatAdSrc,
  formatProfileLink,
} from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";
import { BsFillImageFill, BsImageFill } from "react-icons/bs";
import NextLink from "next/link";
import { FaLocationArrow, FaUser } from "react-icons/fa";
import { formatLocation } from "@utils/formatters/formatLocation";
import { PRICE_LABEL } from "@resources/strings";
import { formatPrice } from "@utils/formatters/formatPrice";
import { RegularButton } from "@components/RegularButton";

interface AdPreviewProps {
  ad:
    | {
        id: number;
        thumbnail?: string;
        title: string;
        price: number;
        owner: {
          id: number;
          username: string;
          county?: string;
          city?: string;
        };
      }
    | undefined;
}

export const AdPreview: React.FC<AdPreviewProps> = ({ ad }) => {
  const {
    theme: { FRONT_COLOR_ALT, WHITE },
  } = useContext(ThemeContext);

  return ad ? (
    <HStack
      bgColor={FRONT_COLOR_ALT}
      p={3}
      borderRadius="5px"
      color={WHITE}
      width="full"
    >
      <Image
        borderRadius="5px"
        objectFit="cover"
        src={formatAdSrc(ad.thumbnail)}
        w="15%"
        h={100}
        fallback={<Icon as={BsFillImageFill} w="15%" h={100} />}
      />
      <VStack justifyContent="space-between" alignItems="flex-start" maxW="82%">
        <Heading size="sm" isTruncated maxW="100%">
          <Link href={formatAdLink(ad.id)} as={NextLink} passHref>
            {ad.title}
          </Link>
        </Heading>
        <Flex>
          <Flex alignItems="center">
            <Icon as={FaUser} mr={1} />
            <Link href={formatProfileLink(ad.owner.id)} as={NextLink} passHref>
              {ad.owner.username}
            </Link>
          </Flex>

          <Flex ml={2} alignItems="center">
            <Icon as={FaLocationArrow} mr={1} />
            <Text fontSize="sm">
              {`${formatLocation(
                ad.owner.county,
                ad.owner.city
              ).toUpperCase()}`}
            </Text>
          </Flex>
        </Flex>
        <Heading size="md">
          {PRICE_LABEL}: {formatPrice(ad.price)}
        </Heading>
      </VStack>
    </HStack>
  ) : null;
};
