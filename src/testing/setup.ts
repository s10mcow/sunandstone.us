import { vi } from "vitest";
import { mockAuthenticatedUser } from "../services/__mocks__/Authentication";

vi.mock("react-router-dom", () => {
  const reactRouterDom = vi.importActual("react-router-dom");
  return {
    ...reactRouterDom,
    useNavigate: vi.fn(() => vi.fn),
  };
});

vi.mock("../services/Authentication", () => {
  const authentication = vi.importActual("../services/Authentication");
  return {
    ...authentication,
    useAuthenticatedUser: vi.fn(() => mockAuthenticatedUser),
    resetAuthenticatedUser: vi.fn(),
  };
});
