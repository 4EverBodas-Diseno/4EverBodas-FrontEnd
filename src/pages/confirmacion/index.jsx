import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchingByGuestID, fetchingByUserID } from "../../utils/fetching";

const Invitation = () => {
  const [webPage, setWebPage] = useState(null);
  const [guest, setGuest] = useState(null);
  const { idConfirmacion } = useParams();
  const [selected, setSelected] = useState("Asistirá");
  const [invited, setInvited] = useState("");
  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const guestData = await fetchingByGuestID(idConfirmacion);
        setGuest(guestData);
        fetchData(guestData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchGuest();

    const fetchData = async ({ UserID, numAcompanantes, EstadoInvitacion }) => {
      try {
        const webPage = await fetchingByUserID(UserID);
        setWebPage(webPage);
        /* loadFont(webPage.tipografia.url); */
        setSelected(EstadoInvitacion);
        setInvited(numAcompanantes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guest.numMaxAcompanantes < invited || invited < 0) {
      alert("Verifica que el número de acompañantes esté dentro del rango");
      return;
    }
    const guestInfo = {
      ...guest,
      numAcompanantes: invited,
      EstadoInvitacion: selected,
    };
    if (selected === "Asistirá") guestInfo.Confirmado = true;
    if (selected === "No Asistirá") guestInfo.Confirmado = false;

    fetch(`${import.meta.env.VITE_API_ENDPOINT}/guests/${guest.GuestID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guestInfo), // guestInfo es el objeto con los datos actualizados
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la edición");
      })
      .then((data) => {
        alert("Invitado actualizado en la lista");
      })
      .catch((error) => {
        console.error("Error al editar el invitado:", error);
      });
  };

  const formatDate = (fecha) => {
    const date = new Date(fecha); // Convierte la cadena en un objeto Date
    const options = { month: "long", day: "numeric", year: "numeric" };

    // Formatear con Intl.DateTimeFormat y asegurarse del idioma
    return new Intl.DateTimeFormat("es-ES", options).format(date);
  };
  const commonStyle = {
    borderRadius: "0.5rem",
    textAlign: "center",
    padding: "10px 60px",
    fontSize: "1.125rem", // text-lg
    width: "10rem", // Similar a w-40
    cursor: "pointer",
    transition: "all 0.3s ease",
  };
  return webPage ? (
    <div
      className="min-h-screen bg-cover bg-center font-manrope"
      style={{
        backgroundImage: `url('/texture.png')`,
      }}
    >
      <header>
        <div
          style={{ backgroundColor: webPage.color.primary }}
          className="text-white p-5 h-20 text-center relative flex items-center"
        >
          <h2 className="text-xl font-bold absolute left-0 ml-8">
            Hola, {guest.Nombre} {guest.Apellido}
          </h2>
        </div>
      </header>

      <main>
        <div
          className="max-w-4xl  mx-auto my-10 p-5 bg-white border border-gray-300 shadow-lg bg-cover bg-center relative"
          style={{ backgroundImage: `url('/flowers-corners.png')` }}
        >
          <header className="text-center">
            <h2
              className=" text-5xl font-playfair mb-4"
              style={{ color: webPage.color.secondary }}
            >
              {webPage.nombrePareja}
            </h2>
            <h5 className="text-base">Requerimos el placer de tu compañía</h5>
            <h3 className="text-lg mt-2">{formatDate(webPage.fecha)}</h3>
            <a
              href={
                import.meta.env.VITE_URL_FRONTEND +
                "/invitacion/" +
                guest.UserID
              }
              target="_blank"
              className="px-3 py-1 rounded-lg border-[1px] text-sm"
              style={{
                color: webPage.color.primary,
                borderColor: webPage.color.primary,
              }}
            >
              Ver más...
            </a>
          </header>

          <form id="invitation-form" className="mt-5" onSubmit={handleSubmit}>
            <hr className="my-4" />
            <div className="text-center text-2xl mb-5">
              <label htmlFor="attendance">¿Contaremos con tu presencia?</label>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1.25rem",
                justifyContent: "center",
                marginTop: "1.25rem",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="radio"
                  id="yes"
                  name="attendance"
                  value="yes"
                  checked={selected === "Asistirá"}
                  onChange={() => setSelected("Asistirá")}
                  style={{ position: "absolute", opacity: 0 }}
                />
                <label
                  htmlFor="yes"
                  style={{
                    ...commonStyle,
                    backgroundColor:
                      selected === "Asistirá"
                        ? webPage.color.primary
                        : "#d1d5db", // Azul si está seleccionado, gris si no
                    color: selected === "Asistirá" ? "#ffffff" : "#000000", // Blanco si está seleccionado, negro si no
                  }}
                >
                  Sí
                </label>
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type="radio"
                  id="no"
                  name="attendance"
                  value="no"
                  checked={selected === "No Asistirá"}
                  onChange={() => setSelected("No Asistirá")}
                  style={{ position: "absolute", opacity: 0 }}
                />
                <label
                  htmlFor="no"
                  style={{
                    ...commonStyle,
                    backgroundColor:
                      selected === "No Asistirá"
                        ? webPage.color.primary
                        : "#d1d5db", // Azul si está seleccionado, gris si no
                    color: selected === "No Asistirá" ? "#ffffff" : "#000000", // Blanco si está seleccionado, negro si no
                  }}
                >
                  No
                </label>
              </div>
            </div>

            <div className="flex justify-center items-center mb-5">
              <input
                type="number"
                placeholder="Número de acompañantes"
                id="guests"
                name="guests"
                min="0"
                value={invited}
                onChange={(e) => setInvited(e.target.value)}
                className="bg-gray-300 p-4 rounded-lg w-72 text-center"
              />
              <h3 className="text-4xl text-gray-500">
                /{guest.numMaxAcompanantes}
                <span className="text-xl">max</span>
              </h3>
            </div>
            <button
              type="submit"
              id="send"
              className=" text-white py-2 px-6 rounded-lg mx-auto block transition-colors"
              style={{ backgroundColor: webPage.color.primary }}
            >
              Enviar
            </button>
          </form>
        </div>
      </main>
    </div>
  ) : (
    "Cargando..."
  );
};

export default Invitation;
