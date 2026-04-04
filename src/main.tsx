import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./app/global.css";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./app/theme";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      </ThemeProvider>

    </StrictMode>
  </BrowserRouter>,
);
