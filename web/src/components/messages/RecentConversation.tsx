import {
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Conversation, useConversationPartnerQuery } from "@generated/graphql";
import { RECENT_YOUR_MESSAGE_LABEL } from "@resources/strings";
import { formatDateMessage } from "@utils/formatters/formatDate";
import { formatAvatarLink } from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useMeId } from "@utils/hooks/useMeId";
import React, { useContext, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { MessagesContext } from "./MessagesProvider";

interface RecentConversationProps {
  isLast: Boolean;
  conversation: Partial<Conversation>;
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

  const [{ data }] = useConversationPartnerQuery({
    variables: { conversationId: conversation.id },
    pause: typeof conversation.partner !== "undefined",
  });

  const partner =
    conversation.partner ?? (data ? data.conversation.partner : null);

  const meId = useMeId();

  const active = conversationId === conversation.id;

  useEffect(() => {
    active ? (conversation.latest.read = true) : null;
  }, [active]);

  return (
    <>
      {partner ? (
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
              src={formatAvatarLink(partner.avatar)}
              h={16}
              w={16}
              objectFit="cover"
              fallback={<Icon h={16} w={16} p={2} as={FaUser} />}
            />
            <VStack align="start" w="80%">
              <Heading size="sm">{partner.username}</Heading>
              <HStack justify="space-between" w="full">
                <Text
                  isTruncated
                  w="70%"
                  fontWeight={
                    !conversation.latest.read &&
                    conversation.latest.authorId !== meId
                      ? "bold"
                      : "unset"
                  }
                >
                  {`${
                    meId === conversation.latest.authorId
                      ? RECENT_YOUR_MESSAGE_LABEL
                      : ""
                  }${conversation.latest.content}`}
                </Text>
                <Text
                  color={FRONT_COLOR_LIGHTER}
                  px={2}
                  fontSize="smaller"
                  w="20%"
                  textAlign="end"
                >
                  {formatDateMessage(conversation.latest.createdAt)}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Link>
      ) : null}
    </>
  );
};
