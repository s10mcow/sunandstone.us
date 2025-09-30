import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { SectionContainer } from "./styles";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: `${theme.spacing(1)} 0`,
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  "&.Mui-expanded": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  "& .MuiAccordionSummary-content": {
    margin: `${theme.spacing(2)} 0`,
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

function FAQSection() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const faqs = [
    {
      id: "panel1",
      question: "What types of properties does San and Stone invest in?",
      answer:
        "We focus on three main areas: multi-family properties (from duplexes to large apartment complexes), land development opportunities, and single-family houses. We look for properties with strong potential for value creation through development, renovation, or repositioning in the market.",
    },
    {
      id: "panel2",
      question: "What geographic areas do you operate in?",
      answer:
        "While we're based in Florida, we operate as a global real estate investment firm. Our primary focus is on properties throughout the United States, with particular expertise in Florida markets where we have deep local knowledge and established relationships.",
    },
    {
      id: "panel3",
      question:
        "How do you determine property values and investment potential?",
      answer:
        "We use comprehensive market analysis, including comparable sales data, rental income potential, development costs, and local market trends. Our team conducts thorough due diligence including zoning research, environmental assessments, and financial projections before making any investment decisions.",
    },
    {
      id: "panel4",
      question:
        "Do you work with individual property owners or just large developers?",
      answer:
        "We work with both individual property owners and large developers. Whether you own a single property or have a portfolio of assets, we're interested in discussing potential opportunities. We believe in building long-term relationships regardless of the size of the initial transaction.",
    },
    {
      id: "panel5",
      question: "What is your typical investment timeline?",
      answer:
        "Our investment timeline varies depending on the property type and strategy. For development projects, we typically hold properties for 2-5 years. For repositioning opportunities, the timeline might be 1-3 years. We're flexible and base our timeline on market conditions and the specific opportunity.",
    },
    {
      id: "panel6",
      question: "How quickly can you close on a property?",
      answer:
        "We can move quickly when the right opportunity presents itself. For cash purchases, we can typically close within 2-4 weeks, depending on due diligence requirements. For more complex transactions involving financing, the timeline may be 4-8 weeks.",
    },
    {
      id: "panel7",
      question: "Do you provide financing or work with investors?",
      answer:
        "Yes, we work with a network of private investors and lending partners. We can structure deals in various ways, including joint ventures, partnerships, and traditional financing arrangements. We're always open to discussing creative financing solutions.",
    },
    {
      id: "panel8",
      question:
        "What makes San and Stone different from other real estate investment companies?",
      answer:
        "Our combination of local market expertise, technical background (Sten's computer science and mathematics education), and commitment to community impact sets us apart. We take a data-driven approach to investments while maintaining personal relationships with all our partners and clients.",
    },
    {
      id: "panel9",
      question: "How can I get in touch to discuss a potential opportunity?",
      answer:
        "You can reach us through our contact form, email us at hello@sunandstone.us, or call us at (904) 325-6275. We're always happy to discuss potential opportunities and answer any questions you might have about working with San and Stone.",
    },
    {
      id: "panel10",
      question: "Do you charge any upfront fees?",
      answer:
        "No, we don't charge any upfront fees for evaluating properties or discussing potential opportunities. We only succeed when we complete a mutually beneficial transaction. Our initial consultations and property evaluations are always free.",
    },
  ];

  return (
    <SectionContainer
      component="section"
      aria-labelledby="faq-heading"
      sx={{ py: 8, backgroundColor: "grey.50" }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                component="h2"
                variant="h2"
                gutterBottom
                id="faq-heading"
                sx={{ mb: 2 }}
              >
                Frequently Asked Questions
              </Typography>
              <Typography
                component="p"
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: "800px", mx: "auto" }}
              >
                Get answers to common questions about working with San and
                Stone. Don't see your question? Contact us directly.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={10} sx={{ mx: "auto" }}>
            {faqs.map((faq) => (
              <StyledAccordion
                key={faq.id}
                expanded={expanded === faq.id}
                onChange={handleChange(faq.id)}
              >
                <StyledAccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`${faq.id}-content`}
                  id={`${faq.id}-header`}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    sx={{ fontWeight: "medium" }}
                  >
                    {faq.question}
                  </Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                  <Typography
                    component="p"
                    variant="body1"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {faq.answer}
                  </Typography>
                </StyledAccordionDetails>
              </StyledAccordion>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Still have questions?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We're here to help. Contact us for personalized answers to your
                specific situation.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="body1">
                  📧 <strong>Email:</strong> hello@sunandstone.us
                </Typography>
                <Typography variant="body1">
                  📞 <strong>Phone:</strong> (904) 325-6275
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
}

export default FAQSection;
