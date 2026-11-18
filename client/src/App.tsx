import { createBrowserRouter, RouterProvider } from "react-router-dom"
// layouts
import RootLayout from "./components/layouts/RootLayout";
import AuthLayout from "./components/layouts/AuthLayout";
// pages
import Home from "./pages/Home";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
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
      children: [],
    }
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
