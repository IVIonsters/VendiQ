/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

function ProtectedRoute({ children }) {
  const [user] = useAuthState(auth);
  const location = useLocation();

  if (!user && location.pathname !== '/') {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
