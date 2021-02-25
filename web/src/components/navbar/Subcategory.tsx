import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface SubcategoryProps {
  to;
}

export const Subcategory: React.FC<SubcategoryProps> = ({ to }) => {
  return (
    <Box
      pos={["relative", "absolute"]}
      zIndex="1"
      bgColor="#DAD4BE"
      display="block"
      p={2}
      mt={2}
    >
      <Text fontWeight="bold" display={["none", "block"]}>
        Title
      </Text>
      <Text>Alkategória</Text>
      <Text>Alkategória</Text>
      <Text>Nagyon hosszúúúúúúúúúúú</Text>
      <Text>Alkategória</Text>
      <Text>Alkategória</Text>
      <Text>Alkategória</Text>
      <Text>Alkategória</Text>
      <Text>Alkategória</Text>
      <Text>Alkategória</Text>
    </Box>
  );
};
