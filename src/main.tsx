import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./app/global.css";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./app/AppThemeContext";
import { initTerminalConsolePatch } from "./features/terminal/TerminalLogStore";
import { NotificationProvider } from "./features/notifications/NotificationsContext";

initTerminalConsolePatch();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <NotificationProvider>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </NotificationProvider>
    </StrictMode>
  </BrowserRouter>,
);
