import Icon from "@chakra-ui/icon";
import { Heading, HStack, VStack } from "@chakra-ui/layout";
import { Box, useDisclosure } from "@chakra-ui/react";
import { RegularButton } from "@components/RegularButton";
import {
  PRIVATE_MESSAGES_LABEL,
  START_CONVERSATION_LABEL,
} from "@resources/strings";
import React from "react";
import { MdChatBubble } from "react-icons/md";
import { ConversationFilter } from "./ConversationFilter";
import { NewConversationModal } from "./NewConversationModal";
import { PaginatedRecentConversation } from "./PaginatedRecentConversation";

interface RecentConversationsProps {
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

export const RecentConversations: React.FC<RecentConversationsProps> = ({
  state,
  setState,
}) => {
  const {
    isOpen: newConversationOpen,
    onOpen: openNewConversation,
    onClose: closeNewConversation,
  } = useDisclosure();

  const handleNewConversation = () => {
    setState({ ...state, pageVariables: [] });
    setState({ ...state, show: "conversation", pageVariables: [null] });
  };

  const handleFilterOnChange = (event) => {
    setState({ ...state, pageVariables: [null], filter: event.target.value });
  };

  return (
    <>
      <VStack
        w={{ base: "full", md: "400px" }}
        p={4}
        align="flex-start"
        spacing={0}
        display={{
          base: state.show === "recent" ? "flex" : "none",
          md: "flex",
        }}
        h="full"
      >
        <Heading pb={4}>{PRIVATE_MESSAGES_LABEL}</Heading>
        <Box my={2} w="full">
          <RegularButton w="full" onClick={() => openNewConversation()}>
            <HStack align="center" justify="space-between" w="full">
              <Heading size="md">{START_CONVERSATION_LABEL}</Heading>
              <Icon h={8} w={8} as={MdChatBubble} />
            </HStack>
          </RegularButton>
        </Box>
        <ConversationFilter
          handleFilterOnChange={handleFilterOnChange}
          value={state.filter}
        />
        <VStack overflowY="auto" overflowX="visible" w="full" h="full">
          {state.pageVariables.map((cursor, i) => (
            <PaginatedRecentConversation
              state={state}
              setState={setState}
              isLastPage={i === state.pageVariables.length - 1}
              onLoadMore={(cursor) =>
                setState({
                  ...state,
                  pageVariables: [...state.pageVariables, cursor],
                })
              }
              cursor={cursor}
            />
          ))}
        </VStack>
      </VStack>
      <NewConversationModal
        isOpen={newConversationOpen}
        onClose={closeNewConversation}
        handleNewConversation={handleNewConversation}
      />
    </>
  );
};
