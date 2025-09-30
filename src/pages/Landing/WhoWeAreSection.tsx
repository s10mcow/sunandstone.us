import sten from "@assets/images/sten.jpg";
import { LinkedIn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { SectionContainer } from "./styles";

function WhoWeAreSection() {
  return (
    <SectionContainer
      component="section"
      mb={10}
      aria-labelledby="team-heading"
    >
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Grid sx={{ textAlign: "center" }}>
              <Typography
                component="h2"
                variant="h2"
                gutterBottom
                id="team-heading"
                sx={{
                  margin: "0 auto",
                  my: 2,
                  width: {
                    xs: "75%",
                  },
                }}
              >
                Who we are
              </Typography>
            </Grid>

            <Grid
              container
              spacing={6}
              sx={{
                mt: {
                  xs: 1,
                  md: 8,
                },
                justifyContent: "center",
              }}
            >
              <Grid item xs={12} md={6}>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} sx={{ padding: 4 }}>
                      <Avatar
                        alt="Sten Muchow, Founder and Real Estate Investor at San and Stone LLC"
                        src={sten}
                        sx={{ width: "100%", height: "100%" }}
                        imgProps={{ loading: "lazy" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <CardContent>
                        <Typography component="h3" variant="h5">
                          Sten Muchow
                        </Typography>
                        <Typography
                          component="p"
                          variant="body2"
                          color="text.secondary"
                        >
                          Sten is a real estate investor and entrepreneur.
                          Having studied computer science and mathematics, he
                          leveraged his knowledge to build a real estate
                          investment business. He has been investing in real
                          estate since 2016. He is passionate about helping
                          others achieve financial freedom through real estate
                          investing. He is also a big believer in the power of
                          community and is excited to be a part of San and
                          Stone.
                        </Typography>
                      </CardContent>
                      <Box display="flex" justifyContent="center" sx={{ p: 1 }}>
                        <Link
                          href="https://www.linkedin.com/in/stenmuchow"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit Sten Muchow's LinkedIn profile"
                        >
                          <IconButton
                            aria-label="LinkedIn profile"
                            size="large"
                          >
                            <LinkedIn />
                          </IconButton>
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
}

export default WhoWeAreSection;
