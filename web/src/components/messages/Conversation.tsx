import { Flex } from "@chakra-ui/layout";
import { useMessagesQuery } from "@generated/graphql";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext, useState } from "react";
import { ConversationControls } from "./ConversationControls";
import { ConversationMessages } from "./ConversationMessages";
import { ConversationTitlebar } from "./ConversationTitlebar";

interface ConversationProps {
  state: {
    show: string;
    conversationId: any;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      show: string;
      conversationId: any;
    }>
  >;
}

export const Conversation: React.FC<ConversationProps> = ({
  state,
  setState,
}) => {
  const [messageCursors, setMessageCursors] = useState([null]);
  const [messages, setMessages] = useState([]);
  const {
    theme: { BACK_COLOR_LIGHTEST },
  } = useContext(ThemeContext);
  const [{ data }] = useMessagesQuery({
    variables: { first: 0, conversationId: state.conversationId },
  });

  const title = data
    ? data.messages.partner
      ? data.messages.partner.username
      : ""
    : "";

  return (
    <Flex
      h="full"
      flexDir="column"
      justify="space-between"
      w={{ base: "full", md: "calc(100% - 800px)" }}
      display={{
        base: state.show === "conversation" ? "flex" : "none",
        md: "flex",
      }}
      borderX={`2px solid ${BACK_COLOR_LIGHTEST}`}
    >
      <ConversationTitlebar
        setState={setState}
        setMessages={setMessages}
        state={state}
        partner={title}
      />
      <ConversationMessages
        conversationId={state.conversationId}
        messageCursors={messageCursors}
        messages={messages}
        setMessageCursors={setMessageCursors}
      />
      <ConversationControls
        conversationId={state.conversationId}
        messages={messages}
        setMessages={setMessages}
      />
    </Flex>
  );
};
