import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import "antd-css-utilities/utility.min.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#17223B",
      paper: "#071E3D",
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
      fontSize: "1.65rem",
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  const [hasWindow, setHasWindow] = React.useState(false);
  // To avoid react hydration error https://github.com/cookpete/react-player/issues/1474
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  return (
    <ThemeProvider theme={darkTheme}>
      {hasWindow && <Component />}
    </ThemeProvider>
  );
}
