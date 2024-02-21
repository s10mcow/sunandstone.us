import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppNavigate } from "../../../../services/Navigation";
import { LoginForm, loginSchema } from "./LoginForm";
import { useLoginMutation } from "../../../../services/Authentication";
import { useFirebaseAuthErrorMessage } from "../../../../services/Firebase";
import { LoadingWrapper } from "components/common/loader/LoadingWrapper";
import { AccountPageContainer } from "components/pages/account/AccoutPageContainer";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useAppNavigate();

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const {
    error,
    mutate: submitLogin,
    isPending,
  } = useLoginMutation({
    onSuccess: () => navigate.toHome(),
  });

  const errorMessage = useFirebaseAuthErrorMessage(error);

  const handleSignIn = async (data: FormValues) => {
    const { email, password } = data;
    submitLogin({ email, password });
  };

  return (
    <LoadingWrapper visible={isPending}>
      <AccountPageContainer>
        <LoginForm
          onSubmit={handleSubmit(handleSignIn)}
          control={control}
          errorMessage={errorMessage}
        />
      </AccountPageContainer>
    </LoadingWrapper>
  );
};

export default LoginPage;
