import { createBrowserRouter, RouterProvider } from "react-router-dom"
// layouts
import RootLayout from "./components/layouts/RootLayout";
import AuthLayout from "./components/layouts/AuthLayout";
// pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/main",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "signup",
          element: <Signup />
        }
      ],
    }
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
