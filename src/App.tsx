import { Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import EmailSourceModal from "@/components/EmailSourceModal";
import QRSourceModal from "@/components/QRSourceModal";
import HomePage from "@/pages/Landing/Landing";

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen isLoading />}>
      <QRSourceModal />
      <EmailSourceModal />
      <HomePage />
    </Suspense>
  );
}
