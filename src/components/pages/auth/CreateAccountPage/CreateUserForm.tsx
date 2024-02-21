import { Button, Typography } from "@mui/material";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import {
  emailSchema,
  locationSchema,
  passwordSchema,
} from "services/Validation";
import { AddressCompleteWithController } from "components/common/input/AddressComplete/AddressCompleteWithController";
import { RouterLink } from "../../../common/link/RouterLink";
import Grid from "components/common/layout/Grid";
import { TextFieldWithController } from "components/common/input/TextFieldWithController";
import { TextFieldPasswordWithController } from "components/common/input/TextFieldPasswordWithController";
styled("label")<{ isActive: boolean }>(({ theme, isActive }) => ({
  border: `1px solid ${
    isActive ? theme.palette.green.primary : theme.palette.grey[600]
  }`,

  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5),
  display: "flex",
  flexDirection: "column",
  height: "80px",
  cursor: "pointer",
  input: {
    display: "none",
  },
}));
export const createAccountSchema = yup.object().shape({
  first: yup.string().required("First name is required"),
  last: yup.string().required("Last name is required"),
  email: emailSchema,
  password: passwordSchema,
  location: locationSchema,
});

export type CreateAccountFormValues = yup.InferType<typeof createAccountSchema>;

export const CreateAccountForm = ({
  onSubmit,
  control,
}: {
  onSubmit: ReturnType<UseFormHandleSubmit<CreateAccountFormValues>>;
  control: Control<CreateAccountFormValues>;
}) => {
  return (
    <Grid container component={"form"} onSubmit={onSubmit} spacing={2}>
      <Grid xs={12} sx={{ textAlign: "center", mt: 3, mb: { xs: 1, md: 2 } }}>
        <Typography variant={"h3"}>Create Account</Typography>
      </Grid>

      <Grid xs={12} md={6}>
        <TextFieldWithController
          control={control}
          name="first"
          placeholder="Input first name"
          label="First Name"
        />
      </Grid>

      <Grid xs={12} md={6}>
        <TextFieldWithController
          control={control}
          name="last"
          placeholder="Input last name"
          label="Last Name"
        />
      </Grid>

      <Grid xs={12} md={12}>
        <TextFieldWithController
          control={control}
          name="email"
          placeholder="Input email"
          label="Email"
        />
      </Grid>

      <Grid xs={12} md={12}>
        <TextFieldPasswordWithController
          control={control}
          name="password"
          placeholder="Input password"
          label="Password"
        />
      </Grid>

      <Grid xs={12} md={12}>
        <AddressCompleteWithController control={control} name="location" />
      </Grid>

      <Grid xs={12} display="flex" justifyContent="center">
        <Button type="submit" variant="secondary">
          Create Account
        </Button>
      </Grid>

      <Grid xs={12} display="flex" justifyContent="center" mb={5}>
        <Typography variant={"p2"}>Already have an account?</Typography>

        <RouterLink to={"/login"}>
          <Typography variant={"p2"} sx={{ ml: 1, fontWeight: "bold" }}>
            Log In
          </Typography>
        </RouterLink>
      </Grid>
    </Grid>
  );
};

export default CreateAccountForm;
