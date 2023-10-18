import { Typography } from "@mui/material";
import { PageContainer } from "../template/PageContainer";
import Grid from "../../common/layout/Grid";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextFieldWithController } from "../../common/input/TextField.tsx";
import { useAppNavigation } from "../../../services/Routing.ts";
import { submitLogin } from "../../../services/Authentication.ts";
import Button from "../../common/button/Button.tsx";
import { useMutation } from "@tanstack/react-query";
import { useAppErrorHandlers } from "../../../services/ErrorMessaging.ts";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
});

export function Login() {
  const {
    handleSubmit,
    control,
    formState: { isValidating },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const appNavigation = useAppNavigation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    error: submitLoginError,
    mutate: submitLoginMutate,
    isLoading: isSubmitting,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: submitLogin,
    mutationKey: ["submitLogin"],
  });

  useAppErrorHandlers([
    {
      error: submitLoginError,
      id: "Login-submitLogin",
    },
  ]);

  useEffect(() => {
    if (isLoginSuccess) {
      appNavigation.toHome();
      enqueueSnackbar("Logged in", { variant: "success" });
    }
  }, [isLoginSuccess]);

  return (
    <PageContainer isAuthRequired={false}>
      <Grid container direction="column">
        <Grid xs={12}>
          <Typography variant="h1" textAlign="center">
            Login
          </Typography>
        </Grid>
        <Grid xs={12}>
          <form onSubmit={handleSubmit((values) => submitLoginMutate(values))}>
            <Grid container direction="column" spacing={2}>
              <Grid>
                <TextFieldWithController
                  control={control}
                  name={"email"}
                  label={"Email"}
                  helperText={`Use "fail" to simulate API error`}
                />
              </Grid>
              <Grid>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isValidating || isSubmitting}
                  loading={isValidating || isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
