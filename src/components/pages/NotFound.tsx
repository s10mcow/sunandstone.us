import { PageContainer } from "./template/PageContainer";
import Grid from "../common/layout/Grid";
import { Typography } from "@mui/material";

export function NotFound() {
  return (
    <PageContainer isAuthRequired={false}>
      <Grid container>
        <Grid>
          <Typography variant="h1">404</Typography>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
