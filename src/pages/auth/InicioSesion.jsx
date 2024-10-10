import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
const InicioSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    //si los campos están vacíos
    if (!email || !password) {
      navigate("/inicio");
      return;
    }
    //fetch a la api
    fetch(import.meta.env.VITE_API_ENDPOINT + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Correo: email, Password: password }),
    })
      .then((response) => {
        console.log(email, password);

        if (response.ok) {
          return response.json();
        }
        throw new Error("Usuario o contraseña incorrectos");
      })
      .then((data) => {
        //pasa esa data a auth en local storage
        localStorage.setItem("auth", JSON.stringify(data));
        //redirige
        setAuth(data);
        navigate("/inicio");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex h-screen font-manrope">
      {/* Panel izquierdo: Registro */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        {/* Logo */}
        <img src="/icono.png" alt="Logo" className="w-24 h-24 mb-4" />

        {/* Título de registro */}
        <h2 className="text-primary-100 text-2xl font-bold mb-4 font-playfair">
          Iniciar sesión
        </h2>

        {/* Formulario de registro */}
        <form className="w-2/3 text-sm" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full h-10 mb-4 p-4 rounded-lg shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Contraseña */}
          <input
            type="password"
            placeholder="Password"
            className="w-full h-10 mb-4 p-4 rounded-lg shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full h-10 bg-primary-100 text-white font-bold rounded-lg hover:bg-primary-200 transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Enlace a iniciar sesión */}
        <p className="mt-4">
          ¿Aún no tienes una cuenta?{" "}
          <Link to={"/registro"} className="text-primary-100 font-bold">
            Regístrate
          </Link>
        </p>
      </div>
      {/* Panel izquierdo: Saludo */}
      <div className="w-1/2 bg-primary-100 text-white flex flex-col justify-center items-center rounded-l-[20px] p-10">
        <h2 className="text-4xl font-bold font-playfair mb-4">Foreverbodas</h2>
        <p className="mb-6 text-center w-64 text-sm font-light font-manropes">
          Cree una cuenta con sus datos personales para utilizar todas las
          funciones del sitio.
        </p>
        <Link
          className="bg-white text-primary-100  font-bold border-2 border-white rounded-full py-2 px-6 hover:bg-primary-200 hover:text-white transition-colors text-sm"
          to={"/registro"}
        >
          REGISTRARSE
        </Link>
      </div>
    </div>
  );
};

export default InicioSesion;
