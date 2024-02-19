import "@mui/material/styles/createPalette";
import "@mui/material/Button";
import "@mui/material/Typography";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    p1: true;
    p2: true;
    f1: true;
    f2: true;
    f3: true;
    link: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    green: {
      primary: string;
      secondary: string;
    };
  }
}

declare module "@mui/material/styles/createPalette" {
  export interface TypeBackground {
    primary: string;
    paper: string;
    default: string;
    secondary: string;
    error: string;
  }

  export interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
    button: string;
    grey: string;
  }

  export interface PaletteOptions {
    background: {
      primary: string;
    };
    text: {
      primary: string;
      secondary: string;
      button: string;
      grey: string;
      default: string;
    };
    icon: string;
    green: {
      primary: string;
      secondary: string;
    };
    primary: {
      main: string;
    };
    error: {
      main: string;
    };
    button: {
      primary: string;
      secondary: string;
    };
  }
}

declare module "@mui/material/styles/createTypography" {
  export interface TypographyOptions {
    fontFamily: string;
    h1: {
      fontSize: string;
      fontWeight: number;
      "@media (max-width:600px)": {
        fontSize: string;
      };
    };
    h2: {
      fontSize: string;
      fontWeight: number;
      "@media (max-width:600px)": {
        fontSize: string;
      };
    };
    h3: {
      fontSize: string;
      fontWeight: number;
      "@media (max-width:600px)": {
        fontSize: string;
      };
    };
    h4: {
      fontSize: string;
      fontWeight: number;
      "@media (max-width:600px)": {
        fontSize: string;
      };
    };
    p1: {
      fontSize: string;
      fontWeight: number;
      "@media (max-width:600px)": {
        fontSize: string;
      };
    };
    p2: {
      fontSize: string;
      fontWeight: number;
      "@media (max-width:600px)": {
        fontSize: string;
      };
    };
    f1: {
      fontSize: string;
      fontWeight: number;
    };
    f2: {
      fontSize: string;
      fontWeight: number;
    };
    f3: {
      fontSize: string;
      fontWeight: number;
    };
    link: {
      color: string;
      fontSize: string;
      fontWeight: number;
      textDecoration: string;
      textTransform: string;
      letterSpacing: string;
    };
  }
}
