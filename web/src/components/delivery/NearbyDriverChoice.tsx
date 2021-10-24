import { Flex, HStack, Link, VStack } from "@chakra-ui/layout";
import { Box, Icon, Image, Text } from "@chakra-ui/react";
import {
  formatAdsLink,
  formatAdSrc,
  formatAvatarLink,
  formatProfileLink,
} from "@utils/formatters/formatLinks";
import { formatLocation } from "@utils/formatters/formatLocation";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";
import { FaLocationArrow, FaUser } from "react-icons/fa";
import NextLink from "next/link";
import { CHOOSE_DRIVER_LABEL, DISTANCE } from "@resources/strings";
import { formatDistance } from "@utils/formatters/formatDistance";
import { RegularButton } from "@components/RegularButton";

interface NearbyDriverChoiceProps {
  driver: {
    id: number;
    username: string;
    avatar?: string;
    city?: string;
    county?: string;
    distance?: number;
  };
  state: {
    selectedDriver: number;
    setDriver: React.Dispatch<React.SetStateAction<number>>;
  };
}

export const NearbyDriverChoice: React.FC<NearbyDriverChoiceProps> = ({
  driver: { id, username, city, county, distance, avatar },
  state: { selectedDriver, setDriver },
}) => {
  const {
    theme: {
      FRONT_COLOR,
      FRONT_COLOR_DARKER,
      WHITE,
      BACK_COLOR,
      FRONT_COLOR_LIGHTEST,
    },
  } = useContext(ThemeContext);
  const isSelected = selectedDriver === id;

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mt={4}
      p={3}
      bgColor={isSelected ? FRONT_COLOR : FRONT_COLOR_LIGHTEST}
      color={WHITE}
      borderRadius="5px"
    >
      <Flex alignItems="center">
        <Flex
          w={100}
          h={100}
          justifyContent="center"
          alignItems="center"
          bgColor={FRONT_COLOR_DARKER}
          borderRadius="5px"
          mr={3}
        >
          <Image
            borderRadius="5px"
            objectFit="cover"
            src={formatAvatarLink(avatar)}
            fallback={<Icon as={FaUser} h={10} w={10} />}
          />
        </Flex>
        <VStack h="full" alignItems="flex-start">
          <Link href={formatProfileLink(id)} as={NextLink} passHref>
            {username}
          </Link>

          <Flex ml={2} alignItems="center">
            <Icon as={FaLocationArrow} mr={1} />
            <Text fontSize="sm">
              {`${formatLocation(county, city).toUpperCase()}`}
            </Text>
          </Flex>
          <Text>{DISTANCE + formatDistance(distance)}</Text>
        </VStack>
      </Flex>
      <RegularButton onClick={() => setDriver(id)} variant="edit">
        {CHOOSE_DRIVER_LABEL}
      </RegularButton>
    </Flex>
  );
};
