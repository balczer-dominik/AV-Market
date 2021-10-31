import { Box } from "@chakra-ui/layout";
import { MAPBOX_ACCESS_TOKEN } from "@resources/env";
import { getMapCenter } from "@utils/getMapCenter";
import React from "react";
import ReactMapboxGl from "react-mapbox-gl";

interface DeliveryLocationSelectProps {
  sellerCoords?: {
    longitude: number;
    latitude: number;
  };
  buyerCoords?: {
    longitude: number;
    latitude: number;
  };
}

export const DeliveryLocationSelect: React.FC<DeliveryLocationSelectProps> = ({
  sellerCoords,
  buyerCoords,
}) => {
  const Map = ReactMapboxGl({ accessToken: MAPBOX_ACCESS_TOKEN });
  const center = getMapCenter(sellerCoords, buyerCoords);

  return (
    <>
      <Box minH="400px" h="400px" mt={4}>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          center={center}
          zoom={[10]}
          containerStyle={{
            height: "100%",
            width: "100%",
          }}
        ></Map>
      </Box>
    </>
  );
};
