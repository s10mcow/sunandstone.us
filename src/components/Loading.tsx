import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { ReactNode } from "react";

function LoadingWrapper({
  isLoading,
  children,
}: {
  isLoading?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      {children}
      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 111,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly dark, opaque background
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}

export default LoadingWrapper;
