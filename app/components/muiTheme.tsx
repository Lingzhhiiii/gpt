import { createTheme } from "@mui/material";

export const nightTheme = createTheme({
  palette: {
    background: {
      default: "#121212",
      paper: "#212121",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0BEC5",
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "darkblue",
            color: "lightblue",
          },
          "&.Mui-selected": {
            backgroundColor: "darkgreen",
            color: "lightgreen",
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    text: {
      primary: "#333333",
      secondary: "#777777",
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#f8f8f8",
          },
          "&.Mui-selected": {
            backgroundColor: "#f8f8f8",
          },
        },
      },
    },
  },
});
