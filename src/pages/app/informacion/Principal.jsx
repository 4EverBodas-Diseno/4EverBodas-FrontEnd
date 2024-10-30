import React, { useEffect, useState } from "react";

const Principal = () => {
  const [nombrePareja, setNombrePareja] = useState("");
  const [weddingID, setWeddingID] = useState("");
  const [fechaBoda, setFechaBoda] = useState("");
  const [ubicacionEvento, setUbicacionEvento] = useState("");
  const [historia, setHistoria] = useState("");
  useEffect(() => {
    //obtener el auth del local storage
    const auth = JSON.parse(localStorage.getItem("auth"));
    fetch(import.meta.env.VITE_API_ENDPOINT + "/weddings/user/" + auth.UserID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWeddingID(data.WeddingID || "");
        setNombrePareja(data.NombrePareja || "");
        setFechaBoda(convertirFecha(data.FechaEvento || ""));
        setUbicacionEvento(data.Lugar || "");
        setHistoria(data.Historia || "");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    fetch(import.meta.env.VITE_API_ENDPOINT + "/weddings/" + weddingID, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        NombrePareja: nombrePareja,
        FechaEvento: fechaBoda,
        Lugar: ubicacionEvento,
        Historia: historia,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Se ha guardado correctamente");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const convertirFecha = (fechaISO) => {
    return new Date(fechaISO).toISOString().split("T")[0];
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-secondary-200">
        Información de la boda
      </h1>
      <form className="mt-5" onSubmit={onSubmit}>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="nombre-pareja"
          >
            Nombre de la pareja
          </label>
          <div className="flex justify-between">
            <input
              type="text"
              id="nombre-pareja"
              placeholder="Ale y Uziel"
              value={nombrePareja}
              onChange={(e) => setNombrePareja(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <span className="text-gray-500 ml-2">
            Su URL: invitaciones.4everbodas.com/<strong>Ale-y-Uziel</strong>
          </span>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="fecha-boda"
          >
            Fecha de su boda
          </label>
          <input
            type="date"
            id="fecha-boda"
            value={fechaBoda}
            onChange={(e) => setFechaBoda(e.target.value)}
            className="ww- px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <div className="mb-6">
          <section className="">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="ubicacion-boda"
            >
              Ubicación de su boda
            </label>
            <input
              type="text"
              id="ubicacion-boda"
              placeholder="Insertar URL de Google Maps"
              value={ubicacionEvento}
              onChange={(e) => setUbicacionEvento(e.target.value)}
              className="w-96 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </section>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            className="text-primary-100 mt-2 inline-block"
          >
            ¿Necesitas ayuda para obtener la URL?
          </a>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="historia"
          >
            Cuéntanos su historia
          </label>
          <textarea
            id="historia"
            rows="4"
            placeholder="Escribe aquí tu linda historia de amor..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100"
            value={historia}
            onChange={(e) => setHistoria(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-primary-100 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-100"
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default Principal;
