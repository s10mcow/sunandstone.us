import * as yup from "yup";
import { Button, Typography, Grid } from "@mui/material";

import { Control, UseFormHandleSubmit } from "react-hook-form";
import { passwordSchema } from "../../../../services/Validation";
import { TextFieldPasswordWithController } from "../../../common/input/TextFieldPasswordWithController";

export const verifySchema = yup.object().shape({
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
      component={"form"}
      container
      onSubmit={onSubmit}
      spacing={2}
      flexDirection={"column"}
    >
      <Grid xs={12} sx={{ textAlign: "center", mb: { xs: 1, md: 2 } }}>
        <Typography variant={"h3"}>Enter your new password</Typography>
      </Grid>
      <Grid xs={12} sx={{ textAlign: "center" }}>
        <TextFieldPasswordWithController
          control={control}
          name="password"
          placeholder="Input new password"
          label="New password"
        />
      </Grid>

      <Grid xs={12} display="flex" justifyContent="center">
        <Button type="submit" variant="secondary">
          Reset Password
        </Button>
      </Grid>
    </Grid>
  );
};

export default VerifyForm;
