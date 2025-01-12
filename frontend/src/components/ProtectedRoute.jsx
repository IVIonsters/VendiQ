/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import Spinner from "./Spinner"

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth); // Add loading state
  const location = useLocation();

  // Show a loading spinner or placeholder while determining auth state
  if (loading) {
    return <Spinner />;
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the children if the user is authenticated
  return children;
}

export default ProtectedRoute;
