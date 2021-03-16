import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { LIGHTEST_REGULAR_BROWN } from "../../utils/colors";
import { MAPBOX_ACCESS_TOKEN } from "../../utils/env";
import { LOCATION_LABEL } from "../../utils/strings";

interface LocationMapProps {
  coordinates: [number, number];
}

export const LocationMap: React.FC<LocationMapProps> = ({ coordinates }) => {
  const Map = ReactMapboxGl({ accessToken: MAPBOX_ACCESS_TOKEN });
  return (
    <>
      {coordinates ? (
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
          <Box w="full" minH="300px" maxH="300px" h="300px" mb={4}>
            <Map
              style="mapbox://styles/mapbox/streets-v9"
              center={[coordinates[0], coordinates[1]]}
            ></Map>
          </Box>
        </VStack>
      ) : null}
    </>
  );
};
