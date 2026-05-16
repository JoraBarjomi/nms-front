import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider, CssBaseline, type PaletteMode } from "@mui/material";
import { getAppTheme } from "./theme";

type AppThemeContextType = {
  mode: PaletteMode;
  toggleTheme: () => void;
  setMode: (mode: PaletteMode) => void;
};

const AppThemeContext = createContext<AppThemeContextType | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const theme = useMemo(() => getAppTheme(mode), [mode]);
  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppThemeContext.Provider value={{ mode, toggleTheme, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(AppThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used within AppThemeProvider");
  return ctx;
}
