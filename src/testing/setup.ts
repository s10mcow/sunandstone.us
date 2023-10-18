import { vi } from "vitest";
import { mockAuthenticatedUser } from "../services/__mocks__/Authentication.ts";

vi.mock("react-router-dom", () => {
  const reactRouterDom = vi.importActual("react-router-dom");
  return {
    ...reactRouterDom,
    useNavigate: vi.fn(() => vi.fn),
  };
});

vi.mock("../services/Authentication.ts", () => {
  const authentication = vi.importActual("../services/Authentication.ts");
  return {
    ...authentication,
    useAuthenticatedUser: vi.fn(() => mockAuthenticatedUser),
    resetAuthenticatedUser: vi.fn(),
  };
});
