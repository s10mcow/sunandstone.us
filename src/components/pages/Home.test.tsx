import { test, describe, vi, expect } from "vitest";
import { Home } from "./Home.tsx";
import * as Authentication from "../../services/Authentication.ts";
import { fireEvent, renderWithProviders } from "../../testing/Testing.tsx";

describe("Home", () => {
  test("should call the logout function when the logout button is clicked", async () => {
    vi.spyOn(Authentication, "resetAuthenticatedUser");

    const { getByText } = renderWithProviders(<Home />);
    const button = getByText("Logout");

    fireEvent.click(button);
    expect(Authentication.resetAuthenticatedUser).toHaveBeenCalled();
  });
});
1;
