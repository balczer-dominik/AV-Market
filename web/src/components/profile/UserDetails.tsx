import { Box, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { MdMail, MdPhone } from "react-icons/md";
import { RiMessengerFill } from "react-icons/ri";
import {
  FRONT_COLOR_LIGHTER,
  FRONT_COLOR_LIGHTEST,
  BACK_COLOR_LIGHTEST,
  WHITE,
} from "../../utils/colors";
import { formatPhone } from "../../utils/formatPhoneNumber";
import {
  CONTACTS_LABEL,
  EMAIL_LABEL,
  MESSENGER_LABEL,
  PHONE_LABEL,
} from "../../utils/strings";

interface UserDetailsProps {
  county?: string;
  city?: string;
  phone?: string;
  messenger?: string;
  email: string;
  coords?: [number, number];
}

export const UserDetails: React.FC<UserDetailsProps> = ({
  phone,
  messenger,
  email,
}) => {
  return (
    <Box w="full">
      <VStack align="start" p={3} w="full">
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
        <HStack
          justify="space-between"
          w="full"
          bgColor={FRONT_COLOR_LIGHTER}
          color={BACK_COLOR_LIGHTEST}
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
            bgColor={FRONT_COLOR_LIGHTER.toUpperCase()}
            color={BACK_COLOR_LIGHTEST}
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
            bgColor={FRONT_COLOR_LIGHTER.toUpperCase()}
            color={BACK_COLOR_LIGHTEST}
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
      </VStack>
    </Box>
  );
};
