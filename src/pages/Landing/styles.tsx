import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

export const SectionContainer = styled(Grid)(({ theme }) => ({
  marginTop: "3.75rem",

  [theme.breakpoints.up("md")]: {
    marginTop: "90px",
  },
}));
