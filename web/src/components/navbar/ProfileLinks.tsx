import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const ProfileLinks: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={3}
        align="left"
        justify={["flex-start", "flex-start", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
      >
        <Text>Sample User</Text>
      </Stack>
    </Box>
  );
};
