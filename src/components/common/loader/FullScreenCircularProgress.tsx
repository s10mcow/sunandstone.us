import {CircularProgress, Grid} from "@mui/material";

export function FullScreenCircularProgress() {
    return <div style={{flexGrow: 1}}>
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{
                height: "100vh",
            }}
        >
            <Grid>
                <CircularProgress
                    style={{
                        height: 128,
                        width: 128,
                    }}
                />
            </Grid>
        </Grid>
    </div>;
}
