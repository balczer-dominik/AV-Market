import { Flex, Icon, Image, Link, Text } from "@chakra-ui/react";
import { formatAvatarLink } from "@utils/formatLinks";
import { ThemeContext } from "@utils/ThemeProvider";
import React, { useContext } from "react";
import { IconType } from "react-icons";

interface AdDetailProps {
  icon?: IconType;
  avatar?: string;
  text: string;
  href?: string;
}

export const AdDetail: React.FC<AdDetailProps> = ({
  icon,
  text,
  href,
  avatar,
}) => {
  const {
    theme: { FRONT_COLOR },
  } = useContext(ThemeContext);
  return (
    <Flex
      color={FRONT_COLOR}
      align="center"
      my={3}
      as={href ? Link : Text}
      href={href ?? null}
      style={{ textDecoration: "none" }}
    >
      {avatar ? (
        <Image
          w={8}
          h={8}
          mr={2}
          src={formatAvatarLink(avatar)}
          border={`2px solid ${FRONT_COLOR}`}
          boxSizing="content-box"
          borderRadius="3px"
          objectFit="cover"
        />
      ) : (
        <Icon
          as={icon}
          w={8}
          h={8}
          mr={2}
          alignSelf={text?.length > 40 ? "start" : "unset"}
        />
      )}

      <Text fontSize={text?.length > 40 ? 15 : 20} whiteSpace="pre-line">
        {text}
      </Text>
    </Flex>
  );
};
