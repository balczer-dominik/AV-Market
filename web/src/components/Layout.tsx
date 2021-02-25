import { Box } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./navbar/NavBar";

export type LayoutVariant = "small" | "regular";

interface LayoutProps {
  variant: LayoutVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Box
        maxWidth={variant === "regular" ? "800px" : "400px"}
        width="100%"
        mx="auto"
        mt={8}
      >
        {children}
      </Box>
    </>
  );
};
