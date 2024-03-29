import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "src/resources/env";
import { LOCATION_LABEL, NO_LOCATION_PROVIDED } from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";

interface LocationMapProps {
  coordinates?: [number, number];
}

export const LocationMap: React.FC<LocationMapProps> = ({ coordinates }) => {
  const {
    theme: {
      FRONT_COLOR_LIGHTER_ALT,
      FRONT_COLOR_LIGHTEST,
      BACK_COLOR_LIGHTEST_ALT,
    },
  } = useContext(ThemeContext);
  const Map = ReactMapboxGl({ accessToken: MAPBOX_ACCESS_TOKEN });
  return (
    <>
      <VStack align="start" p={3} w="full" mt={2}>
        <Heading
          size="lg"
          mb={2}
          pb={2}
          w="full"
          borderBottom={`2px solid ${FRONT_COLOR_LIGHTEST}`}
        >
          {LOCATION_LABEL}
        </Heading>
        {coordinates ? (
          <Box w="full" minH="300px" maxH="300px" h="300px" mb={4}>
            <Map
              style="mapbox://styles/mapbox/streets-v9"
              center={[coordinates[0], coordinates[1]]}
            ></Map>
          </Box>
        ) : (
          <Flex
            h="100px"
            w="full"
            align="center"
            justify="center"
            borderRadius="10px"
            bgColor={FRONT_COLOR_LIGHTER_ALT}
            color={BACK_COLOR_LIGHTEST_ALT}
          >
            {NO_LOCATION_PROVIDED}
          </Flex>
        )}
      </VStack>
    </>
  );
};
