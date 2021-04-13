import { Box } from "@chakra-ui/layout";
import React, { useContext } from "react";
import { MessagesContext } from "./MessagesProvider";

export const PartnerInfo: React.FC<{}> = ({}) => {
  const {
    state: { show },
    dispatch,
  } = useContext(MessagesContext);
  return (
    <Box
      w={{ base: "full", md: "400px" }}
      p={4}
      align="flex-start"
      display={{
        base: show === "info" ? "flex" : "none",
        md: "flex",
      }}
      h="full"
      onClick={() => dispatch({ type: "closeInfo" })}
    >
      WIP
    </Box>
  );
};
