import { render } from "@testing-library/react";

import { AppProviders } from "../components/AppProviders";

export const renderWithProviders = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AppProviders, ...options });

export * from "@testing-library/react";
