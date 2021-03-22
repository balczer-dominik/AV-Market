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
import React, { useContext } from "react";
import { isMobile } from "react-device-detect";
import { FaUser } from "react-icons/fa";
import { useMeQuery } from "@generated/graphql";
import { isServer } from "@utils/isServer";
import { ThemeContext } from "@utils/ThemeProvider";
import { ProfileDropDown } from "@components/ProfileDropDown";
import { ProfileItems } from "@components/ProfileItems";

interface ProfileContainerProps {}

export const ProfileContainer: React.FC<ProfileContainerProps> = ({}) => {
  const {
    theme: { FRONT_COLOR_LIGHTER, BACK_COLOR_LIGHTER },
  } = useContext(ThemeContext);
  const { isOpen, onToggle } = useDisclosure();
  const [{ data }] = useMeQuery({ pause: isServer() });

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
              borderColor={FRONT_COLOR_LIGHTER}
              borderWidth={3}
              borderStyle="solid"
              h={10}
              w={10}
              src={`/avatar/${data ? data.me.avatar : "undefined"}.png`}
              fallback={
                <Flex
                  align={"center"}
                  justify={"center"}
                  bgColor={BACK_COLOR_LIGHTER}
                  h={10}
                  w={10}
                  borderRadius={"5px"}
                  border={`3px ${FRONT_COLOR_LIGHTER} solid`}
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
