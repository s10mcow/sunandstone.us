import * as yup from "yup";
import { Button, Grid, Typography } from "@mui/material";

import { Control, UseFormHandleSubmit } from "react-hook-form";
import { emailSchema, passwordSchema } from "../../../../services/Validation";
import { TextFieldWithController } from "../../../common/input/TextFieldWithController";
import { TextFieldPasswordWithController } from "../../../common/input/TextFieldPasswordWithController";

export const verifySchema = yup.object().shape({
  email: emailSchema,
  verification: yup
    .string()
    .matches(/^\d+$/, "Code must be a number")
    .min(6, "Code must be at least 6 characters")
    .required("Code is required"),
  password: passwordSchema,
});

export type VerifyFormValues = yup.InferType<typeof verifySchema>;

const VerifyForm = ({
  control,
  onSubmit,
}: {
  control: Control<VerifyFormValues>;
  onSubmit: ReturnType<UseFormHandleSubmit<VerifyFormValues>>;
}) => {
  return (
    <Grid
      container
      component={"form"}
      onSubmit={onSubmit}
      spacing={2}
      flexDirection={"column"}
    >
      <Grid xs={12} sx={{ textAlign: "center", mb: { xs: 1, md: 2 } }}>
        <Typography variant={"h3"}>Reset Password</Typography>
      </Grid>

      <Grid xs={12}>
        <TextFieldWithController
          control={control}
          name="verification"
          placeholder="Enter verification code"
          label="Verification code"
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
        <TextFieldPasswordWithController
          control={control}
          name="password"
          placeholder="Input new password"
          label="New password"
        />
      </Grid>

      <Grid xs={12} display="flex" justifyContent="center">
        <Button type="submit" variant="secondary">
          Save new password
        </Button>
      </Grid>
    </Grid>
  );
};

export default VerifyForm;
