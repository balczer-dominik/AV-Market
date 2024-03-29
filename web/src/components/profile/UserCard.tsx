import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useContext } from "react";
import { FaEdit, FaHeart, FaTruck, FaUser } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { RiChat3Fill } from "react-icons/ri";
import { formatAdsLink, formatAvatarLink } from "@utils/formatters/formatLinks";
import {
  LEAVE_FEEDBACK_LABEL,
  PROFILE_EDIT_LABEL,
  SEND_MESSAGE_LABEL,
} from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { RegularButton } from "../RegularButton";
import { useMeId } from "@utils/hooks/useMeId";

interface UserCardProps {
  userId: number;
  username: string;
  avatarSrc?: string;
  karmaP: number;
  karmaN: number;
  adCount: number;
  deliveryCount: number;
  fetching: Boolean;
}

const FallbackAvatar = () => {
  return (
    <Flex
      justify="center"
      align="center"
      bgColor="gray.300"
      h={270}
      w="full"
      borderRadius="10px"
      p={2}
    >
      <Icon color="gray.600" as={FaUser} h={150} w={150} />
    </Flex>
  );
};

export const UserCard: React.FC<UserCardProps> = ({
  userId,
  username,
  avatarSrc,
  karmaP,
  karmaN,
  adCount,
  deliveryCount,
  fetching,
}) => {
  const {
    theme: { FRONT_COLOR_LIGHTEST, BACK_COLOR_LIGHTEST, WHITE },
  } = useContext(ThemeContext);

  const meId = useMeId();

  return (
    <Box width={{ base: "full", md: "30%" }}>
      <VStack
        align="start"
        justify="space-between"
        bgColor={BACK_COLOR_LIGHTEST}
        borderRadius="10px"
        p={3}
      >
        {fetching ? (
          <Spinner />
        ) : (
          <>
            <Image
              borderRadius="10px"
              alignSelf="center"
              src={formatAvatarLink(avatarSrc)}
              fallback={<FallbackAvatar />}
            />
            <VStack w="full">
              <Heading
                size="md"
                my={2}
                mt={1}
                pb={2}
                w="full"
                borderBottom={`2px solid ${FRONT_COLOR_LIGHTEST}`}
              >
                {username}
              </Heading>
              <HStack justify="space-between" w="100%">
                <Icon as={FaHeart} h={8} w={8} />
                <Text fontSize="xl">{`${
                  karmaP + karmaN === 0
                    ? "-"
                    : ((karmaP / (karmaP + karmaN)) * 100).toFixed()
                }% (${karmaP}/${karmaN})`}</Text>
              </HStack>
              <Box w="100%">
                <NextLink href={formatAdsLink(userId)} passHref>
                  <Link style={{ textDecoration: "none" }}>
                    <HStack justify="space-between">
                      <Icon as={ImPriceTags} h={8} w={8} />
                      <Text fontSize="xl">{adCount}</Text>
                    </HStack>
                  </Link>
                </NextLink>
              </Box>
              <HStack
                justify="space-between"
                w="100%"
                borderBottom={`2px solid ${FRONT_COLOR_LIGHTEST}`}
                pb={2}
                mb={2}
              >
                <Icon as={FaTruck} h={8} w={8} />
                <Text fontSize="xl">{deliveryCount}</Text>
              </HStack>
              {meId !== userId ? (
                <RegularButton w="full">
                  <HStack justify="space-between" w="full">
                    <Icon as={RiChat3Fill} w={6} h={6} />
                    <Text>{SEND_MESSAGE_LABEL}</Text>
                  </HStack>
                </RegularButton>
              ) : null}
              {meId !== userId ? (
                <RegularButton w="full" href={`/feedback/${userId}`}>
                  <HStack justify="space-between" w="full">
                    <Icon as={FaHeart} w={6} h={6} />
                    <Text>{LEAVE_FEEDBACK_LABEL}</Text>
                  </HStack>
                </RegularButton>
              ) : null}
              {meId === userId ? (
                <RegularButton w="full" variant="solid" href="/profile/edit">
                  <HStack justify="space-between" w="full">
                    <Icon as={FaEdit} color={WHITE} w={6} h={6} />
                    <Text>{PROFILE_EDIT_LABEL}</Text>
                  </HStack>
                </RegularButton>
              ) : null}
            </VStack>
          </>
        )}
      </VStack>
    </Box>
  );
};
