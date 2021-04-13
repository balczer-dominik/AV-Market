import { VStack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { MessagesContext } from "./MessagesProvider";
import { PaginatedMessages } from "./PaginatedMessages";

interface ConversationMessagesProps {
  bottomRef: React.MutableRefObject<HTMLDivElement>;
}

export const ConversationMessages: React.FC<ConversationMessagesProps> = ({
  bottomRef,
}) => {
  const {
    state: { messageCursors },
  } = useContext(MessagesContext);

  return (
    <VStack
      py={4}
      flexDir="column-reverse"
      justify="start"
      maxH="full"
      h="full"
      overflow="auto"
    >
      <Box ref={bottomRef} />

      <PaginatedMessages cursor={undefined} isLastPage={false} />
      {messageCursors.map((c, i) => (
        <PaginatedMessages
          cursor={c}
          isLastPage={i === messageCursors.length - 1}
        />
      ))}
    </VStack>
  );
};
