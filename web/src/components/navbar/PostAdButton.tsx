import { Box, Flex, Icon, IconButton, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useContext } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { POST_LABEL } from "@utils/strings";
import { ThemeContext } from "@utils/ThemeProvider";

interface PostAdButtonProps {}

export const PostAdButton: React.FC<PostAdButtonProps> = ({}) => {
  const {
    theme: { FRONT_COLOR_LIGHTER_ALT, FRONT_COLOR, FRONT_COLOR_ALT, WHITE },
  } = useContext(ThemeContext);
  return (
    <Box>
      <NextLink href="/ad/post" passHref>
        <Link style={{ textDecoration: "none" }}>
          <IconButton
            display={{ base: "none", md: "block" }}
            bgColor={FRONT_COLOR_ALT}
            color={WHITE}
            _hover={{ bgColor: FRONT_COLOR_LIGHTER_ALT }}
            aria-label={POST_LABEL}
            as={IoCreateOutline}
            p={2}
            mr={2}
          />
          <Flex
            display={{ base: "flex", md: "none" }}
            align="center"
            color={{ base: FRONT_COLOR, md: FRONT_COLOR_LIGHTER_ALT }}
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
