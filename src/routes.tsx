import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { Customers } from "./pages/Customers";
import { ThemeExample } from "./components/ThemeExample";
import { MainLayout } from "./layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "theme-example",
        element: <ThemeExample />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "customers",
    element: <Customers />,
  },
]);
