import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#313338",
            color: "#f2f3f5",
            border: "1px solid #1e1f22",
            fontSize: "0.875rem",
          },
          success: {
            iconTheme: {
              primary: "#23a55a",
              secondary: "#f2f3f5",
            },
          },
          error: {
            iconTheme: {
              primary: "#f23f42",
              secondary: "#f2f3f5",
            },
          },
        }}
      />
      <RouterProvider router={routes} />
    </>
  )
}

export default App
