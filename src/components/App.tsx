import { useAuthenticationMutation } from "../services/Authentication";
import { FullScreenCircularProgress } from "./common/loader/FullScreenCircularProgress";
import { useEffect } from "react";
import { useAppErrorHandlers } from "../services/ErrorMessaging";
import AppRouter from "./routes/AppRouter";
import { AppProviders } from "./AppProviders";

export default function App() {
  const {
    isPending,
    mutate: authenticate,
    error: authenticateError,
  } = useAuthenticationMutation();

  useAppErrorHandlers([
    {
      error: authenticateError,
      id: "App-authenticateError",
    },
  ]);

  useEffect(() => authenticate(), []);

  if (isPending) return <FullScreenCircularProgress />;

  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
