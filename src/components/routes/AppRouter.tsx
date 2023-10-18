import { Route, Routes, BrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/NotFound.tsx";
import { Home } from "../pages/Home.tsx";
import { Login } from "../pages/auth/Login.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth">
          <Route path="/auth/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
