import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { BiPhone } from "react-icons/bi";
import { FaFacebookMessenger } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { Ad, AdSnippetFragment } from "../../generated/graphql";
import { LIGHTER_REGULAR_BROWN, REGULAR_BROWN } from "../../utils/colors";
import { formatPrice } from "../../utils/formatPrice";
import { LAST_UPDATE_AT, PRICE_LABEL, SENT_IN_BY } from "../../utils/strings";
import NextLink from "next/link";
import { RiPhoneFill } from "react-icons/ri";
import { formatPhone } from "../../utils/formatPhoneNumber";
import { DropzoneThumb } from "../post/DropzoneThumb";

interface AdListingProps {
  ad: Partial<AdSnippetFragment>;
  thumbPreview?: File;
}

export const AdListing: React.FC<AdListingProps> = ({
  ad: {
    id,
    owner: { username, id: ownerId, email, messenger, phone, county, city },
    title,
    thumbnail,
    createdAt,
    updatedAt,
    price,
  },
  thumbPreview,
}) => {
  return (
    <Flex
      h={150}
      borderColor={LIGHTER_REGULAR_BROWN}
      borderWidth="1px"
      borderstyle="solid"
      borderRadius="5px"
      p={2}
    >
      {thumbPreview ? (
        <DropzoneThumb file={thumbPreview} />
      ) : (
        <Image src={`/ad/${thumbnail}`} m={1} mr={4} />
      )}
      <Box w="100%">
        <Flex flexDir="column" justify="space-between" h="100%">
          <Box>
            <NextLink href={`ad/view/${id}`}>
              <Link style={{ textDecoration: "none" }}>
                <Heading size="md">{title}</Heading>
              </Link>
            </NextLink>
            <Text fontSize="sm">{`${county ? county + ", " : ""}${
              city ?? ""
            }`}</Text>
            <Tooltip
              label={`${LAST_UPDATE_AT}: ${updatedAt}`}
              aria-label={LAST_UPDATE_AT}
            >
              <NextLink href={`profile/view/${ownerId}`}>
                <Link>
                  <Text
                    style={{ textDecoration: "none" }}
                    fontSize="sm"
                  >{`${SENT_IN_BY}: ${username}, ${createdAt}`}</Text>
                </Link>
              </NextLink>
            </Tooltip>
          </Box>
          <Flex justify="space-between" align="center">
            <Heading size="sm">{`${PRICE_LABEL}: ${formatPrice(
              price
            )}`}</Heading>
            <Box>
              <Tooltip label={email}>
                <span>
                  <Icon as={MdMail} color={REGULAR_BROWN} ml={2} h={8} w={8} />
                </span>
              </Tooltip>
              {messenger ? (
                <Tooltip label={messenger}>
                  <span>
                    <Icon
                      as={FaFacebookMessenger}
                      color={REGULAR_BROWN}
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
                      color={REGULAR_BROWN}
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
