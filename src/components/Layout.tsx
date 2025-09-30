import Header from "@/components/Header";
import LoadingWrapper from "@/components/Loading";
import { Box, Typography } from "@mui/material";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const Footer = () => {
  return (
    <Box
      component={"footer"}
      sx={{
        py: 6,
        px: 2,
        mt: 3,
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ pt: 4 }}
      >
        © {new Date().getFullYear()} San and Stone LLC
      </Typography>
    </Box>
  );
};

const Layout = ({ children, isLoading }: LayoutProps) => {
  return (
    <LoadingWrapper isLoading={isLoading}>
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr auto",
          paddingTop: "64px", // Account for fixed header
        }}
      >
        <Box component="main" role="main">
          {children}
        </Box>
        <Footer />
      </Box>
    </LoadingWrapper>
  );
};

export default Layout;
