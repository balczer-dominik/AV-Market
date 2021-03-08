import { Box } from "@chakra-ui/react";
import React from "react";
import { REGULAR_BROWN } from "../utils/colors";
import { NavBar } from "./navbar/NavBar";

export type LayoutVariant = "small" | "regular";

interface LayoutProps {
  variant?: LayoutVariant;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <>
      <NavBar />
      <Box
        maxWidth={variant === "regular" ? "850px" : "400px"}
        w="100%"
        mx="auto"
        px={4}
        mt={8}
        color={REGULAR_BROWN}
        alignContent="center"
        pb={4}
        bgColor="white"
      >
        {children}
      </Box>
    </>
  );
};
