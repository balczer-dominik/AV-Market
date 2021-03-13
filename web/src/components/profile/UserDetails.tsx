import { Box, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { MdMail, MdPhone } from "react-icons/md";
import { RiMessengerFill } from "react-icons/ri";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTEST_REGULAR_BROWN,
  LIGHTEST_REGULAR_LIGHT_BROWN,
} from "../../utils/colors";
import { formatPhone } from "../../utils/formatPhoneNumber";
import {
  CONTACTS_LABEL,
  EMAIL_LABEL,
  LOCATION_LABEL,
  MESSENGER_LABEL,
  PHONE_LABEL,
} from "../../utils/strings";
import { LocationMap } from "./LocationMap";

interface UserDetailsProps {
  county?: string;
  city?: string;
  phone?: string;
  messenger?: string;
  email: string;
  coords?: [number, number];
}

export const UserDetails: React.FC<UserDetailsProps> = ({
  county,
  city,
  phone,
  messenger,
  email,
  coords,
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
          borderBottom={`2px solid ${LIGHTEST_REGULAR_BROWN}`}
        >
          {CONTACTS_LABEL}
        </Heading>
        <HStack
          justify="space-between"
          w="full"
          bgColor={LIGHTER_REGULAR_BROWN}
          color={LIGHTEST_REGULAR_LIGHT_BROWN}
          borderRadius="5px"
          p={2}
        >
          <HStack>
            <Icon as={MdMail} w={8} h={8} />{" "}
            <Heading size="md" display={{ base: "none", md: "block" }}>
              {EMAIL_LABEL}
            </Heading>
          </HStack>
          <Text color="white">{email}</Text>
        </HStack>

        {phone ? (
          <HStack
            justify="space-between"
            w="full"
            bgColor={LIGHTER_REGULAR_BROWN.toUpperCase()}
            color={LIGHTEST_REGULAR_LIGHT_BROWN}
            borderRadius="5px"
            p={2}
          >
            <HStack>
              <Icon as={MdPhone} w={8} h={8} />{" "}
              <Heading size="md" display={{ base: "none", md: "block" }}>
                {PHONE_LABEL}
              </Heading>
            </HStack>
            <Text color="white">{formatPhone(phone)}</Text>
          </HStack>
        ) : null}

        {messenger ? (
          <HStack
            justify="space-between"
            w="full"
            bgColor={LIGHTER_REGULAR_BROWN.toUpperCase()}
            color={LIGHTEST_REGULAR_LIGHT_BROWN}
            borderRadius="5px"
            p={2}
          >
            <HStack>
              <Icon as={RiMessengerFill} w={8} h={8} />{" "}
              <Heading size="md" display={{ base: "none", md: "block" }}>
                {MESSENGER_LABEL}
              </Heading>
            </HStack>
            <Text color="white">{messenger}</Text>
          </HStack>
        ) : null}
      </VStack>
      {coords ? (
        <VStack align="start" p={3} w="full" mt={2}>
          <Heading
            size="lg"
            mb={2}
            pb={2}
            w="full"
            borderBottom={`2px solid ${LIGHTEST_REGULAR_BROWN}`}
          >
            {LOCATION_LABEL}
          </Heading>
          <LocationMap coordinates={coords} />
        </VStack>
      ) : null}
    </Box>
  );
};
