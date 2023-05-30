import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import React from "react";
import Sidebar from "./components/Sidebar";

import "./index.css";
// import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getToken } from "./assets/token";
import NotFound from "./NotFound";

const queryClient = new QueryClient();

// Error boundary component to handle authentication errors
function AuthErrorBoundary({ children }) {
  const { data: authToken } = useQuery("authToken", getToken);

  if (!authToken) {
    // Render the authentication error UI here
    return (
      <h1 className="auth-error-message">
        {" "}
        401 - Authentication Error <br /> Account Login Required
      </h1>
    );
  }

  // If authenticated, render the children
  return children;
}

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/Sidebar"
              element={
                // <AuthErrorBoundary>
                <Sidebar />
                // </AuthErrorBoundary>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}
