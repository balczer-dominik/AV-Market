import { Heading, HStack, Text } from "@chakra-ui/react";
import { RegularButton } from "@components/RegularButton";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";
import { IconType } from "react-icons";

interface AdSuggestionProps {
  label: string;
  buttonLabel: string;
  ButtonIcon: IconType;
  href: string;
}

export const AdSuggestionBox: React.FC<AdSuggestionProps> = ({
  label,
  buttonLabel,
  href,
  ButtonIcon,
}) => {
  const {
    theme: { FRONT_COLOR_ALT, WHITE },
  } = useContext(ThemeContext);

  return (
    <>
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
        <Heading size="sm">{label}</Heading>
        <HStack>
          <RegularButton variant="edit" href={href}>
            <HStack>
              <ButtonIcon />
              <Text display={{ base: "none", md: "block" }}>{buttonLabel}</Text>
            </HStack>
          </RegularButton>
        </HStack>
      </HStack>
    </>
  );
};
