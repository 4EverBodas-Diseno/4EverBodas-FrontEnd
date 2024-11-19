import React, { useState, useEffect, useCallback } from "react";
import Table from "./Table";
import { uid } from "uid";
import PopUpAgregarInvitado from "../../../components/PopUpAgregarInvitado";

const Principal = () => {
  const [active, setActive] = useState(false);
  const [guests, setGuests] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedGuestIds, setSelectedGuestIds] = useState(new Set());
  const [activeGuest, setActiveGuest] = useState(null);

  const handleSelect = useCallback((guestId) => {
    setSelectedGuestIds((prevSelectedGuestIds) => {
      const newSelectedGuestIds = new Set(prevSelectedGuestIds);
      if (newSelectedGuestIds.has(guestId)) {
        newSelectedGuestIds.delete(guestId);
        setCount((prev) => prev - 1);
      } else {
        newSelectedGuestIds.add(guestId);
        setCount((prev) => prev + 1);
      }
      return newSelectedGuestIds;
    });
  }, []);
  const isGuestSelected = useCallback(
    (guestId) => selectedGuestIds.has(guestId),
    [selectedGuestIds]
  );

  const handleSeleccionarTodos = () => {
    guests.forEach((e) => {
      handleSelect(e.GuestID);
    });
  };

  const onSave = (newGuest) => {
    //obtener el userID del localstorage
    if (!activeGuest) {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const guestInfo = JSON.stringify({
        GuestID: uid(),
        UserID: auth.UserID,
        EstadoInvitacion: "Por confirmar",
        Confirmado: false,
        numAcompanantes: 0,
        URL: "",
        ...newGuest,
      });
      fetch(import.meta.env.VITE_API_ENDPOINT + "/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: guestInfo,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error en la petición");
        })
        .then((data) => {
          setGuests([...guests, data.guest]);
          setActive(false);
        });
    } else {
      const guestInfo = JSON.stringify({
        ...newGuest,
      });
      fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/guests/${activeGuest.GuestID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: guestInfo, // guestInfo es el objeto con los datos actualizados
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error en la edición");
        })
        .then((data) => {
          // Actualizar la lista de invitados
          setGuests((prevGuests) =>
            prevGuests.map((guest) =>
              guest.GuestID === activeGuest.GuestID ? { ...newGuest } : guest
            )
          );
          alert("Invitado actualizado en la lista");
          setActive(false); // Cerrar el popup
        })
        .catch((error) => {
          console.error("Error al editar el invitado:", error);
        });
    }
  };

  const handleEdit = () => {
    const selectedId = Array.from(selectedGuestIds)[0]; // Obtiene el único ID seleccionado
    const guestToEdit = guests.find((guest) => guest.GuestID === selectedId); // Busca al invitado

    if (!guestToEdit) {
      alert("No se encontró el invitado seleccionado.");
      return;
    }
    setActiveGuest(guestToEdit);
    setActive(true);
  };

  const handleNuevoInvitado = () => {
    setActiveGuest(null);
    setActive(true);
  };
  const handleEliminar = () => {
    if (selectedGuestIds.size === 0) return alert("No ha seleccionado");
    const arreglo = Array.from(selectedGuestIds);
    const Json = JSON.stringify({
      ids: arreglo,
    });
    fetch(import.meta.env.VITE_API_ENDPOINT + "/guests/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: Json,
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Error en la petición");
      })
      .then((data) => {
        alert(data.message);
      });

    setGuests((prevGuests) =>
      prevGuests.filter((guest) => !selectedGuestIds.has(guest.GuestID))
    );
    setSelectedGuestIds(new Set());
    setCount(0);
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
              onClick={handleNuevoInvitado}
              className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600"
            >
              Agregar invitado
            </button>
            <button
              onClick={handleEliminar}
              className="text-red-500 font-semibold hover:underline"
            >
              Eliminar
            </button>

            <button
              className={`font-semibold ${
                count > 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-yellow-500 hover:underline"
              }`}
              disabled={count > 1}
              onClick={handleEdit}
            >
              Editar
            </button>
          </section>
          {/* <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <option value="todos">Todos</option>
            
          </select> */}
        </div>
        {/* Sección derecha */}
        <div className="flex items-center space-x-4 justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={handleSeleccionarTodos}
              checked={count === guests.length}
            />
            <span className="text-gray-600">Seleccionar todos</span>
            <span className="mx-2">|</span>
            <span className="text-gray-600">
              {count} personas seleccionadas
            </span>
          </div>
        </div>
      </div>

      {guests?.length !== 0 || guests ? (
        <Table
          guests={guests}
          isGuestSelected={isGuestSelected}
          handleSelect={handleSelect}
        />
      ) : (
        "No hay invitados"
      )}
      {active && (
        <PopUpAgregarInvitado
          onClose={() => setActive(false)}
          onSave={onSave}
          initialData={activeGuest}
        />
      )}
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
