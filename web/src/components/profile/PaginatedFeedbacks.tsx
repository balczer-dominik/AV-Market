import { Box, HStack, Icon, Image, Link, Text, VStack } from "@chakra-ui/react";
import { RegularButton } from "@components/RegularButton";
import { Repeat } from "@components/Repeat";
import { Spinner } from "@components/Spinner";
import { useKarmaQuery } from "@generated/graphql";
import { LOAD_MORE_BUTTON } from "@resources/strings";
import { formatDate } from "@utils/formatters/formatDate";
import {
  formatAdLink,
  formatAdSrc,
  formatAvatarLink,
  formatProfileLink,
} from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import NextLink from "next/link";
import React, { useContext } from "react";
import { FaHeart, FaHeartBroken, FaUser } from "react-icons/fa";
import { MdImage } from "react-icons/md";

interface PaginatedFeedbacksProps {
  cursor: string;
  variables: {
    recipientId: number;
    satisfied: any;
  };
  isLastPage: Boolean;
  onLoadMore: (cursor: string) => void;
}

export const PaginatedFeedbacks: React.FC<PaginatedFeedbacksProps> = ({
  cursor,
  variables,
  isLastPage,
  onLoadMore,
}) => {
  const {
    theme: { BACK_COLOR_LIGHTEST, FRONT_COLOR_DARKER },
  } = useContext(ThemeContext);
  const [{ data, fetching }] = useKarmaQuery({
    variables: { cursor, ...variables, first: 5 },
  });

  const feedbacks = data ? data.feedbacks.feedbacks : null;
  const hasMore = data ? data.feedbacks.hasMore : false;

  const handleLoadMore = () => {
    onLoadMore(feedbacks[feedbacks.length - 1].createdAt);
  };

  return (
    <>
      {fetching ? (
        <Repeat n={5}>
          <Box my={2} w="full">
            <Spinner height="100px" />
          </Box>
        </Repeat>
      ) : feedbacks ? (
        <VStack w="full">
          {feedbacks.map((feedback) => (
            <>
              <Text mb={-1} alignSelf="flex-start" fontSize="xs">
                {formatDate(feedback.createdAt)}
              </Text>
              <VStack
                align="flex-start"
                w="full"
                bgColor={BACK_COLOR_LIGHTEST}
                p={2}
                borderRadius="5px"
              >
                <NextLink href={formatAdLink(feedback.ad.id)} passHref>
                  <Link style={{ textDecoration: "none" }} w="full">
                    <HStack justify="start">
                      {feedback.ad.thumbnail ? (
                        <Image
                          src={formatAdSrc(feedback.ad.thumbnail)}
                          h={8}
                          w={8}
                          borderRadius="5px"
                          objectFit="cover"
                        />
                      ) : (
                        <Icon as={MdImage} h={8} w={8} borderRadius="5px" />
                      )}

                      <Text isTruncated>{feedback.ad.title}</Text>
                    </HStack>
                  </Link>
                </NextLink>
                <HStack justify="start">
                  {feedback.author.avatar ? (
                    <Image
                      src={formatAvatarLink(feedback.author.avatar)}
                      h={8}
                      w={8}
                      borderRadius="5px"
                      objectFit="cover"
                    />
                  ) : (
                    <Icon as={FaUser} h={8} w={8} borderRadius="5px" />
                  )}
                  <NextLink
                    href={formatProfileLink(feedback.author.id)}
                    passHref
                  >
                    <Link
                      color={FRONT_COLOR_DARKER}
                      style={{ textDecoration: "none" }}
                    >
                      {feedback.author.username}
                    </Link>
                  </NextLink>
                </HStack>
                <HStack justify="start">
                  {feedback.satisfied ? (
                    <Icon as={FaHeart} h={8} w={8} />
                  ) : (
                    <Icon as={FaHeartBroken} h={8} w={8} />
                  )}
                  <Text fontSize="sm" whiteSpace="pre-line">
                    {feedback.comment ?? ""}
                  </Text>
                </HStack>
              </VStack>
            </>
          ))}
          {isLastPage && hasMore ? (
            <RegularButton onClick={handleLoadMore}>
              {LOAD_MORE_BUTTON}
            </RegularButton>
          ) : null}
        </VStack>
      ) : null}
    </>
  );
};
