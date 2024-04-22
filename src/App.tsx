import { Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import HomePage from "@/pages/Landing/Landing";

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen isLoading />}>
      <HomePage />
    </Suspense>
  );
}
