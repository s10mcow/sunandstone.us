import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthenticatedUser } from "../../services/Authentication";
import { NavMenu } from "components/NavMenu";
import { Footer } from "components/Footer";
import styled from "@emotion/styled";
import { useAppRoutes } from "../../services/Routes";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default function AppRouter() {
  const authenticatedUser = useAuthenticatedUser();

  const routes = useAppRoutes({ isAuthenticated: !!authenticatedUser });

  return (
    <AppContainer>
      <BrowserRouter>
        <NavMenu />
        <Routes>
          {routes.map((routeProps, index) => (
            <Route key={index} {...routeProps} />
          ))}
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContainer>
  );
}
