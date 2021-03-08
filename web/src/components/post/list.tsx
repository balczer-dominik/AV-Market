import { Box } from "@chakra-ui/react";
import React from "react";

interface listProps {
  lista: string[];
}

export const List: React.FC<listProps> = ({}) => {
  return (
    <div>
      <List lista={["kecske", "kutya"]} />
      <p>fff</p>
      <p>fff</p>
      <p>fff</p>
      <p>fff</p>
      <Box>5665</Box>
    </div>
  );
};
