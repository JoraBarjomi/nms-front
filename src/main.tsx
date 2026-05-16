import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./app/global.css";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./app/AppThemeContext";
import { initTerminalConsolePatch } from "./features/terminal/TerminalLogStore";

initTerminalConsolePatch();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </StrictMode>
  </BrowserRouter>,
);
