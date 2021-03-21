import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { BG_COLOR, FRONT_COLOR } from "../utils/colors";
import { NavBar } from "./navbar/NavBar";

export type LayoutVariant = "small" | "regular";

interface LayoutProps {
  variant?: LayoutVariant;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant = "regular",
  title,
}) => {
  return (
    <Box w="full" bgColor={BG_COLOR} color={FRONT_COLOR} h="full">
      <NavBar />
      <Box
        maxWidth={variant === "regular" ? "850px" : "400px"}
        w="100%"
        mx="auto"
        px={4}
        mt={8}
        alignContent="center"
        pb={4}
      >
        <Head>
          <title>{title} - AV Market</title>
          <link
            rel="shortcut icon"
            href="http://localhost:3000/av_logo_favico.ico"
          />
        </Head>
        {children}
      </Box>
    </Box>
  );
};
