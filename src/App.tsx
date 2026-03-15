import { lazy, Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import HomePage from "@/pages/Landing/Landing";

const QRSourceModal = lazy(() => import("@/components/QRSourceModal"));
const EmailSourceModal = lazy(() => import("@/components/EmailSourceModal"));

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen isLoading />}>
      <QRSourceModal />
      <EmailSourceModal />
      <HomePage />
    </Suspense>
  );
}
