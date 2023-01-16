import "@/styles/globals.css";
import type { AppProps } from "next/app";
import PermanentDrawerLeft from "@/components/layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <PermanentDrawerLeft />
    </ThemeProvider>
  );
}
