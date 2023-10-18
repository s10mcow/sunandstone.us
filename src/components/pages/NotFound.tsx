import {PageContainer} from "./template/PageContainer.tsx";
import Grid from "../common/layout/Grid.ts";
import {Typography} from "@mui/material";

export function NotFound() {
    return <PageContainer isAuthRequired={false}>
        <Grid container>
            <Grid>
                <Typography variant="h1">404</Typography>
            </Grid>
        </Grid>
    </PageContainer>
}
