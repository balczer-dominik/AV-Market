import { Heading, HStack, Text } from "@chakra-ui/react";
import { RegularButton } from "@components/RegularButton";
import {
  FEEDBACK_SUGGESTION_LABEL,
  LEAVE_FEEDBACK_LABEL,
} from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useMeId } from "@utils/hooks/useMeId";
import React, { useContext } from "react";
import { FaHeart } from "react-icons/fa";

interface FeedbackSuggestionProps {
  ownerId: number;
}

export const FeedbackSuggestion: React.FC<FeedbackSuggestionProps> = ({
  ownerId,
}) => {
  const {
    theme: { FRONT_COLOR_ALT, WHITE },
  } = useContext(ThemeContext);
  const meId = useMeId();

  return (
    <>
      {meId !== ownerId ? (
        <HStack
          bgColor={FRONT_COLOR_ALT}
          color={WHITE}
          w="full"
          borderRadius="10px"
          h="60px"
          mt={4}
          p={4}
          justify="space-between"
        >
          <Heading size="sm">{FEEDBACK_SUGGESTION_LABEL}</Heading>
          <HStack>
            <RegularButton variant="edit" href={`/feedback/${ownerId}`}>
              <HStack>
                <FaHeart />
                <Text display={{ base: "none", md: "block" }}>
                  {LEAVE_FEEDBACK_LABEL}
                </Text>
              </HStack>
            </RegularButton>
          </HStack>
        </HStack>
      ) : null}
    </>
  );
};
