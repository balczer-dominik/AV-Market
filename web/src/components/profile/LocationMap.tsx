import { Box } from "@chakra-ui/react";
import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../../utils/env";

interface LocationMapProps {
  coordinates: [number, number];
}

export const LocationMap: React.FC<LocationMapProps> = ({ coordinates }) => {
  const Map = ReactMapboxGl({ accessToken: MAPBOX_ACCESS_TOKEN });
  return (
    <Box w="full" minH="300px" maxH="300px" h="300px" mb={4}>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        center={[coordinates[0], coordinates[1]]}
      ></Map>
    </Box>
  );
};
