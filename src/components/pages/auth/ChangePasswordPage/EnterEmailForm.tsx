import * as yup from "yup";
import { Button, Typography } from "@mui/material";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { emailRegexp } from "../../../../services/Validation";
import { RouterLink } from "../../../common/link/RouterLink";
import Grid from "components/common/layout/Grid";
import { TextFieldWithController } from "../../../common/input/TextFieldWithController";

export const enterEmailSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegexp, "Invalid email address")
    .required("Email is required"),
});

export type EnterEmailFormValues = yup.InferType<typeof enterEmailSchema>;

const EnterEmailForm = ({
  onSubmit,
  control,
}: {
  onSubmit: ReturnType<UseFormHandleSubmit<EnterEmailFormValues>>;
  control: Control<EnterEmailFormValues>;
}) => {
  return (
    <Grid
      component={"form"}
      container
      onSubmit={onSubmit}
      spacing={2}
      flexDirection={"column"}
    >
      <Grid xs={12} sx={{ textAlign: "center", mb: { xs: 1, md: 2 } }}>
        <Typography variant={"h3"}>Forgot Password</Typography>
      </Grid>
      <Grid xs={12} sx={{ textAlign: "center" }}>
        <Typography variant={"p2"} color={"text.grey"}>
          Enter the email address associated with your account and we will send
          you a link to reset your password.
        </Typography>
      </Grid>

      <Grid xs={12}>
        <TextFieldWithController
          control={control}
          name="email"
          placeholder="Input email"
          label="Email"
        />
      </Grid>

      <Grid xs={12} display="flex" justifyContent="center">
        <Button type="submit" variant="secondary">
          Send reset email
        </Button>
      </Grid>

      <Grid xs={12} display="flex" justifyContent="center" mb={5}>
        <Typography variant={"p2"}>Don't have an account?</Typography>

        <RouterLink to={"/create-account"}>
          <Typography variant={"p2"} sx={{ ml: 1, fontWeight: "bold" }}>
            Create Account
          </Typography>
        </RouterLink>
      </Grid>
    </Grid>
  );
};

export default EnterEmailForm;
