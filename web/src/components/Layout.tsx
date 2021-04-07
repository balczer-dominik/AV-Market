import { Box } from "@chakra-ui/react";
import { NavBar } from "@components/NavBar";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import Head from "next/head";
import React, { useContext } from "react";

export type LayoutVariant = "small" | "regular" | "full";

const variantValues = {
  small: "400px",
  regular: "850px",
  full: "full",
};

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
        maxWidth={variantValues[variant]}
        w="100%"
        mx="auto"
        px={variant === "full" ? 0 : 4}
        mt={variant === "full" ? 0 : 8}
        alignContent="center"
        pb={variant === "full" ? 0 : 4}
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
