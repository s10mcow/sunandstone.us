import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
// @material-ui/icons

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";

import styles from "../../styles/jss/nextjs-material-kit/pages/landingPageSections/workStyle";

const Email = styled.a`
  display: flex;
  justify-content: center;

  cursor: pointer;
`;

const AddressLine = styled.div`
  margin-top: 4px;
`;

const PhoneLine = styled.a`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 8px;
`;

const ContactUs = styled.h2`
  margin-bottom: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <ContactUs className={classes.title}>Contact us</ContactUs>

          <h4 className={classes.description}>
            Have a project or just wanna say hi?
          </h4>

          <Container>
            <Email
              className={classes.description}
              href="mailto:hello@tubuscapital.com"
            >
              hello@sunandstone.us
            </Email>
            <PhoneLine className={classes.description} href="tel:904-325-6275">
              Phone: 904-325-6275
            </PhoneLine>
            <PhoneLine className={classes.description} href="tel:904-325-6275">
              Fax: 386-309-2342
            </PhoneLine>
            <AddressLine className={classes.description}>
              PO Box 1242{" "}
            </AddressLine>
            <AddressLine className={classes.description}>
              Flagler Beach, FL 32136
            </AddressLine>
          </Container>
          {/* <form>


            <GridContainer>


              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              />
              <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                <Button color="info">Send Message</Button>
              </GridItem>
            </GridContainer>
          </form> */}
        </GridItem>
      </GridContainer>
    </div>
  );
}
