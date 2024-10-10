import React, { useState, useEffect } from "react";
import Table from "./Table";
import { uid } from "uid";
const Principal = () => {
  const [active, setActive] = useState(false);
  const [guests, setGuests] = useState([]);

  const [newGuest, setNewGuest] = useState({
    nombres: "",
    telefono: "",
    maxAcompanantes: 0,
    correo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //obtener el userID del localstorage
    const auth = JSON.parse(localStorage.getItem("auth"));
    fetch(import.meta.env.VITE_API_ENDPOINT + "/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        GuestID: uid(),
        UserID: auth.UserID,
        Nombre: newGuest.nombres,
        Correo: newGuest.correo,
        EstadoInvitacion: "string",
        Confirmado: true,
        numAcompanantes: 10,
        numMaxAcompanantes: newGuest.maxAcompanantes,
        Telefono: newGuest.telefono,
        URL: "holamundo",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la petición");
      })
      .then((data) => {
        setGuests([...guests, newGuest]);
        console.log("Invitado agregado");
      });
  };

  useEffect(() => {
    //traer el auth desde el localstorage
    const auth = JSON.parse(localStorage.getItem("auth"));

    fetch(import.meta.env.VITE_API_ENDPOINT + "/guests/user/" + auth.UserID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la petición");
      })
      .then((data) => {
        setGuests(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-secondary-200">
        Gestiona tus invitados
      </h1>
      <div className="flex flex-col py-4 gap-3">
        {/* Sección izquierda */}
        <div className="flex items-center justify-between space-x-4">
          <section className="flex gap-4">
            <button
              onClick={() => setActive(true)}
              className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600"
            >
              Agregar invitado
            </button>
            <button className="text-red-500 font-semibold hover:underline">
              Eliminar
            </button>
            <button className="text-yellow-500 font-semibold hover:underline">
              Editar
            </button>
          </section>
          <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <option value="todos">Todos</option>
            {/* Otras opciones */}
          </select>
        </div>
        {active && (
          //form to add a new guest
          <form className="flex relative flex-col gap-4 justify-center w-[500px] mx-auto m-4 bg-gray-50 p-5">
            <button
              onClick={() => setActive(false)}
              className="text-white px-4 py-2 bg-red-500 rounded-lg w-20 self-end"
            >
              Cerrar
            </button>
            <div>
              <label
                htmlFor="nombres"
                className="block text-gray-700 font-semibold mb-1"
              >
                Nombres y Apellidos:
              </label>
              <input
                type="text"
                id="nombres"
                name="nombres"
                value={newGuest.nombres}
                onChange={(e) =>
                  setNewGuest({ ...newGuest, nombres: e.target.value })
                }
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="telefono"
                className="block text-gray-700 font-semibold mb-1"
              >
                Número de Teléfono:
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                value={newGuest.telefono}
                onChange={(e) =>
                  setNewGuest({ ...newGuest, telefono: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="correo"
                className="block text-gray-700 font-semibold mb-1"
              >
                Correo
              </label>
              <input
                type="email"
                id="correo"
                name="coreo"
                required
                value={newGuest.correo}
                onChange={(e) =>
                  setNewGuest({ ...newGuest, correo: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="maxAcompanantes"
                className="block text-gray-700 font-semibold mb-1"
              >
                Número Máximo de Acompañantes:
              </label>
              <input
                type="number"
                id="maxAcompanantes"
                name="maxAcompanantes"
                required
                value={newGuest.maxAcompanantes}
                onChange={(e) =>
                  setNewGuest({
                    ...newGuest,
                    maxAcompanantes: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600"
            >
              Agregar Invitado
            </button>
          </form>
        )}
        {/* Sección derecha */}
        <div className="flex items-center space-x-4 justify-between">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-600">Seleccionar todos</span>
            <span className="mx-2">|</span>
            <span className="text-gray-600">0 personas seleccionadas</span>
          </div>

          <button className="border border-green-500 text-green-500 px-4 py-2 rounded-full font-semibold hover:bg-green-100">
            Enviar por WhatsApp
          </button>
        </div>
      </div>
      <Table guests={guests} />
      {/* <div className="w-full flex justify-between mt-4 py-3 px-6 border-[1px] border-slate-200 rounded-xl">
        <section>
          <p>
            <strong>Total: </strong>4 personas asistirán
          </p>
        </section>
        <section className="flex gap-3">
          <p>7 invitados</p>
          <p>9 acompañantes</p>
        </section>
      </div> */}
    </>
  );
};

export default Principal;
