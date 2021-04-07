import { Heading, HStack, Icon, Link, Text } from "@chakra-ui/react";
import {
  BACK_BUTTON,
  NO_USER_CONVERSATION_TITLE,
  USER_DETAILS_LABEL,
} from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

interface ConversationTitlebarProps {
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
  partner: string;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ConversationTitlebar: React.FC<ConversationTitlebarProps> = ({
  partner,
  state,
  setState,
  setMessages,
}) => {
  const {
    theme: { BACK_COLOR_LIGHTEST },
  } = useContext(ThemeContext);
  return (
    <HStack
      justify={{ base: "space-between", md: "center" }}
      p={4}
      bgColor={BACK_COLOR_LIGHTEST}
    >
      <Link
        style={{ textDecoration: "none" }}
        display={{ base: "flex", md: "none" }}
        onClick={() => {
          setState({ ...state, conversationId: 0, show: "recent" });
          setMessages([]);
        }}
      >
        <HStack>
          <Icon as={IoIosArrowBack} />
          <Text>{BACK_BUTTON}</Text>
        </HStack>
      </Link>
      <Heading size="md">
        {partner.length !== 0 ? partner : NO_USER_CONVERSATION_TITLE}
      </Heading>
      <Link
        style={{ textDecoration: "none" }}
        display={{ base: "flex", md: "none" }}
        onClick={() => setState({ ...state, show: "info" })}
      >
        <HStack>
          <Text>{USER_DETAILS_LABEL}</Text>
          <Icon as={FaUser} />
        </HStack>
      </Link>
    </HStack>
  );
};
