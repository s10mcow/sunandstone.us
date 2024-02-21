import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useConfirmResetPasswordMutation } from "../../../../services/Authentication";
import { logger } from "../../../../services/Logger";
import VerifyForm, { VerifyFormValues, verifySchema } from "./VerifyForm";
import { LoadingWrapper } from "../../../common/loader/LoadingWrapper";
import { AccountPageContainer } from "../../account/AccoutPageContainer";
import {
  useAppNavigate,
  useURLSearchParams,
} from "../../../../services/Navigation";
import { useSnackbar } from "notistack";

const VerifyPasswordPage = () => {
  const query = useURLSearchParams();
  const email = query.get("email") ?? "";
  const navigate = useAppNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    mutate: confirmResetPassword,
    isPending: isConfirmResetPasswordPending,
  } = useConfirmResetPasswordMutation({
    onSuccess: () => {
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

  const verifyForm = useForm<VerifyFormValues>({
    resolver: yupResolver(verifySchema),
    defaultValues: {
      email,
    },
  });

  const handleResetPassword = async ({
    verification,
    password,
  }: VerifyFormValues) => {
    confirmResetPassword({
      oobCode: verification,
      password,
    });
  };

  return (
    <LoadingWrapper visible={isConfirmResetPasswordPending}>
      <AccountPageContainer>
        <VerifyForm
          onSubmit={verifyForm.handleSubmit(handleResetPassword)}
          control={verifyForm.control}
        />
      </AccountPageContainer>
    </LoadingWrapper>
  );
};

export default VerifyPasswordPage;
