import { Box, Button, Container, Typography } from "@mui/material";
import hero from "@assets/images/landing-bg.jpg";
import { styled } from "@mui/material/styles";
import ContactModal from "@/components/ContactModal";
import { useState } from "react";

export const ImageWrapper = styled(Box)({
  width: "100%",
  height: "80vh",
  backgroundImage: `url(${hero})`,
  backgroundColor: "grey.800",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.5)",
  },
});
function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={open} handleClose={() => setOpen(false)} />
      <ImageWrapper>
        <Container maxWidth="lg" sx={{ zIndex: 1 }}>
          <Typography
            component="h1"
            variant="h1"
            align="center"
            gutterBottom
            textTransform={"uppercase"}
            sx={{
              fontWeight: "bold",
              fontFamily: "SF Pro Text",
              color: "white",
              marginTop: {
                xs: "40px",
              },
            }}
          >
            Rising Tide Capital
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph
            sx={{
              fontWeight: "bold",
              fontFamily: "SF Pro Text",
              color: "white",
            }}
          >
            A FLORIDA-BASED GLOBAL REAL ESTATE DEVELOPMENT AND CAPITAL
            INVESTMENT FIRM ENGAGED IN ACQUISITIONS, DEVELOPMENT AND
            REPOSITIONING OF LAND, RESIDENTIAL, AND COMMERCIAL PROPERTIES.
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              size="large"
              variant={"contained"}
              onClick={() => setOpen(true)}
            >
              Contact us
            </Button>
          </Box>
        </Container>
      </ImageWrapper>
    </>
  );
}

export default HeroSection;
