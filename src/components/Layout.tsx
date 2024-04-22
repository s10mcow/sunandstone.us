import React from "react";
import LoadingWrapper from "@/components/Loading";
import { Box, Typography } from "@mui/material";

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
        © {new Date().getFullYear()} Rising Tide Capital Partners LLC
      </Typography>
    </Box>
  );
};

const Layout = ({ children, isLoading }: LayoutProps) => {
  return (
    <LoadingWrapper isLoading={isLoading}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr",
        }}
      >
        {children}
      </Box>
      <Footer />
    </LoadingWrapper>
  );
};

export default Layout;
