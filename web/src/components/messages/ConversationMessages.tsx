import { VStack } from "@chakra-ui/layout";
import React from "react";
import { PaginatedMessages } from "./PaginatedMessages";

interface ConversationMessagesProps {
  conversationId: number;
  messageCursors: any[];
  setMessageCursors: React.Dispatch<React.SetStateAction<any[]>>;
  messages: any[];
}

export const ConversationMessages: React.FC<ConversationMessagesProps> = ({
  conversationId,
  messageCursors,
  setMessageCursors,
  messages,
}) => {
  const onLoadMore = (cursor: string) => {
    setMessageCursors([...messageCursors, cursor]);
  };

  return (
    <VStack
      flexDir="column-reverse"
      justify="start"
      maxH="full"
      h="full"
      overflow="auto"
    >
      <PaginatedMessages
        conversationId={conversationId}
        messages={messages}
        isLastPage={false}
        onLoadMore={onLoadMore}
      />
      {messageCursors.map((c, i) => (
        <PaginatedMessages
          conversationId={conversationId}
          cursor={c}
          isLastPage={i === messageCursors.length - 1}
          onLoadMore={onLoadMore}
        />
      ))}
    </VStack>
  );
};
