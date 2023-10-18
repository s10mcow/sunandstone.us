import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { LicenseInfo } from "@mui/x-license-pro";
import { AppProviders } from "./components/AppProviders.tsx";

LicenseInfo.setLicenseKey(
  "2984b3e7bf15479286497629cb110e76Tz02NzY2MyxFPTE3MTcyNjY3MjMwMDAsUz1wcm8sTE09cGVycGV0dWFsLEtWPTI=",
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
