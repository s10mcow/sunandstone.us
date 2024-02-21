import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { LicenseInfo } from "@mui/x-license-pro";
import { AppProviders } from "./components/AppProviders";
import { appConfig } from "./services/AppConfig";

LicenseInfo.setLicenseKey(appConfig.muiLicenseKey);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
