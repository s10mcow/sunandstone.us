import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

import styles from "../../styles/jss/nextjs-material-kit/pages/landingPageSections/teamStyle";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Who is Sun & Stone</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src="/img/faces/sten.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>Sten Muchow</h4>
              <CardBody>
                <p className={classes.description}>
                  Sten is a real estate investor and entrepreneur. Having
                  studied computer science and math at school, he leveraged his
                  knowledge to build a real estate investment business. He has
                  been investing in real estate since 2016. He is passionate
                  about helping others achieve financial freedom through real
                  estate investing. He is also a big believer in the power of
                  community and is excited to be a part of the Sun & Stone team.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  link
                  target="_blank"
                  href="https://www.linkedin.com/in/stenmuchow"
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={6}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src="/img/faces/kendall.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>Sanne</h4>
              <CardBody>
                <p className={classes.description}>
                  You can write here details about one of your team members. You
                  can give more details about what they do. Feel free to add
                  some <a href="#pablo">links</a> for people to be able to
                  follow them outside the site.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  link
                  target="_blank"
                  href="https://www.linkedin.com/in/mattheus-corpening-85310a210"
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem> */}
        </GridContainer>
      </div>
    </div>
  );
}
