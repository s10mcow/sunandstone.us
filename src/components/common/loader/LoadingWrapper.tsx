import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, .6)",
  zIndex: 999,
});

type LoadingWrapperProps = {
  visible: boolean;
  children: React.ReactNode;
};

export const LoadingWrapper = ({ visible, children }: LoadingWrapperProps) => (
  <>
    {children}
    {visible && (
      <Container>
        <CircularProgress color="primary" size={50} thickness={4} />
      </Container>
    )}
  </>
);
