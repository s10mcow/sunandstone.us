import { Box, Button, Container, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { SectionContainer } from "./styles";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

const Email = styled.a`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const AddressLine = styled.div`
  display: flex;
  flex: 1;
  margin-top: 4px;
  justify-content: center;
`;

const PhoneLine = styled.a`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 8px;
`;

function ContactUsSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={open} handleClose={() => setOpen(false)} />

      <SectionContainer mb={10}>
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <Grid sx={{ textAlign: "center" }}>
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    margin: "0 auto",
                    my: 2,
                    width: {
                      xs: "75%",
                    },
                  }}
                >
                  Contact Us
                </Typography>
                <Typography>
                  Have a project in mind? We would love to hear from you.
                </Typography>
              </Grid>
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button
                  size="large"
                  variant={"contained"}
                  onClick={() => setOpen(true)}
                >
                  Contact us
                </Button>
              </Box>
              <Grid sx={{ mt: 3, color: "#777" }}>
                <Email href="mailto:hello@sunandstone.us">
                  hello@sunandstone.us
                </Email>
                <PhoneLine href="tel:904-325-6275">
                  Phone: 904-325-6275
                </PhoneLine>
                <PhoneLine href="tel:386-309-2342">Fax: 386-309-2342</PhoneLine>
                <AddressLine>PO Box 1242 </AddressLine>
                <AddressLine>Flagler Beach, FL 32136</AddressLine>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </SectionContainer>
    </>
  );
}

export default ContactUsSection;
