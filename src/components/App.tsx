import { Suspense } from "react";
import AppRouter from "./routes/AppRouter";
import { useFirebaseInitialization } from "services/Firebase";
import { handleAuthChange } from "../services/Authentication";
import { FullScreenCircularProgress } from "./common/loader/FullScreenCircularProgress";
import { initializeApi } from "../services/Api";
import { useGoogleJsApiLoader } from "../services/Google";

// Sets up the interceptors for the API
initializeApi();

export default function App() {
  const { isFirebaseInitialized } = useFirebaseInitialization({
    onAuthChange: handleAuthChange,
  });

  useGoogleJsApiLoader();

  if (!isFirebaseInitialized) return <FullScreenCircularProgress />;

  return (
    <Suspense fallback={<FullScreenCircularProgress />}>
      <AppRouter />
    </Suspense>
  );
}
