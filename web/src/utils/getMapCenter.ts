export type Coords = {
  latitude: number;
  longitude: number;
};

export const coordsToArray = (coords: Coords): [number, number] => {
  return [coords.longitude, coords.latitude];
};

export const getMapCenter = (
  sellerCoords: Coords,
  buyerCoords: Coords
): [number, number] => {
  if (buyerCoords.longitude && sellerCoords.longitude) {
    return [
      (buyerCoords.longitude + sellerCoords.longitude) / 2,
      (buyerCoords.latitude + sellerCoords.latitude) / 2,
    ];
  }
  if (sellerCoords.longitude) {
    return coordsToArray(sellerCoords);
  }
  if (buyerCoords.longitude) {
    return coordsToArray(buyerCoords);
  }
  return [19.0402, 47.4979];
};
