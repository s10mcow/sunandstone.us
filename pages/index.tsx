import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
// @material-ui/icons

// core components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Button from "../components/CustomButtons/Button";
import HeaderLinks from "../components/Header/HeaderLinks";
import Parallax from "../components/Parallax/Parallax";

import styles from "../styles/jss/nextjs-material-kit/pages/landingPage";

// Sections for this page
import ProductSection from "../pages-sections/LandingPage-Sections/ProductSection";
import TeamSection from "../pages-sections/LandingPage-Sections/TeamSection";
import WorkSection from "../pages-sections/LandingPage-Sections/WorkSection";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const Title = styled.div`
  font-family: Montserrat;
  font-weight: bold;
  font-size: 96px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  line-height: 1;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 72px;
  }
`;

const Description = styled.h4`
  font-size: 22px;
  color: #ffffff;
  line-height: 1.5;
  text-align: center;
  font-family: Montserrat;
  font-weight: 400;
  font-style: normal;
`;

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand=""
        // rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter responsive image="/img/landing-bg.jpg">
        <div className={classes.container}>
          <Title>Sun & Stone</Title>
          <Description>
            A FLORIDA-BASED GLOBAL REAL ESTATE DEVELOPMENT AND CAPITAL
            INVESTMENT FIRM ENGAGED IN ACQUISITIONS, DEVELOPMENT AND
            REPOSITIONING OF RESIDENTIAL AND COMMERCIAL PROPERTIES.
          </Description>
        </div>
      </Parallax>
      <div className={classNames(classes.main)}>
        <div className={classes.container}>
          <ProductSection />
          {/* <TeamSection /> */}
          <WorkSection />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
