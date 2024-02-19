import { useEffect, useMemo, useState } from "react";
import EnterEmailForm, {
  EnterEmailFormValues,
  enterEmailSchema,
} from "./EnterEmailForm";
import VerifyForm, { VerifyFormValues, verifySchema } from "./VerifyForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router";
import { EmailSent } from "./EmailSent";
import { FirebaseError } from "@firebase/util";
import { useAppNavigate } from "services/Navigation";
import {
  useConfirmResetPasswordMutation,
  useResetPasswordMutation,
} from "services/Authentication";
import { logger } from "services/Logger";
import { LoadingWrapper } from "components/common/loader/LoadingWrapper";
import { AccountPageContainer } from "components/pages/account/AccoutPageContainer";

const ChangePasswordPage = () => {
  const navigate = useAppNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const location = useLocation();
  const [oobCode, setOobCode] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get("oobCode");

    if (oobCode) {
      setOobCode(oobCode);
    }
  }, [location]);

  const { mutate: resetPassword, isPending: isResetPasswordPending } =
    useResetPasswordMutation({
      onSuccess: () => {
        enqueueSnackbar(
          "Email sent, please check your inbox for a reset password link.",
          {
            variant: "success",
          },
        );
        setEmailSent(true);
      },
      onError: (error: unknown) => {
        if ((error as FirebaseError).code === "auth/user-not-found") {
          enqueueSnackbar(
            "No account found with that email address, please try again.",
            {
              variant: "error",
            },
          );
          return;
        }
        enqueueSnackbar(
          "Unknown error occurred submitting email for reset password.",
          {
            variant: "error",
          },
        );
        logger.error({
          message: "Unknown error occurred submitting email for reset password",
          error,
        });
      },
    });

  const {
    mutate: confirmResetPassword,
    isPending: isConfirmResetPasswordPending,
  } = useConfirmResetPasswordMutation({
    onSuccess: () => {
      enqueueSnackbar(
        "Password successfully reset, please sign in with your new password.",
        {
          variant: "success",
        },
      );
      navigate.toLogin();
    },
    onError: (error) => {
      enqueueSnackbar("Unknown error occurred, please try again", {
        variant: "error",
      });

      logger.error({
        message: "Unknown error occurred resetting password",
        error,
      });
    },
  });

  const isLoading = useMemo(
    () => isResetPasswordPending || isConfirmResetPasswordPending,
    [isResetPasswordPending, isConfirmResetPasswordPending],
  );

  const enterEmailForm = useForm<EnterEmailFormValues>({
    resolver: yupResolver(enterEmailSchema),
  });
  const verifyForm = useForm<VerifyFormValues>({
    resolver: yupResolver(verifySchema),
  });

  const handleSubmitEmailForm = ({ email }: { email: string }) => {
    resetPassword({ email });
  };

  const handleResetPassword = async ({ password }: VerifyFormValues) => {
    if (!oobCode) {
      enqueueSnackbar(
        "Invalid reset password link, please try resetting your password again",
        { variant: "error" },
      );
      return;
    }
    confirmResetPassword({
      oobCode,
      password,
    });
  };

  return (
    <LoadingWrapper visible={isLoading}>
      <AccountPageContainer>
        {oobCode ? (
          <VerifyForm
            onSubmit={verifyForm.handleSubmit(handleResetPassword)}
            control={verifyForm.control}
          />
        ) : (
          <>
            {emailSent ? (
              <EmailSent
                email={enterEmailForm.getValues("email")}
                resendEmail={resetPassword}
              />
            ) : (
              <EnterEmailForm
                onSubmit={enterEmailForm.handleSubmit(handleSubmitEmailForm)}
                control={enterEmailForm.control}
              />
            )}
          </>
        )}
      </AccountPageContainer>
    </LoadingWrapper>
  );
};

export default ChangePasswordPage;
