import { RecoilRoot } from "recoil";
import { Amplify } from "aws-amplify";
import RecoilNexus from "recoil-nexus";
import { SnackbarProvider } from "notistack";
import { queryClient } from "@/services/QueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { appConfig } from "@/services/AppConfig";
const { userPoolId, userPoolClientId } = appConfig;

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId,
      userPoolClientId,
    },
  },
});

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
