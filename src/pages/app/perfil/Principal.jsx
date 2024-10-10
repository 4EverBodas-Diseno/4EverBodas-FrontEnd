import React, { useEffect, useState } from "react";

const Principal = () => {
  const [datos, setDatos] = useState({
    profileID: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
  });
  const handleSubmit = (e) => {
    console.log(datos.profileID);
    e.preventDefault();
    fetch(import.meta.env.VITE_API_ENDPOINT + "/profiles/" + datos.profileID, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Telefono: datos.telefono,
        Direccion: datos.direccion,
        FechaNacimiento: datos.fechaNacimiento,
      }),
    });
  };

  useEffect(() => {
    //obtener el id de local storage
    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log(auth.UserID);

    fetch(import.meta.env.VITE_API_ENDPOINT + "/profiles/user/" + auth.UserID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDatos({
          profileID: data.profileID,
          telefono: data.Telefono || "",
          direccion: data.Direccion || "",
          fechaNacimiento: data.FechaNacimiento || "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-secondary-200">
        Editar perfil
      </h2>

      {/* Nombres (obligatorio) */}
      <form onSubmit={handleSubmit}>
        {/*<div className="mb-4">
           <label className="block text-sm font-semibold mb-2" htmlFor="nombres">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nombres"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Escribe tu nombre"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="apellidos"
          >
            Apellido <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="apellidos"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Escribe tu apellido"
            required
          />
        </div> */}

        {/* Teléfono (opcional) */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="telefono"
          >
            Teléfono
          </label>
          <input
            type="text"
            id="telefono"
            value={datos.telefono}
            onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Escribe tu número de teléfono"
          />
        </div>

        {/* Dirección (opcional) */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="direccion"
          >
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            value={datos.direccion}
            onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Escribe tu dirección"
          />
        </div>

        {/* Fecha de nacimiento (opcional) */}
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="fecha-nacimiento"
          >
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="fecha-nacimiento"
            value={datos.fechaNacimiento}
            onChange={(e) =>
              setDatos({ ...datos, fechaNacimiento: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Botón para guardar */}
        <div className="flex justify-end">
          <button className="bg-primary-100 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-200">
            Guardar
          </button>
        </div>
      </form>

      {/* Fecha de creación */}
      {/*
      <div className="mt-6 text-gray-500 text-sm">
        Fecha de creación del perfil:{" "}
         <span className="font-semibold">05/09/2024</span> 
      </div>
      */}
    </>
  );
};

export default Principal;
