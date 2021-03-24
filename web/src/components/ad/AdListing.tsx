import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { DropzoneThumb } from "@components/DropzoneThumb";
import { AdSnippetFragment } from "@generated/graphql";
import { formatDate } from "@utils/formatDate";
import {
  formatAdLink,
  formatAdSrc,
  formatProfileLink,
} from "@utils/formatLinks";
import { formatLocation } from "@utils/formatLocation";
import { formatPhone } from "@utils/formatPhoneNumber";
import { formatPrice } from "@utils/formatPrice";
import { FEATURED_LABEL, LAST_UPDATE_AT } from "@utils/strings";
import { ThemeContext } from "@utils/ThemeProvider";
import NextLink from "next/link";
import React, { useContext } from "react";
import { BsImageFill } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";

interface AdListingProps {
  ad: Partial<AdSnippetFragment>;
  thumbPreview?: File;
  noOutline?: boolean;
  mt?: number;
}

export const AdListing: React.FC<AdListingProps> = ({
  ad: {
    id,
    owner: { username, id: ownerId, email, messenger, phone, county, city },
    title,
    featured,
    thumbnail,
    createdAt,
    updatedAt,
    price,
  },
  thumbPreview,
  noOutline = false,
  mt = 2,
}) => {
  const {
    theme: {
      FRONT_COLOR_DARKER,
      FRONT_COLOR_LIGHTER,
      FRONT_COLOR_LIGHTEST,
      BACK_COLOR_LIGHTEST,
      FRONT_COLOR,
      FRONT_COLOR_ALT,
      WHITE,
    },
  } = useContext(ThemeContext);
  return (
    <Flex
      mt={mt}
      h={160}
      borderColor={FRONT_COLOR_LIGHTER}
      borderWidth={!noOutline ? "1px" : "0px"}
      borderTopWidth="1px"
      borderstyle="solid"
      borderRadius={noOutline ? "0px" : "5px"}
      bgColor={featured ? BACK_COLOR_LIGHTEST : "unset"}
      p={2}
      w="full"
      position="relative"
    >
      {featured ? (
        <Box
          position="absolute"
          top={0}
          right={1}
          bgColor={FRONT_COLOR_LIGHTER}
          color={WHITE}
        >
          <Heading size="sm" p={1}>
            {FEATURED_LABEL.toUpperCase()}
          </Heading>
        </Box>
      ) : null}

      {thumbPreview ? (
        <DropzoneThumb file={thumbPreview} />
      ) : (
        <Image
          src={formatAdSrc(thumbnail)}
          m={1}
          mr={4}
          maxW={130}
          minW={130}
          w={130}
          objectFit="cover"
          fallback={
            <Flex
              m={1}
              mr={4}
              align="center"
              justify="center"
              w={130}
              maxW={130}
              minW={130}
              bgColor={FRONT_COLOR_LIGHTEST}
              color={BACK_COLOR_LIGHTEST}
            >
              <Icon as={BsImageFill} w={30} h={30} />
            </Flex>
          }
        />
      )}
      <Box w="100%">
        <Flex flexDir="column" justify="space-between" h="100%">
          <Box>
            <NextLink href={formatAdLink(id)}>
              <Link style={{ textDecoration: "none" }}>
                <Heading size="sm">{title}</Heading>
              </Link>
            </NextLink>
            <HStack
              flexDir={{ base: "column", md: "row" }}
              spacing={{ base: 0, md: 2 }}
              align={{ base: "flex-start", md: "center" }}
            >
              <NextLink href={formatProfileLink(ownerId)}>
                <Link style={{ textDecoration: "none" }}>
                  <Text
                    color={FRONT_COLOR_DARKER}
                    style={{ textDecoration: "none" }}
                    fontSize="sm"
                  >
                    {username}
                  </Text>
                </Link>
              </NextLink>
              <Text
                color={FRONT_COLOR_LIGHTER}
                style={{ textDecoration: "none" }}
                fontSize="xs"
                display={city || county ? "block" : "none"}
              >
                {`${formatLocation(county, city).toUpperCase()}`}
              </Text>
            </HStack>

            <Tooltip
              placement="bottom-start"
              label={`${LAST_UPDATE_AT}: ${formatDate(updatedAt)}`}
              aria-label={LAST_UPDATE_AT}
            >
              <Text
                color={FRONT_COLOR_LIGHTER}
                style={{ textDecoration: "none" }}
                fontSize="sm"
                display={{ base: "none", md: "block" }}
              >
                {formatDate(createdAt)}
              </Text>
            </Tooltip>
          </Box>
          <Flex justify="space-between" align="center">
            <Tag bgColor={FRONT_COLOR_ALT} w="fit-content" color={WHITE}>
              {formatPrice(price)}
            </Tag>
            <Box display={{ base: "none", md: "block" }}>
              <Tooltip label={email}>
                <span>
                  <Icon as={MdMail} color={FRONT_COLOR} ml={2} h={8} w={8} />
                </span>
              </Tooltip>
              {messenger ? (
                <Tooltip label={messenger}>
                  <span>
                    <Icon
                      as={FaFacebookMessenger}
                      color={FRONT_COLOR}
                      ml={2}
                      h={6}
                      w={6}
                    />
                  </span>
                </Tooltip>
              ) : null}
              {phone ? (
                <Tooltip label={formatPhone(phone)}>
                  <span>
                    <Icon
                      as={RiPhoneFill}
                      color={FRONT_COLOR}
                      ml={2}
                      h={6}
                      w={6}
                    />
                  </span>
                </Tooltip>
              ) : null}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
