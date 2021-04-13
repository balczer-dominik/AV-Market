import { Flex, Link } from "@chakra-ui/layout";
import { Icon, Image, Text, Tooltip } from "@chakra-ui/react";
import { useMessagesQuery } from "@generated/graphql";
import { LOAD_MORE_BUTTON } from "@resources/strings";
import { formatDateWithSeconds } from "@utils/formatters/formatDate";
import { formatAvatarLink } from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useMeId } from "@utils/hooks/useMeId";
import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { MessagesContext } from "./MessagesProvider";

interface PaginatedMessagesProps {
  cursor?: string;
  isLastPage: Boolean;
}

export const PaginatedMessages: React.FC<PaginatedMessagesProps> = ({
  cursor,
  isLastPage,
}) => {
  const {
    state: { conversationId, localMessages },
    dispatch,
  } = useContext(MessagesContext);

  const isLocal = typeof cursor === "undefined";

  const [{ data }] = useMessagesQuery({
    variables: { cursor, conversationId },
    pause: !!isLocal,
  });
  const userId = useMeId();

  const {
    theme: {
      BACK_COLOR,
      BACK_COLOR_LIGHTEST,
      FRONT_COLOR_ALT,
      WHITE,
      FRONT_COLOR_DARKER,
    },
  } = useContext(ThemeContext);

  const fetchedMessages =
    isLocal && localMessages.length !== 0
      ? localMessages
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
    dispatch({
      type: "loadMoreMessages",
      payload: {
        cursor: fetchedMessages[fetchedMessages.length - 1].createdAt,
      },
    });
  };

  return (
    <>
      {fetchedMessages.map((m, i) => (
        <>
          <Flex
            justify="space-between"
            maxW="90%"
            alignSelf={userId === m.author.id ? "flex-end" : "flex-start"}
            flexDir={userId === m.author.id ? "row-reverse" : "row"}
            my={2}
            key={m.id}
          >
            <Image
              h={10}
              mx={2}
              w={10}
              objectFit="cover"
              src={formatAvatarLink(m.author.avatar)}
              fallback={<Icon mx={2} as={FaUser} h={10} w={10} />}
              borderRadius="5px"
              alignSelf="flex-start"
            />
            <Flex
              p={2}
              align="center"
              minH={10}
              maxW="calc(100% - 40px)"
              overflowWrap="normal"
              bgColor={
                userId === m.author.id ? BACK_COLOR : BACK_COLOR_LIGHTEST
              }
              color={FRONT_COLOR_DARKER}
              borderRadius="5px"
            >
              <Tooltip
                label={formatDateWithSeconds(m.createdAt)}
                bgColor={FRONT_COLOR_ALT}
                color={WHITE}
                placement={userId === m.author.id ? "top-end" : "top-start"}
                wordBreak="break-all"
              >
                <Text overflowWrap="anywhere">{m.content}</Text>
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
