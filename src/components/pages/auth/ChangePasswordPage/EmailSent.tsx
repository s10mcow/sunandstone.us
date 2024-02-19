import { Button, Grid, Typography } from "@mui/material";

export const EmailSent = ({
  email,
  resendEmail,
}: {
  email: string;
  resendEmail: ({ email }: { email: string }) => void;
}) => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} sx={{ textAlign: "center", mb: { xs: 1, md: 2 } }}>
        <Typography variant={"h3"}>Email Sent!</Typography>
      </Grid>
      <Grid xs={12} sx={{ textAlign: "center" }}>
        <Typography variant={"p2"} color={"text.grey"}>
          If we find an account associated with {email}, you will receive a
          reset code in your email.
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant={"p2"} color={"text.grey"}>
          Didn't receive reset email?
        </Typography>
        <Button onClick={() => resendEmail({ email })}>
          <Typography variant={"link"}>Resend</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
