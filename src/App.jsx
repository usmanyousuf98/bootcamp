import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import React from "react";

import Sidebar from "./components/Sidebar.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { getToken } from "./assets/token";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./components/Profile.jsx";

export const routes = createBrowserRouter([
  { path: "/", element: <Signin /> },
  { path: "/Signup", element: <Signup /> },

  {
    path: "/Sidebar",
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <Sidebar />,
      },
      {
        path: "Profile",
        element: <Profile />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  const Token = localStorage.getItem("@authToken");

  return (
    <>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>

      {/* <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/Modal" element={<Modal />} />
        </Routes>
      </Router> */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </>
  );
}
