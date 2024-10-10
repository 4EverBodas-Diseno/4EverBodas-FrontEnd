import React, { useState } from "react";
import { Link } from "react-router-dom";
import { uid } from "uid";
const initialValue = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  confirmarPassword: "",
};

const Registro = () => {
  const [usuario, setUsuario] = useState({ ...initialValue });

  function crearUser(e) {
    e.preventDefault();
    const fechaActual = new Date();
    if (usuario.password !== usuario.confirmarPassword) {
      console.log("Las contraseñas no coinciden");
      return;
    }
    if (usuario.password.length < 6) {
      console.log("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    const UserID = uid();
    console.log("Espere unos segundos...");
    fetch(import.meta.env.VITE_API_ENDPOINT + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: UserID,
        Nombre: usuario.nombre,
        Apellido: usuario.apellido,
        Correo: usuario.email,
        Password: usuario.password, // Cambia a "password" si es necesario en el backend
        FechaRegistro: fechaActual.toISOString(), // Solo la fecha
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        window.alert("Error al registrar el usuario");
        console.error("Hubo un error en la creación del usuario:", error);
      });

    fetch(import.meta.env.VITE_API_ENDPOINT + "/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profileID: uid(),
        UserID: UserID,
        Telefono: "",
        Direccion: "",
        FechaNacimiento: "",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Perfil creado exitosamente:", data);
      })
      .catch((error) => {
        alert("Error al crear el perfil");
        console.error("Hubo un error en la creación del perfil:", error);
      });
    setUsuario({ ...initialValue });
    alert("Usuario registrado con éxito");
  }

  return (
    <div className="flex h-screen font-manrope">
      {/* Panel izquierdo: Saludo */}
      <div className="w-1/2 bg-primary-100 text-white flex flex-col justify-center items-center rounded-r-[20px] p-10">
        <h2 className="text-4xl font-bold font-playfair mb-4">
          ¡Hola de nuevo!
        </h2>
        <p className="mb-6 text-center w-64 text-sm font-light font-manropes">
          Ingrese sus datos personales para utilizar todas las funciones del
          sitio.
        </p>
        <Link
          className="bg-white text-primary-100  font-bold border-2 border-white rounded-full py-2 px-6 hover:bg-primary-200 hover:text-white transition-colors text-sm"
          to={"/inicio-sesion"}
        >
          INICIAR SESIÓN
        </Link>
      </div>

      {/* Panel derecho: Registro */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        {/* Logo */}
        <img src="/icono.png" alt="Logo" className="w-24 h-24 mb-4" />

        {/* Título de registro */}
        <h2 className="text-primary-100 text-2xl font-bold mb-4 font-playfair">
          Registrarse
        </h2>

        {/* Formulario de registro */}
        <form className="w-2/3 text-sm" onSubmit={crearUser}>
          {/* Nombre */}
          <input
            type="text"
            placeholder="Nombre"
            className="w-full h-10 mb-4 p-4 rounded-lg shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-primary-200"
            value={usuario.nombre}
            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
          />

          {/* Apellido */}
          <input
            type="text"
            placeholder="Apellido"
            className="w-full h-10 mb-4 p-4 rounded-lg shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={usuario.apellido}
            onChange={(e) =>
              setUsuario({ ...usuario, apellido: e.target.value })
            }
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full h-10 mb-4 p-4 rounded-lg shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />

          {/* Contraseña */}
          <input
            type="password"
            placeholder="Password"
            className="w-full h-10 mb-4 p-4 rounded-lg shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={usuario.password}
            onChange={(e) =>
              setUsuario({ ...usuario, password: e.target.value })
            }
          />

          {/* Confirmar contraseña */}
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full h-10 mb-8 p-4 rounded-lg shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={usuario.confirmarPassword}
            onChange={(e) =>
              setUsuario({ ...usuario, confirmarPassword: e.target.value })
            }
          />

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full h-10 bg-primary-100 text-white font-bold rounded-lg hover:bg-primary-200 transition-colors"
          >
            Crear Cuenta
          </button>
        </form>

        {/* Enlace a iniciar sesión */}
        <p className="mt-4">
          ¿Has creado una cuenta?{" "}
          <Link to={"/inicio-sesion"} className="text-primary-100 font-bold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;
