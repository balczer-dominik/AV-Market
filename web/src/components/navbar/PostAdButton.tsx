import { Box, Flex, Icon, IconButton, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { LIGHTER_REGULAR_BROWN, REGULAR_BROWN } from "../../utils/colors";
import { POST_LABEL } from "../../utils/strings";

interface PostAdButtonProps {}

export const PostAdButton: React.FC<PostAdButtonProps> = ({}) => {
  return (
    <Box>
      <NextLink href="/ad/post">
        <Link style={{ textDecoration: "none" }}>
          <IconButton
            display={{ base: "none", md: "block" }}
            bgColor={REGULAR_BROWN}
            color="white"
            _hover={{ bgColor: LIGHTER_REGULAR_BROWN }}
            aria-label={POST_LABEL}
            as={IoCreateOutline}
            p={2}
            mr={2}
          />
          <Flex
            display={{ base: "flex", md: "none" }}
            align="center"
            color={{ base: REGULAR_BROWN, md: LIGHTER_REGULAR_BROWN }}
            _hover={{ color: REGULAR_BROWN }}
            mb={3}
          >
            <Icon as={IoCreateOutline} mr={2} />

            <Text>{POST_LABEL}</Text>
          </Flex>
        </Link>
      </NextLink>
    </Box>
  );
};
