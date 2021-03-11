import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { REGULAR_BROWN } from "../../utils/colors";

interface AdDetailProps {
  icon: IconType;
  text: string;
  href?: string;
}

export const AdDetail: React.FC<AdDetailProps> = ({ icon, text, href }) => {
  return (
    <Flex color={REGULAR_BROWN} align="center" my={3}>
      <Icon as={icon} w={8} h={8} mr={2} />
      <Text
        as={href ? Link : Text}
        href={href ?? null}
        fontSize={text.length > 40 ? 15 : 20}
      >
        {text}
      </Text>
    </Flex>
  );
};
