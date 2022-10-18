import React from "react";
import { getAllArticles } from "../../utils/markdown";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/components";
import Footer from "../../components/Footer/Footer";
import classNames from "classnames";
import BlogCard from "../../components/Blog/BlogCard";
import styled from "styled-components";

const useStyles = makeStyles(styles);

type PostType = {
  title: string;
  description: string;
  published: string;
  image_url: string;
  slug: string;
};

const Title = styled.div`
  font-family: Montserrat;
  font-weight: bold;
  font-size: 96px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  line-height: 1;
  color: #ffffff;

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

export default function BlogPage(props: { posts: PostType[] }) {
  const classes = useStyles();

  const { posts } = props;

  return (
    <div>
      <Header
        brand="Tubus Capital"
        // rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />
      <Parallax image="/img/west-coast-pt.jpg">
        <div className={classes.container}>
          <Title>The Articles</Title>
        </div>
      </Parallax>
      <div className={classNames(classes.main)}>
        <GridContainer alignItems="center" justifyContent="center">
          <GridItem xs={11}>
            <div>
              {posts.map((post, index) => (
                <BlogCard post={post} key={index} />
              ))}
            </div>
          </GridItem>
        </GridContainer>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export const getStaticProps = async () => {
  const articles: PostType[] = await getAllArticles();

  articles
    .map((post) => post)
    .sort((a, b) => {
      if (a.published > b.published) return 1;
      if (a.published < b.published) return -1;

      return 0;
    });

  const posts = articles.map((post) => {
    return {
      ...post,
      published: new Date(post.published).toDateString(),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
