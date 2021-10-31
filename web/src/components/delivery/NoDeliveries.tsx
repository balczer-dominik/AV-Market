import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { NO_RESULTS } from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import React, { useContext } from "react";

interface NoDeliveriesProps {
  fetching: boolean;
}

export const NoDeliveries: React.FC<NoDeliveriesProps> = ({ fetching }) => {
  const {
    theme: { FRONT_COLOR_ALT, WHITE },
  } = useContext(ThemeContext);

  return (
    <Center
      borderRadius="1rem"
      p={10}
      bgColor={FRONT_COLOR_ALT}
      color={WHITE}
      my={2}
    >
      {fetching ? <Spinner /> : NO_RESULTS}
    </Center>
  );
};
