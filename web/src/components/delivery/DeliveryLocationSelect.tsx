import { MAPBOX_ACCESS_TOKEN } from "@resources/env";
import { coordsToArray, getMapCenter } from "@utils/getMapCenter";
import React from "react";
import { Feature, Layer, Marker } from "react-mapbox-gl";
import ReactMapboxGl from "react-mapbox-gl";
import { Box } from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import { FaMapMarker } from "react-icons/fa";

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
        >
          {/*sellerCoords.longitude ? (
            <Layer
              type="symbol"
              id="marker"
              layout={{
                "icon-image":
                  "https://icons8.com/iconizer/files/Brightmix/orig/monotone_location_pin_marker.png",
              }}
            >
              <Feature coordinates={coordsToArray(sellerCoords)} />
            </Layer>
          ) : null}
          {buyerCoords.longitude ? (
            <Marker coordinates={coordsToArray(buyerCoords)} anchor="bottom">
              <Icon as={FaMapMarker} />
            </Marker>
          ) : null*/}
        </Map>
      </Box>
    </>
  );
};
