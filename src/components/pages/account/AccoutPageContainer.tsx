import { styled } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import premiumBgImg from "assets/images/premium-bg.png";
import bgImage from "assets/images/account-creation.png";
import React from "react";
import Grid from "components/common/layout/Grid";

export const CreateAccountImage = styled("img")(({ theme }) => ({
  width: "80%",
  height: "100%",
  objectFit: "contain",
  zIndex: 1,

  [theme.breakpoints.down("md")]: {
    width: "100%",
    objectFit: "cover",
    objectPosition: "40% 0%",
  },
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundImage: `url(${premiumBgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Adjust the opacity as needed
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    padding: "32px 32px 0",
  },
}));

export const AccountPageContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Grid container sx={{ flex: 1 }}>
      <Grid xs={12} md={6} sx={{ height: { xs: 150, md: "auto" } }}>
        <ImageWrapper>
          <CreateAccountImage src={bgImage} />
        </ImageWrapper>
      </Grid>

      <Grid
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: { sx: "flex-start", md: "center" },
        }}
      >
        <Container maxWidth={"sm"}>{children}</Container>
      </Grid>
    </Grid>
  );
};
