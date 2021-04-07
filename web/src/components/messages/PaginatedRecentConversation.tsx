import { Box, Flex } from "@chakra-ui/react";
import { RegularButton } from "@components/RegularButton";
import { Spinner } from "@components/Spinner";
import { useRecentConversationsQuery } from "@generated/graphql";
import React from "react";
import { LOAD_MORE_BUTTON } from "src/resources/strings";
import { RecentConversation } from "./RecentConversation";

interface PaginatedRecentConversationProps {
  cursor?: string;
  isLastPage: Boolean;
  onLoadMore: (cursor: string) => void;
  state: {
    show: string;
    conversationId: any;
    filter: string;
    pageVariables: string[];
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      show: string;
      conversationId: any;
      filter: string;
      pageVariables: string[];
    }>
  >;
}

export const PaginatedRecentConversation: React.FC<PaginatedRecentConversationProps> = ({
  cursor,
  isLastPage,
  onLoadMore,
  state,
  setState,
}) => {
  //Query
  const [{ data, fetching }] = useRecentConversationsQuery({
    variables: {
      cursor,
      partnerUsernameFilter: state.filter,
    },
    pause: cursor === undefined,
  });

  const conversations = data ? data.recentConversations.conversations : null;
  const hasMore = data ? data.recentConversations.hasMore : false;

  const handleLoadMore = () => {
    const last = conversations[conversations.length - 1];
    onLoadMore(last.latest.createdAt);
  };

  const switchConversations = (conversationId: number) => {
    setState({ ...state, conversationId, show: "conversation" });
  };

  return (
    <>
      {fetching ? (
        <Box my={2} h="full">
          <Spinner height="full" />
        </Box>
      ) : conversations ? (
        conversations.map((conversation, i) => (
          <>
            <RecentConversation
              active={conversation.id === state.conversationId}
              conversation={conversation}
              switchConversation={switchConversations}
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
        ))
      ) : (
        <>Nincs</>
      )}
    </>
  );
};
