import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateUser } from "@thesparklaboratory/serverless-rest-starter-react-query-client";
import { useSnackbar } from "notistack";
import CreateAccountForm, {
  CreateAccountFormValues,
  createAccountSchema,
} from "./CreateUserForm";
import { logger } from "../../../../services/Logger";
import { submitLogin } from "../../../../services/Authentication";
import { LoadingWrapper } from "../../../common/loader/LoadingWrapper";
import { AccountPageContainer } from "components/pages/account/AccoutPageContainer";

export default function CreateAccountPage() {
  const createAccountForm = useForm({
    resolver: yupResolver(createAccountSchema),
  });
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: createUser, isPending: isSignUpPending } = useCreateUser({
    mutation: {
      onSuccess: async () => {
        const { email, password } = createAccountForm.getValues();
        await submitLogin({ email, password });
      },
      onError: (error) => {
        logger.error({ message: "Error signing up user", error });
        enqueueSnackbar("Error signing up, please try again", {
          variant: "error",
        });
      },
    },
  });

  const handleCreateAccountSubmit = createAccountForm.handleSubmit(
    (createAccountForm: CreateAccountFormValues) => {
      createUser({
        data: {
          email: createAccountForm.email,
          address: {
            city: createAccountForm.location.address.city,
            region: createAccountForm.location.address.region,
            latitude: createAccountForm.location.geocode.lat,
            longitude: createAccountForm.location.geocode.lng,
          },
          password: createAccountForm.password,
          firstName: createAccountForm.first,
          lastName: createAccountForm.last,
        },
      });
    },
  );
  return (
    <>
      <LoadingWrapper visible={isSignUpPending}>
        <AccountPageContainer>
          <CreateAccountForm
            onSubmit={handleCreateAccountSubmit}
            control={createAccountForm.control}
          />
        </AccountPageContainer>
      </LoadingWrapper>
    </>
  );
}
