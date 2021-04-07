import { Box } from "@chakra-ui/layout";
import React from "react";

interface PartnerInfoProps {
  state: {
    show: string;
    conversationId: any;
  };
}

export const PartnerInfo: React.FC<PartnerInfoProps> = ({ state }) => {
  return (
    <Box
      w={{ base: "full", md: "400px" }}
      p={4}
      align="flex-start"
      display={{
        base: state.show === "info" ? "flex" : "none",
        md: "flex",
      }}
      h="full"
    >
      PartnerInfo
    </Box>
  );
};
