import { Button, Typography } from "@mui/material";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import * as yup from "yup";
import { AddressCompleteWithController } from "components/common/input/AddressComplete/AddressCompleteWithController";
import { RouterLink } from "../../common/link/RouterLink";
import { emailRegexp } from "../../../services/Validation";
import Grid from "components/common/layout/Grid";
import { TextFieldWithController } from "../../common/input/TextFieldWithController";

export const updateUserSchema = yup.object().shape({
  first: yup.string().required("First name is required"),
  last: yup.string().required("Last name is required"),
  email: yup
    .string()
    .matches(emailRegexp, "Invalid email address")
    .required("Email is required"),
  location: yup
    .object({
      description: yup.string().required("Location is required"),
      geocode: yup.object({
        lat: yup.number().required("Location is required"),
        lng: yup.number().required("Location is required"),
      }),
      address: yup.object({
        city: yup.string().required("Location is required"),
        region: yup.string().required("Location is required"),
      }),
    })
    .required("Location is required"),
});

export type UpdateAccountFormValues = yup.InferType<typeof updateUserSchema>;

export const UpdateAccountForm = ({
  onSubmit,
  control,
}: {
  onSubmit: ReturnType<UseFormHandleSubmit<UpdateAccountFormValues>>;
  control: Control<UpdateAccountFormValues>;
}) => {
  return (
    <Grid container spacing={2} component={"form"} onSubmit={onSubmit}>
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
      <Grid xs={12}>
        <TextFieldWithController
          control={control}
          name="email"
          placeholder="Input email"
          label="Email"
        />
      </Grid>

      <Grid xs={12}>
        <AddressCompleteWithController control={control} name="location" />
      </Grid>

      <Grid xs={12}>
        <RouterLink to={"/change-password"}>
          <Typography variant={"p2"} sx={{ fontWeight: "bold" }}>
            Change password
          </Typography>
        </RouterLink>
      </Grid>

      <Grid xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" variant="secondary">
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default UpdateAccountForm;
