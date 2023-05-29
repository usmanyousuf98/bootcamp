import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const TokenValue = localStorage.getItem("@authToken");

  if (TokenValue == null) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
