import Icon from "@chakra-ui/icon";
import { Heading, HStack, VStack } from "@chakra-ui/layout";
import { Box, useDisclosure } from "@chakra-ui/react";
import { RegularButton } from "@components/RegularButton";
import {
  PRIVATE_MESSAGES_LABEL,
  START_CONVERSATION_LABEL,
} from "@resources/strings";
import React, { useContext } from "react";
import { MdChatBubble } from "react-icons/md";
import { ConversationFilter } from "./ConversationFilter";
import { MessagesContext } from "./MessagesProvider";
import { NewConversationModal } from "./NewConversationModal";
import { PaginatedRecentConversation } from "./PaginatedRecentConversation";

export const RecentConversations: React.FC<{}> = ({}) => {
  const {
    isOpen: newConversationOpen,
    onOpen: openNewConversation,
    onClose: closeNewConversation,
  } = useDisclosure();

  const {
    state: { show, conversationCursors },
  } = useContext(MessagesContext);

  return (
    <>
      <VStack
        w={{ base: "full", md: "400px" }}
        p={4}
        align="flex-start"
        spacing={0}
        display={{
          base: show === "recent" ? "flex" : "none",
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
        <ConversationFilter />
        <VStack overflowY="auto" overflowX="visible" w="full" h="full">
          {conversationCursors.map((cursor, i) => (
            <PaginatedRecentConversation
              isLastPage={i === conversationCursors.length - 1}
              cursor={cursor}
            />
          ))}
        </VStack>
      </VStack>
      <NewConversationModal
        isOpen={newConversationOpen}
        onClose={closeNewConversation}
      />
    </>
  );
};
