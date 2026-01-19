import { Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import QRSourceModal from "@/components/QRSourceModal";
import HomePage from "@/pages/Landing/Landing";

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen isLoading />}>
      <QRSourceModal />
      <HomePage />
    </Suspense>
  );
}
