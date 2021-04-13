import {
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RECENT_YOUR_MESSAGE_LABEL } from "@resources/strings";
import { formatAvatarLink } from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useMeId } from "@utils/hooks/useMeId";
import React, { useContext, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { MessagesContext } from "./MessagesProvider";

interface RecentConversationProps {
  isLast: Boolean;
  conversation: any;
}

export const RecentConversation: React.FC<RecentConversationProps> = ({
  conversation,
  isLast,
}) => {
  //Color context
  const {
    theme: {
      FRONT_COLOR_LIGHTER,
      FRONT_COLOR_DARKER,
      FRONT_COLOR,
      BACK_COLOR_LIGHTER,
      BACK_COLOR_LIGHTEST,
    },
  } = useContext(ThemeContext);

  //Messages context
  const {
    state: { conversationId },
    dispatch,
  } = useContext(MessagesContext);

  const meId = useMeId();

  const active = conversationId === conversation.id;

  useEffect(() => {
    if (active) conversation.latest.read = true;
  }, [active]);

  return (
    <Link
      style={{ textDecoration: "none" }}
      onClick={() =>
        dispatch({
          type: "switchConversations",
          payload: { conversationId: conversation.id },
        })
      }
      mt="0 !important"
      w="full"
    >
      <HStack
        align="center"
        justify="flex-start"
        p={1}
        pt={2}
        w="full"
        borderColor={FRONT_COLOR_LIGHTER}
        _hover={{
          bgColor: active ? BACK_COLOR_LIGHTER : BACK_COLOR_LIGHTEST,
          color: FRONT_COLOR_DARKER,
        }}
        borderTopWidth="1px"
        borderBottomWidth={isLast ? "1px" : "0px"}
        bgColor={active ? BACK_COLOR_LIGHTER : "unset"}
        color={active ? FRONT_COLOR_DARKER : FRONT_COLOR}
      >
        <Image
          p={2}
          src={formatAvatarLink(conversation.partner.avatar)}
          h={16}
          w={16}
          objectFit="cover"
          fallback={<Icon h={16} w={16} p={2} as={FaUser} />}
        />
        <VStack align="start" w="80%">
          <Heading size="sm">{conversation.partner.username}</Heading>
          <Text
            isTruncated
            w="full"
            fontWeight={
              conversation.latest.read || conversation.latest.authorId === meId
                ? "unset"
                : "bold"
            }
          >
            {`${
              meId === conversation.latest.authorId
                ? RECENT_YOUR_MESSAGE_LABEL
                : ""
            }${conversation.latest.content}`}
          </Text>
        </VStack>
      </HStack>
    </Link>
  );
};
