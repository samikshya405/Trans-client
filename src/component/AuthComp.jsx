import React from "react";
import { Navigate } from "react-router-dom";

export const AuthComp = ({ children, loggedInUser }) => {
  return loggedInUser?._id ? children : <Navigate to="/" />;
};
