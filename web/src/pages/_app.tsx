import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import "@utils/gallery-style.css";
import { ThemeProvider } from "@utils/ThemeProvider";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{ initialColorMode: "light", useSystemColorMode: false }}
      >
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
