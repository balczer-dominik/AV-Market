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
import { MessagesContext } from "./MessagesProvider";

interface ConversationTitlebarProps {
  partner: string;
}

export const ConversationTitlebar: React.FC<ConversationTitlebarProps> = ({
  partner,
}) => {
  //Color context
  const {
    theme: { BACK_COLOR_LIGHTEST },
  } = useContext(ThemeContext);

  //Messages context
  const { dispatch } = useContext(MessagesContext);

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
          dispatch({ type: "closeConversation" });
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
        onClick={() => dispatch({ type: "showInfo" })}
      >
        <HStack>
          <Text>{USER_DETAILS_LABEL}</Text>
          <Icon as={FaUser} />
        </HStack>
      </Link>
    </HStack>
  );
};
