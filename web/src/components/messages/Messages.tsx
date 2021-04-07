import { HStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Conversation } from "./Conversation";
import { PartnerInfo } from "./PartnerInfo";
import { RecentConversations } from "./RecentConversations";

interface MessagesProps {}

export const Messages: React.FC<MessagesProps> = ({}) => {
  const [state, setState] = useState({
    show: "recent",
    conversationId: undefined,
    filter: "",
    pageVariables: [null as string],
  });
  return (
    <HStack
      justifyContent="space-between"
      spacing={0}
      w="full"
      h="calc(100vh - 72px)"
      maxH="calc(100vh - 72px)"
    >
      <RecentConversations state={state} setState={setState} />
      <Conversation state={state} setState={setState} />
      <PartnerInfo state={state} />
    </HStack>
  );
};
