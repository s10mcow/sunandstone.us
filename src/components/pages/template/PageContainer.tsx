import Grid from "../../common/layout/Grid";
import { ReactNode } from "react";
import { useNavigateToLoginIfNotAuthenticated } from "../../../services/Routing.ts";
import { Container } from "@mui/material";

export function PageContainer({
  children,
  isAuthRequired = true,
}: {
  children: ReactNode;
  isAuthRequired?: boolean;
}) {
  useNavigateToLoginIfNotAuthenticated({ enabled: isAuthRequired });

  return (
    <Container>
      <Grid>{children}</Grid>
    </Container>
  );
}
