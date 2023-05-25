// import { useState } from "react";
// import "./App.css";
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
import ReactDOM from "react-dom/client";
// import App from './App.jsx'
import Sidebar from "./components/Sidebar.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

export const routes = createBrowserRouter([
  { path: "/", element: <Signin /> },
  { path: "/Signup", element: <Signup /> },
  { path: "/Sidebar", element: <Sidebar /> },
]);
const queryClient = new QueryClient();

export default function App() {
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
