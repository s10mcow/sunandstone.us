import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import { Apartment, Home } from '@material-ui/icons';
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import InfoArea from "../../components/InfoArea/InfoArea";

import styles from "../../styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>What we do</h2>
          <h5 className={classes.description}>
           Tubus Capital focuses on investments through real estate. We have two areas of concern, multi-family and short term rentals. 
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <InfoArea
              title="Multi-family"
              description="From duplexes to larger multi unit apartments, nothing is too small or too big."
              icon={Apartment}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <InfoArea
              title="STR"
              description="Short term rentals in unique locations - vacations or up to 6 month shorter terms lets."
              icon={Home}
              iconColor="success"
              vertical
            />
          </GridItem>
          
        </GridContainer>
      </div>
    </div>
  );
}
