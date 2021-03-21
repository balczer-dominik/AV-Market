import { Box, Flex, Icon, IconButton, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { FRONT_COLOR_LIGHTER, FRONT_COLOR, WHITE } from "../../utils/colors";
import { POST_LABEL } from "../../utils/strings";

interface PostAdButtonProps {}

export const PostAdButton: React.FC<PostAdButtonProps> = ({}) => {
  return (
    <Box>
      <NextLink href="/ad/post">
        <Link style={{ textDecoration: "none" }}>
          <IconButton
            display={{ base: "none", md: "block" }}
            bgColor={FRONT_COLOR}
            color={WHITE}
            _hover={{ bgColor: FRONT_COLOR_LIGHTER }}
            aria-label={POST_LABEL}
            as={IoCreateOutline}
            p={2}
            mr={2}
          />
          <Flex
            display={{ base: "flex", md: "none" }}
            align="center"
            color={{ base: FRONT_COLOR, md: FRONT_COLOR_LIGHTER }}
            _hover={{ color: FRONT_COLOR }}
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
