import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AuthGuard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth !== null) {
      const data = JSON.parse(storedAuth);
      setAuth(data); // Aquí se actualiza el estado con la información del usuario.
    }
    setLoading(false); // Terminamos de cargar después de verificar la autenticación.
  }, [setAuth]);

  if (loading) {
    return <div>Cargando...</div>; // Indicador de carga mientras se verifica la autenticación.
  }

  // Si el usuario no está autenticado, redirigimos a la vista de inicio de sesión.
  return auth ? <Outlet /> : <Navigate replace to="/inicio-sesion" />;
};

export default AuthGuard;
