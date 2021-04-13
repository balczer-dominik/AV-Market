import { Flex } from "@chakra-ui/layout";
import { useMessagesQuery } from "@generated/graphql";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext, useEffect, useRef } from "react";
import { ConversationControls } from "./ConversationControls";
import { ConversationMessages } from "./ConversationMessages";
import { ConversationTitlebar } from "./ConversationTitlebar";
import { MessagesContext } from "./MessagesProvider";

export const Conversation: React.FC<{}> = ({}) => {
  const {
    theme: { BACK_COLOR_LIGHTEST },
  } = useContext(ThemeContext);

  const {
    state: { localMessages, conversationId, show },
  } = useContext(MessagesContext);

  //TODO: Lecserélni ezt rendes partner lekérdezésre (és jó helyen meghivni(title-ben))
  const [{ data }] = useMessagesQuery({
    variables: { first: 0, conversationId },
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current.scrollIntoView();
  }, [localMessages]);

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
        base: show === "conversation" ? "flex" : "none",
        md: "flex",
      }}
      borderX={`2px solid ${BACK_COLOR_LIGHTEST}`}
    >
      <ConversationTitlebar partner={title} />
      <ConversationMessages bottomRef={bottomRef} />
      <ConversationControls />
    </Flex>
  );
};
