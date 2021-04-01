import { VStack } from "@chakra-ui/layout";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { FEEDBACKS_LABEL } from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext, useEffect, useState } from "react";
import { BsHeartHalf } from "react-icons/bs";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { PaginatedFeedbacks } from "./PaginatedFeedbacks";

interface UserRatingsProps {
  userId: number;
}

export const UserRatings: React.FC<UserRatingsProps> = ({ userId }) => {
  const {
    theme: {
      FRONT_COLOR_LIGHTEST,
      WHITE,
      FRONT_COLOR_DARKER_ALT,
      FRONT_COLOR_LIGHTER_ALT,
    },
  } = useContext(ThemeContext);
  const [variables, setVariables] = useState({
    recipientId: userId,
    satisfied: undefined,
  });
  const [cursors, setCursors] = useState([null as string]);
  useEffect(() => {
    setCursors([null as string]);
  }, [variables]);

  return (
    <VStack p={3} w="full" mt={2}>
      <Heading
        size="lg"
        mb={2}
        pb={2}
        w="full"
        borderBottom={`2px solid ${FRONT_COLOR_LIGHTEST}`}
      >
        {FEEDBACKS_LABEL}
      </Heading>
      <Flex width="full" px={4} color={WHITE} justify="space-between">
        <Flex
          py={2}
          justify="center"
          align="center"
          height="full"
          borderStartRadius="10px"
          borderWidth="2px"
          width="40%"
          bgColor={
            variables.satisfied === undefined
              ? FRONT_COLOR_DARKER_ALT
              : FRONT_COLOR_LIGHTER_ALT
          }
          onClick={() => {
            setVariables({ ...variables, satisfied: undefined });
          }}
        >
          <Icon as={BsHeartHalf} h={6} w={6} />
        </Flex>
        <Flex
          py={2}
          justify="center"
          align="center"
          height="full"
          borderWidth="2px"
          width="30%"
          bgColor={
            variables.satisfied === true
              ? FRONT_COLOR_DARKER_ALT
              : FRONT_COLOR_LIGHTER_ALT
          }
          onClick={() => {
            setVariables({ ...variables, satisfied: true });
          }}
        >
          <Icon as={FaHeart} h={6} w={6} />
        </Flex>
        <Flex
          py={2}
          justify="center"
          align="center"
          height="full"
          borderEndRadius="10px"
          borderWidth="2px"
          width="30%"
          bgColor={
            variables.satisfied === false
              ? FRONT_COLOR_DARKER_ALT
              : FRONT_COLOR_LIGHTER_ALT
          }
          onClick={() => {
            setVariables({ ...variables, satisfied: false });
          }}
        >
          <Icon as={FaHeartBroken} h={6} w={6} />
        </Flex>
      </Flex>
      {cursors.map((cursor, i) => (
        <PaginatedFeedbacks
          key={"" + cursor}
          cursor={cursor}
          variables={variables}
          isLastPage={i === cursors.length - 1}
          onLoadMore={(cursor) => setCursors([...cursors, cursor])}
        />
      ))}
    </VStack>
  );
};
