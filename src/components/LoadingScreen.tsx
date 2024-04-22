import { Box, CircularProgress } from "@mui/material";

export const LoadingScreen = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children?: React.ReactNode;
}) => {
  return isLoading ? (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          p: 3,
        }}
      >
        <CircularProgress sx={{ color: "green.primary" }} size={70} />
      </Box>
    </Box>
  ) : (
    <>{children}</>
  );
};
