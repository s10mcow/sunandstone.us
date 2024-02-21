import { Button, Typography } from "@mui/material";
import { Control, UseFormHandleSubmit } from "react-hook-form";

import * as yup from "yup";
import { logClickEvent } from "../../../../services/Analytics";
import { RouterLink } from "../../../common/link/RouterLink";
import { emailSchema, passwordSchema } from "../../../../services/Validation";
import Grid from "components/common/layout/Grid";
import { TextFieldWithController } from "../../../common/input/TextFieldWithController";
import { TextFieldPasswordWithController } from "../../../common/input/TextFieldPasswordWithController";

export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

export const LoginForm = ({
  onSubmit,
  control,
  errorMessage,
}: {
  onSubmit: ReturnType<UseFormHandleSubmit<LoginFormValues>>;
  control: Control<LoginFormValues>;
  errorMessage: string;
}) => {
  return (
    <Grid container component={"div"} onSubmit={onSubmit} direction="column">
      <Grid xs={12} sx={{ textAlign: "center", mb: { xs: 1, md: 2 } }}>
        <Typography variant={"h3"}>Log In</Typography>
      </Grid>
      <Grid container spacing={2}>
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
            name="password"
            control={control}
            placeholder="Input password"
            label="Password"
          />
        </Grid>
      </Grid>

      <Grid
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <RouterLink
          to={"/change-password"}
          onClick={() =>
            logClickEvent({
              label: "login-forgot-password-link",
              category: "navigation",
            })
          }
        >
          <Typography variant={"p2"} sx={{ ml: 1, fontWeight: "bold" }}>
            Forgot your Password?
          </Typography>
        </RouterLink>
      </Grid>

      <Grid xs={12}>
        <Typography color="error">{errorMessage}</Typography>
      </Grid>

      <Grid xs={12} display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="secondary"
          onClick={() => {
            logClickEvent({
              label: "login-login-submit",
              category: "navigation",
            });
          }}
        >
          Log in
        </Button>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center" mt={2}>
        <Typography variant={"p2"}>Don't have an account?</Typography>

        <RouterLink
          to={"/create-account"}
          onClick={() =>
            logClickEvent({
              label: "login-create-account-link",
              category: "navigation",
            })
          }
        >
          <Typography variant={"p2"} sx={{ ml: 1, fontWeight: "bold" }}>
            Create Account
          </Typography>
        </RouterLink>
      </Grid>
    </Grid>
  );
};
