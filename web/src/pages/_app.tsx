import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import "../utils/gallery-style.css";

import theme from "../theme";
import { BG_COLOR } from "../utils/colors";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{ initialColorMode: "light", useSystemColorMode: false }}
      >
        <style jsx global>{`
          body {
            background-color: ${BG_COLOR};
          }
        `}</style>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
