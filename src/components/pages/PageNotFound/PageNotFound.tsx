import { styled } from "@mui/material/styles";
import {
  Container as MuiContainer,
  Box as MuiBox,
  Typography as MuiTypography,
} from "@mui/material";
import GolfSwingBackgroundImg from "assets/images/golf-swing-background.png";
import { RouterLink } from "components/common/link/RouterLink";

const Container = styled(MuiContainer)({
  padding: 0,
});

const Box = styled(MuiBox)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
  background: "white",
  padding: theme.spacing(0.5),
  paddingTop: theme.spacing(1.5),
  borderBottom: `3px solid ${theme.palette.primary.main}`,
  position: "fixed",
  left: 0,
  right: 0,
  fontWeight: "bold",
  fontSize: theme.spacing(2.2),
}));

const GolfImg = styled("img")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(5),
}));

export const PageNotFound = () => {
  return (
    <Container>
      <Typography variant="h1" color="primary">
        Page Not Found
      </Typography>
      <GolfImg src={GolfSwingBackgroundImg} alt="" />
      <Box p={1}>
        <RouterLink to="/">Return To Home</RouterLink>
      </Box>
    </Container>
  );
};

export default PageNotFound;
