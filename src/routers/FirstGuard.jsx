import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const FirstGuard = () => {
  const { auth } = useContext(AuthContext);

  return auth.Completado ? <Outlet /> : <Navigate replace to="/encuesta" />;
};

export default FirstGuard;
