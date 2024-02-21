import { ThemeOptions, createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    text: {
      primary: "#171F46",
      secondary: "#232C2E",
      button: "#fff",
      grey: "#8B8FA3",
    },
    icon: "#171F46",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#232C2E",
    },
    green: {
      primary: "#8CE21E",
      secondary: "#3D6C45",
    },
    grey: {
      700: "#7E858E",
      600: "#8B8FA3",
      500: "#F4F4F4",
      400: "#F9FAFB",
      300: "#E5E5E5",
      200: "#F9FAFB",
    },
    error: {
      main: "#FF0005",
    },
    divider: "#8B8FA3",
    background: {
      primary: "#fff",
      secondary: "#F9FAFB",
      default: "#E5E5E5",
      error: "#FF0B37",
    },
    button: {
      primary: "#3D6C45",
      secondary: "white",
    },
  },
  typography: {
    fontFamily: "",
    h1: {
      fontSize: "4.75rem",
      fontWeight: 800,
      "@media (max-width:600px)": {
        fontSize: "2.75rem",
      },
    },
    h2: {
      fontSize: "3.125rem",
      fontWeight: 700,
      "@media (max-width:600px)": {
        fontSize: "1.875rem",
      },
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "1.5rem",
      },
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    p1: {
      fontSize: "1.125rem",
      fontWeight: 700,
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    p2: {
      fontSize: "1.125rem",
      fontWeight: 400,
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    f1: {
      fontSize: ".75rem",
      fontWeight: 400,
    },
    f2: {
      fontSize: "1.125rem",
      fontWeight: 300,
    },
    f3: {
      fontSize: "14px",
      fontWeight: 400,
    },
    link: {
      color: "#000",
      fontSize: "1rem",
      fontWeight: 700,
      textDecoration: "underline",
      textTransform: "none",
      letterSpacing: "0.32px",
    },
    button: {
      fontSize: "1rem",
      fontWeight: 700,
      textTransform: "none",
      "@media (max-width:600px)": {
        fontWeight: 500,
        fontSize: ".75rem",
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          WebkitFontSmoothing: "auto",
          fontSize: "16px",
        },
        body: {
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          backgroundColor: "#fff",
        },
        a: {
          textDecoration: "none",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            borderRadius: 10,
            padding: "12px 20px",
            "@media (max-width:600px)": {
              padding: "8px 10px",
            },
          },
        },
        {
          props: { variant: "primary" },
          style: {
            color: "#000",
            backgroundColor: "#fff",
            textTransform: "none",
            borderRadius: 10,
            padding: "12px 20px",
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            color: "#000",
            backgroundColor: "#8CE21E",
            textTransform: "none",
            borderRadius: 10,
            padding: "12px 20px",
            "&:hover": {
              backgroundColor: "#8CE21E",
            },
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.primary,
          height: 72,
          display: "flex",
          justifyContent: "center",
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        formControl: ({ theme }) => ({
          backgroundColor: theme.palette.background.primary,
        }),
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          "&&:focus": {
            backgroundColor: "inherit",
          },
        },
        icon: {
          color: "inherit",
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        valueLabel: {
          borderRadius: "10px",
          backgroundColor: "#3D6C45",
          "&:before": {
            width: 0,
          },
        },
        thumb: {
          backgroundColor: "#3D6C45",
        },
        track: {
          backgroundColor: "#3D6C45",
          border: "none",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          justifyContent: "center",
          width: "100%",
          margin: "3em 0",
        },
        groupedHorizontal: {
          "&&:not(:first-child)": {
            borderLeft: "1px solid #171F46",
            borderRight: "1px solid #171F46",
          },
          "&&:first-child": {
            borderRight: "1px solid #171F46",
            borderLeft: "1px solid #171F46",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "input:checked + svg": { fill: "#3D6C45" },
          "input + svg": { fill: "#DADADA" },
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol',
          textTransform: "none",
          borderRadius: 8,
          height: 42,
          border: "1px solid #171F46",
          width: "auto",
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 25,
          paddingRight: 25,
          color: "#171F46",
          "&$selected": {
            backgroundColor: "#3D6C45",
            color: "#fff",
            "&&:hover": {
              backgroundColor: "#3D6C45",
              color: "#fff",
            },
          },
          "&&:hover": {
            backgroundColor: "#FFF",
            color: "#171F46",
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
