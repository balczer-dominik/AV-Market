import { Flex, Link } from "@chakra-ui/layout";
import { Icon, Image, Text, Tooltip } from "@chakra-ui/react";
import { useMessagesQuery } from "@generated/graphql";
import { LOAD_MORE_BUTTON } from "@resources/strings";
import { formatDateWithSeconds } from "@utils/formatters/formatDate";
import { formatAvatarLink } from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useMeId } from "@utils/hooks/useMeId";
import React, { useContext, useEffect } from "react";
import { FaUser } from "react-icons/fa";

interface PaginatedMessagesProps {
  conversationId: number;
  cursor?: string;
  messages?: any[];
  isLastPage: Boolean;
  onLoadMore: (cursor: string) => void;
}

export const PaginatedMessages: React.FC<PaginatedMessagesProps> = ({
  conversationId,
  cursor,
  isLastPage,
  messages,
  onLoadMore,
}) => {
  const [{ data }] = useMessagesQuery({
    variables: { cursor, conversationId },
    pause: !!messages,
  });
  const userId = useMeId();

  const {
    theme: { BACK_COLOR, BACK_COLOR_LIGHTEST, FRONT_COLOR_ALT, WHITE },
  } = useContext(ThemeContext);

  const fetchedMessages =
    messages && messages.length !== 0
      ? messages
      : data
      ? data.messages
        ? data.messages.messages
        : []
      : [];

  const hasMore = data
    ? data.messages
      ? data.messages.hasMore
      : false
    : false;

  const handleLoadMore = () => {
    if (cursor === undefined) {
      return;
    }

    onLoadMore(fetchedMessages[fetchedMessages.length - 1].createdAt);
  };

  return (
    <>
      {fetchedMessages.map((m, i) => (
        <>
          <Flex
            align="center"
            justify="space-between"
            w="fit-content"
            alignSelf={userId === m.author.id ? "flex-end" : "flex-start"}
            flexDir={userId === m.author.id ? "row-reverse" : "row"}
            my={2}
          >
            <Image
              h={10}
              mx={2}
              w={10}
              objectFit="cover"
              src={formatAvatarLink(m.author.avatar)}
              fallback={<Icon mx={2} as={FaUser} h={10} w={10} />}
              borderRadius="5px"
            />
            <Flex
              p={2}
              align="center"
              minH={10}
              maxW="calc(100% - 40px)"
              bgColor={
                userId === m.author.id ? BACK_COLOR : BACK_COLOR_LIGHTEST
              }
              borderRadius="5px"
            >
              <Tooltip
                label={formatDateWithSeconds(m.createdAt)}
                bgColor={FRONT_COLOR_ALT}
                color={WHITE}
                placement="top-start"
              >
                <Text>{m.content}</Text>
              </Tooltip>
            </Flex>
          </Flex>
          {i === fetchedMessages.length - 1 && isLastPage && hasMore ? (
            <Link p={4} onClick={() => handleLoadMore()}>
              {LOAD_MORE_BUTTON}
            </Link>
          ) : null}
        </>
      ))}
    </>
  );
};
