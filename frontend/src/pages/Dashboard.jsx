/* eslint-disable no-unused-vars */
import React from "react";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
      {user ? (
        <div className="mt-4">
          <p className="text-lg">Name: {user.displayName || "User"}</p>
          <p className="text-lg">Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
