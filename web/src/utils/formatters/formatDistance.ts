import { NO_DISTANCE } from "@resources/strings";

export const formatDistance = (dist: number) => {
  const distance = parseInt((Math.sqrt(dist) * 75).toString());
  return distance == 0 ? NO_DISTANCE : `${parseInt(distance.toString())} km`;
};
