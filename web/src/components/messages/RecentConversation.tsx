import {
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatAvatarLink } from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";

interface RecentConversationProps {
  isLast: Boolean;
  conversation: any;
  active: Boolean;

  switchConversation: (conversationId: number) => void;
}

export const RecentConversation: React.FC<RecentConversationProps> = ({
  switchConversation,
  conversation,
  isLast,
  active,
}) => {
  const {
    theme: {
      FRONT_COLOR_LIGHTER,
      BACK_COLOR_LIGHTEST_ALT,
      FRONT_COLOR_DARKER_ALT,
      FRONT_COLOR,
    },
  } = useContext(ThemeContext);

  return (
    <Link
      style={{ textDecoration: "none" }}
      onClick={() => switchConversation(conversation.id)}
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
        borderTopWidth="1px"
        borderBottomWidth={isLast ? "1px" : "0px"}
        bgColor={active ? BACK_COLOR_LIGHTEST_ALT : "unset"}
        color={active ? FRONT_COLOR_DARKER_ALT : FRONT_COLOR}
      >
        <Image
          p={2}
          src={formatAvatarLink(conversation.partner.avatar)}
          h={16}
          w={16}
          objectFit="cover"
          fallback={<Icon h={16} w={16} p={2} as={FaUser} />}
        />
        <VStack align="start" w="full">
          <Heading size="sm">{conversation.partner.username}</Heading>
          <Text isTruncated w="full">
            {conversation.latest.content}
          </Text>
        </VStack>
      </HStack>
    </Link>
  );
};
