import { Icon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Heading, VStack } from "@chakra-ui/layout";
import { UserDetails } from "@components/profile/UserDetails";
import { Spinner } from "@components/Spinner";
import { useConversationPartnerDetailsQuery } from "@generated/graphql";
import {
  formatAvatarLink,
  formatProfileLink,
} from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { MessagesContext } from "./MessagesProvider";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export const PartnerInfo: React.FC<{}> = ({}) => {
  const {
    state: { show, conversationId },
    dispatch,
  } = useContext(MessagesContext);

  const {
    theme: {},
  } = useContext(ThemeContext);

  const [{ data, fetching }] = useConversationPartnerDetailsQuery({
    variables: { conversationId },
    pause: !conversationId,
  });

  const partner = data
    ? data.conversation
      ? data.conversation.partner
      : null
    : null;

  return (
    <>
      <VStack
        w={{ base: "full", md: "400px" }}
        p={4}
        align="center"
        justify="space-between"
        display={{
          base: show === "info" ? "flex" : "none",
          md: "flex",
        }}
        h="full"
        onClick={() => dispatch({ type: "closeInfo" })}
      >
        {fetching ? (
          <Spinner height="full" />
        ) : partner ? (
          <VStack w="full">
            <Image
              h={"150px"}
              w={"150px"}
              px={2}
              objectFit="cover"
              src={formatAvatarLink(partner.avatar)}
              fallback={<Icon mx={2} as={FaUser} h={"150px"} w={"150px"} />}
              borderRadius="5px"
            />
            <NextLink href={formatProfileLink(partner.id)} passHref>
              <Link>
                <Heading size="xl">{partner.username}</Heading>
              </Link>
            </NextLink>
            <UserDetails
              email={partner.email}
              city={partner.city}
              county={partner.county}
              messenger={partner.messenger}
              phone={partner.phone}
            />
          </VStack>
        ) : null}
      </VStack>
    </>
  );
};
