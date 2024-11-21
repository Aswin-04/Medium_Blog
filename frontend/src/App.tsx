import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import BlogPage from "./pages/BlogPage";
import Publish from "./pages/Publish";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/blogs"/>,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/blog/:id",
      element: <BlogPage />,
    },
    {
      path: "/blogs",
      element: <Blogs />,
    },
    {
      path: "/publish",
      element: <Publish/>
    }
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
