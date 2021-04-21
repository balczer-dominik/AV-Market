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
      flexDir="column"
      justify="start"
      maxH="full"
      h="full"
      overflow="auto"
    >
      {messageCursors.map((c, i) => (
        <PaginatedMessages cursor={c} isLastPage={i === 0} />
      ))}
      <PaginatedMessages cursor={undefined} isLastPage={false} />
      <Box ref={bottomRef} />
    </VStack>
  );
};
