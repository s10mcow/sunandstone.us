import { RecoilRoot } from "recoil";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import RecoilNexus from "recoil-nexus";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../services/QueryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { theme } from "../theme/theme";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RecoilNexus />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
              <CssBaseline />
              <SnackbarProvider>{children}</SnackbarProvider>
            </StyledEngineProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
        </QueryClientProvider>
      </LocalizationProvider>
    </RecoilRoot>
  );
}
