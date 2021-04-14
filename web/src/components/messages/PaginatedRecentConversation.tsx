import { Box, Flex } from "@chakra-ui/react";
import { RegularButton } from "@components/RegularButton";
import { Spinner } from "@components/Spinner";
import { useRecentConversationsQuery } from "@generated/graphql";
import React, { useContext } from "react";
import { LOAD_MORE_BUTTON } from "src/resources/strings";
import { MessagesContext } from "./MessagesProvider";
import { RecentConversation } from "./RecentConversation";

interface PaginatedRecentConversationProps {
  cursor?: string;
  isLastPage: Boolean;
}

export const PaginatedRecentConversation: React.FC<PaginatedRecentConversationProps> = ({
  cursor,
  isLastPage,
}) => {
  //Messages context
  const {
    state: { filter, localConversations },
    dispatch,
  } = useContext(MessagesContext);

  //Query
  const [{ data, fetching }] = useRecentConversationsQuery({
    variables: {
      cursor,
      partnerUsernameFilter: filter,
    },
    pause: cursor === undefined,
  });

  const isLocal = typeof cursor === "undefined";

  const conversations = isLocal
    ? localConversations
    : data
    ? data.recentConversations.conversations
    : null;

  const hasMore = data ? data.recentConversations.hasMore : false;

  const handleLoadMore = () => {
    const last = conversations[conversations.length - 1];
    dispatch({
      type: "loadMoreConversations",
      payload: { cursor: last.latest.createdAt },
    });
  };

  return (
    <>
      {fetching ? (
        <Box my={2} h="full" w="full">
          <Spinner height="full" />
        </Box>
      ) : conversations ? (
        conversations.map((conversation, i) => (
          <>
            {!isLocal &&
            localConversations
              .map((c) => c.id)
              .includes(conversation.id) ? null : (
              <>
                <RecentConversation
                  conversation={conversation}
                  isLast={i === conversations.length - 1 && isLastPage}
                />
                {i === conversations.length - 1 && isLastPage ? (
                  <Flex justify="center" w="full">
                    {hasMore ? (
                      <RegularButton onClick={handleLoadMore}>
                        {LOAD_MORE_BUTTON}
                      </RegularButton>
                    ) : null}
                  </Flex>
                ) : null}
              </>
            )}
          </>
        ))
      ) : (
        <>Nincs több...</>
      )}
    </>
  );
};
