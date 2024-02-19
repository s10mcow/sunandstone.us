import { useGetUser } from "@thesparklaboratory/teetimeportal-react-query-client";
import { useAppErrorHandlers } from "./ErrorMessaging";
import { useAuthenticatedUser } from "./Authentication";

export function useUser() {
  const authenticatedUser = useAuthenticatedUser();
  const useGetUserReturn = useGetUser({
    query: {
      enabled: !!authenticatedUser,
    },
  });
  useAppErrorHandlers([
    {
      error: useGetUserReturn.error,
      id: "useUser",
    },
  ]);

  return useGetUserReturn;
}
