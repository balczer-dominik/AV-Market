import { HStack } from "@chakra-ui/layout";
import { useIsAuth } from "@utils/hooks/useIsAuth";
import React from "react";
import { Conversation } from "./Conversation";
import { MessagesProvider } from "./MessagesProvider";
import { PartnerInfo } from "./PartnerInfo";
import { RecentConversations } from "./RecentConversations";

export const Messages: React.FC<{}> = ({}) => {
  useIsAuth();
  return (
    <MessagesProvider>
      <HStack
        justifyContent="space-between"
        spacing={0}
        w="full"
        h="calc(100vh - 72px)"
        maxH="calc(100vh - 72px)"
      >
        <RecentConversations />
        <Conversation />
        <PartnerInfo />
      </HStack>
    </MessagesProvider>
  );
};
