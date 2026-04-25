import { createTheme, type PaletteMode } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    maint: Palette["primary"];
    major: Palette["primary"];
  }

  interface PaletteOptions {
    maint?: PaletteOptions["primary"];
    major?: PaletteOptions["primary"];
  }
}

export const getAppTheme = (mode: PaletteMode) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#5B8DEF" : "#4267b1",
        light: isDark ? "#8FB3FF" : "#5a7fd1",
        dark: isDark ? "#2F5FCC" : "#2f4f8a",
        contrastText: isDark ? "rgba(0, 0, 0, 0.87)" : "#fff",
      },
      secondary: {
        main: "#f4d7b1",
      },
      error: {
        main: "#f44336",
      },
      warning: {
        main: "#ffa726",
      },
      success: {
        main: "#66bb6a",
      },
      info: {
        main: "#29b6f6",
      },
      maint: {
        main: "#7986cb",
      },
      major: {
        main: "#ff9800",
      },
      background: {
        default: isDark ? "#0B0E14" : "#E2E8F0",
        paper: isDark ? "#151921" : "#F8FAFC",
      },
      text: {
        primary: isDark ? "#F8FAFC" : "#0F172A",
        secondary: isDark ? "#94A3B8" : "#475569",
      },
      action: {
        active: isDark ? "#fff" : "rgba(0, 0, 0, 0.54)",
      },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isDark ? "#475569 #151921" : "#94A3B8 #F8FAFC",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
              background: isDark ? "#151921" : "#F8FAFC",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              background: isDark ? "#475569" : "#cbd5e1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
              background: isDark ? "#64748B" : "#94A3B8",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "8px",
          },
          outlined: {
            borderColor: isDark
              ? "rgba(255, 255, 255, 0.23)"
              : "rgba(0, 0, 0, 0.23)",
            color: isDark ? "#e0e0e0" : "inherit",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            width: "100%",
            borderRadius: "8px",
            background: "transparent",
            transition: "border-color 0.2s ease",
            color: isDark ? "#e0e0e0" : "inherit",
            "&.MuiOutlinedInput-notchedOutline": {
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(0, 0, 0, 0.23)",
            },

            "&:hover.MuiOutlinedInput-notchedOutline": {
              borderColor: "#5a7fd1",
            },

            "&.Mui-focused.MuiOutlinedInput-notchedOutline": {
              borderColor: "#4267b1",
            },

            "&.MuiOutlinedInput-input": {
              padding: "14px 14px",
            },
          },
        },
      },
    },
  });
};
