import { FormatQuote, Star } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SectionContainer } from "./styles";

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const QuoteIcon = styled(FormatQuote)(({ theme }) => ({
  fontSize: "3rem",
  color: theme.palette.primary.main,
  opacity: 0.3,
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const StarRating = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  "& svg": {
    color: "#FFD700",
    fontSize: "1.5rem",
  },
}));

const ClientAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  margin: "0 auto",
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  fontSize: "1.5rem",
  fontWeight: "bold",
}));

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michael Rodriguez",
      role: "Property Owner",
      location: "Tampa, FL",
      rating: 5,
      text: "San and Stone made selling our family property incredibly smooth. Their expertise in the Florida market and professional approach gave us confidence throughout the entire process. We got a fair price and closed quickly.",
      initials: "MR",
    },
    {
      name: "Sarah Chen",
      role: "Real Estate Investor",
      location: "Orlando, FL",
      rating: 5,
      text: "Working with San and Stone on our multi-family investment was exceptional. Their market knowledge and attention to detail helped us identify a property that exceeded our ROI expectations. Highly recommended!",
      initials: "SC",
    },
    {
      name: "David Thompson",
      role: "Land Developer",
      location: "Jacksonville, FL",
      rating: 5,
      text: "The team at San and Stone understands the development process like no other. They helped us navigate zoning challenges and turned a complex land deal into a profitable venture. True professionals.",
      initials: "DT",
    },
    {
      name: "Lisa Martinez",
      role: "Property Seller",
      location: "Miami, FL",
      rating: 5,
      text: "After trying to sell our commercial property for months with another company, San and Stone closed the deal in just 6 weeks. Their network and negotiation skills are outstanding.",
      initials: "LM",
    },
    {
      name: "Robert Johnson",
      role: "Investment Partner",
      location: "Fort Lauderdale, FL",
      rating: 5,
      text: "San and Stone's strategic approach to real estate investment is impressive. They've consistently delivered strong returns on our joint ventures and maintain excellent communication throughout.",
      initials: "RJ",
    },
    {
      name: "Amanda Foster",
      role: "First-time Seller",
      location: "St. Petersburg, FL",
      rating: 5,
      text: "As a first-time property seller, I was nervous about the process. San and Stone walked me through every step, answered all my questions, and made sure I felt comfortable with every decision.",
      initials: "AF",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        style={{ color: index < rating ? "#FFD700" : "#E0E0E0" }}
      />
    ));
  };

  return (
    <SectionContainer
      component="section"
      aria-labelledby="testimonials-heading"
      sx={{ py: 8 }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                component="h2"
                variant="h2"
                gutterBottom
                id="testimonials-heading"
                sx={{ mb: 2 }}
              >
                What Our Clients Say
              </Typography>
              <Typography
                component="p"
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: "800px", mx: "auto" }}
              >
                Don't just take our word for it. Here's what property owners and
                investors have to say about working with San and Stone.
              </Typography>
            </Box>
          </Grid>

          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TestimonialCard>
                <QuoteIcon />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    pt: 4,
                  }}
                >
                  <StarRating>{renderStars(testimonial.rating)}</StarRating>

                  <Typography
                    component="p"
                    variant="body1"
                    sx={{
                      flexGrow: 1,
                      fontStyle: "italic",
                      mb: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>

                  <Box sx={{ textAlign: "center", mt: "auto" }}>
                    <ClientAvatar>{testimonial.initials}</ClientAvatar>
                    <Typography
                      component="h4"
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 0.5 }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      color="text.secondary"
                    >
                      {testimonial.role}
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      color="primary.main"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      {testimonial.location}
                    </Typography>
                  </Box>
                </CardContent>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>

        {/* Trust Indicators */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography component="h3" variant="h4" gutterBottom sx={{ mb: 4 }}>
            Trusted by Land Owners Across Florida
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                100+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Properties Bought & Sold
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                8+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Years Experience
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                30-45
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Day Average Closing
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography
                variant="h3"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                100%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Satisfied Sellers
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </SectionContainer>
  );
}

export default TestimonialsSection;
