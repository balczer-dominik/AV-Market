import {
  Box,
  Collapse,
  Flex,
  Icon,
  Image,
  Link,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { isMobile } from "react-device-detect";
import { FaUser } from "react-icons/fa";
import { useMeQuery } from "../../generated/graphql";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTER_REGULAR_LIGHT_BROWN,
} from "../../utils/colors";
import { isServer } from "../../utils/isServer";
import { ProfileDropDown } from "./ProfileDropDown";
import { ProfileItems } from "./ProfileItems";

interface ProfileContainerProps {}

export const ProfileContainer: React.FC<ProfileContainerProps> = ({}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [{ data, fetching: meFetching }] = useMeQuery({ pause: isServer() });

  return (
    <>
      <Box
        py={{ base: 1, md: 4 }}
        my={{ base: 2, md: 0 }}
        onMouseEnter={() => {
          onToggle();
        }}
        onMouseLeave={() => {
          onToggle();
        }}
        display={{ base: "none", md: "block" }}
      >
        <Link>
          <Flex
            mr={2}
            align={"center"}
            flexDir={{ base: "row", md: "row-reverse" }}
            onClick={isMobile ? onToggle : null}
          >
            <Image
              borderRadius={"5px"}
              borderColor={LIGHTER_REGULAR_BROWN}
              borderWidth={3}
              borderStyle="solid"
              h={10}
              w={10}
              src={`/avatar/${data ? data.me.avatar : "undefined"}.png`}
              fallback={
                <Flex
                  align={"center"}
                  justify={"center"}
                  bgColor={LIGHTER_REGULAR_LIGHT_BROWN}
                  h={10}
                  w={10}
                  borderRadius={"5px"}
                  border={`3px ${LIGHTER_REGULAR_BROWN} solid`}
                >
                  <Icon as={FaUser} h={6} w={6} />
                </Flex>
              }
            />
          </Flex>
        </Link>
        <Collapse in={isOpen}>
          <ProfileDropDown userData={data} />
        </Collapse>
      </Box>
      {data ? (
        <VStack display={{ base: "block", md: "none" }}>
          <ProfileItems userData={data} />
        </VStack>
      ) : null}
    </>
  );
};
