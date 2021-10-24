import { Box, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { formatPhone } from "@utils/formatters/formatPhoneNumber";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { MdMail, MdPhone } from "react-icons/md";
import { RiMessengerFill } from "react-icons/ri";
import {
  CONTACTS_LABEL,
  EMAIL_LABEL,
  LOCATION_LABEL,
  MESSENGER_LABEL,
  PHONE_LABEL,
} from "src/resources/strings";

interface UserDetailsProps {
  city?: string;
  county?: string;
  email: string;
  messenger?: string;
  phone?: string;
}

export const UserDetails: React.FC<UserDetailsProps> = ({
  city,
  county,
  email,
  messenger,
  phone,
}) => {
  const {
    theme: {
      FRONT_COLOR_LIGHTEST,
      FRONT_COLOR_LIGHTER_ALT,
      BACK_COLOR_LIGHTEST_ALT,
      WHITE,
    },
  } = useContext(ThemeContext);
  return (
    <Box w="full">
      <VStack align="start" p={3} w="full">
        {county || city ? null : (
          <Heading
            size="lg"
            my={2}
            mt={1}
            pb={2}
            w="full"
            borderBottom={`2px solid ${FRONT_COLOR_LIGHTEST}`}
          >
            {CONTACTS_LABEL}
          </Heading>
        )}
        <HStack
          justify="space-between"
          w="full"
          bgColor={FRONT_COLOR_LIGHTER_ALT}
          color={BACK_COLOR_LIGHTEST_ALT}
          borderRadius="5px"
          p={2}
        >
          <HStack>
            <Icon as={MdMail} w={8} h={8} />{" "}
            <Heading size="md" display={{ base: "none", md: "block" }}>
              {EMAIL_LABEL}
            </Heading>
          </HStack>
          <Text color={WHITE}>{email}</Text>
        </HStack>

        {phone ? (
          <HStack
            justify="space-between"
            w="full"
            bgColor={FRONT_COLOR_LIGHTER_ALT}
            color={BACK_COLOR_LIGHTEST_ALT}
            borderRadius="5px"
            p={2}
          >
            <HStack>
              <Icon as={MdPhone} w={8} h={8} />{" "}
              <Heading size="md" display={{ base: "none", md: "block" }}>
                {PHONE_LABEL}
              </Heading>
            </HStack>
            <Text color={WHITE}>{formatPhone(phone)}</Text>
          </HStack>
        ) : null}

        {messenger ? (
          <HStack
            justify="space-between"
            w="full"
            bgColor={FRONT_COLOR_LIGHTER_ALT}
            color={BACK_COLOR_LIGHTEST_ALT}
            borderRadius="5px"
            p={2}
          >
            <HStack>
              <Icon as={RiMessengerFill} w={8} h={8} />{" "}
              <Heading size="md" display={{ base: "none", md: "block" }}>
                {MESSENGER_LABEL}
              </Heading>
            </HStack>
            <Text color={WHITE}>{messenger}</Text>
          </HStack>
        ) : null}

        {city || county ? (
          <HStack
            justify="space-between"
            w="full"
            bgColor={FRONT_COLOR_LIGHTER_ALT}
            color={BACK_COLOR_LIGHTEST_ALT}
            borderRadius="5px"
            p={2}
          >
            <HStack>
              <Icon as={FaLocationArrow} w={8} h={8} />{" "}
              <Heading size="sm" display={{ base: "none", md: "block" }}>
                {LOCATION_LABEL}
              </Heading>
            </HStack>
            <VStack maxW="50%" spacing={0.5} align="flex-end">
              {city ? (
                <Text w="full" textAlign="end" isTruncated color={WHITE}>
                  {city}
                </Text>
              ) : null}
              {county ? (
                <Text w="full" textAlign="end" isTruncated color={WHITE}>
                  {county.toUpperCase()}
                </Text>
              ) : null}
            </VStack>
          </HStack>
        ) : null}
      </VStack>
    </Box>
  );
};
