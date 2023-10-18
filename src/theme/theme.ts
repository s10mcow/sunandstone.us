import { ThemeOptions } from "@mui/material/styles";

// IMPORTANT: Please keep all theme options in this file rather than importing sections of it.
// This allows us to copy and load the theme into third party services like: https://zenoo.github.io/mui-theme-creator
export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        size: 20,
      },
    },
  },
};
