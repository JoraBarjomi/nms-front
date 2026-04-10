import { createTheme } from "@mui/material";

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

const theme = createTheme({
  palette: {
    primary: {
      main: "#4267b1",
      light: "#5a7fd1",
      dark: "#2f4f8a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#cccccc",
    },
    error: {
      main: "#ff4d4d",
    },
    warning: {
      main: "#ffc107",
    },
    success: {
      main: "#4dda64",
    },
    info: {
      main: "#2296f3",
    },
    maint: {
      main: "#2296f3",
    },
    major: {
      main: "#ff9800",
    },
    background: {
      default: "#242424",
      paper: "#2c2c2c",
    },
    text: {
      primary: "#fff",
      secondary: "#cccccc",
    },
    action: {
      active: "#fff",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
        outlined: {
          borderColor: "rgba(255, 255, 255, 0.23)",
          color: "#fff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "8px",
          background: "transparent",
          color: "#fff",
          transition: "border-color 0.2s ease",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.5)",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5a7fd1",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4267b1",
          },

          "& .MuiOutlinedInput-input": {
            padding: "14px 14px",
          },
        },
      },
    },
  },
});

export default theme;
