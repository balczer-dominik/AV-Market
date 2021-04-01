import { Box, Flex, Icon, IconButton, Link, Text } from "@chakra-ui/react";
import { MESSAGES_LABEL } from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import NextLink from "next/link";
import React, { useContext } from "react";
import { MdChatBubble } from "react-icons/md";

interface MessagesButtonProps {}

export const MessagesButton: React.FC<MessagesButtonProps> = ({}) => {
  const {
    theme: { FRONT_COLOR_LIGHTER_ALT, FRONT_COLOR, FRONT_COLOR_ALT, WHITE },
  } = useContext(ThemeContext);
  return (
    <Box>
      <NextLink href="/messages" passHref>
        <Link style={{ textDecoration: "none" }}>
          <IconButton
            display={{ base: "none", md: "block" }}
            bgColor={FRONT_COLOR_ALT}
            color={WHITE}
            _hover={{ bgColor: FRONT_COLOR_LIGHTER_ALT }}
            aria-label={MESSAGES_LABEL}
            as={MdChatBubble}
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
            <Icon as={MdChatBubble} mr={2} />

            <Text>{MESSAGES_LABEL}</Text>
          </Flex>
        </Link>
      </NextLink>
    </Box>
  );
};
