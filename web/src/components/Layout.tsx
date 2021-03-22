import { Box } from "@chakra-ui/react";
import { NavBar } from "@components/NavBar";
import { ThemeContext } from "@utils/ThemeProvider";
import Head from "next/head";
import React, { useContext } from "react";

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
  const {
    theme: { BG_COLOR, FRONT_COLOR },
  } = useContext(ThemeContext);
  return (
    <Box w="full" color={FRONT_COLOR} h="full">
      <style jsx global>{`
        body {
          background-color: ${BG_COLOR} !important;
        }
      `}</style>
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
