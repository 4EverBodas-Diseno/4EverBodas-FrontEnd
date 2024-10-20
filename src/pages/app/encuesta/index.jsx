import React, { useContext, useState } from "react"; // Asegúrate de que esta línea esté presente
import AuthContext from "../../../context/AuthContext";
import SignOut from "../../../components/SignOut";
import { uid } from "uid";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Encuesta = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [nombrePareja, setNombrePareja] = useState("");
  const [fechaBoda, setFechaBoda] = useState("");
  const [ubicacionEvento, setUbicacionEvento] = useState({
    lat: -12.0464, // Latitud inicial (Lima, Perú)
    lng: -77.0428, // Longitud inicial (Lima, Perú)
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Asegúrate de usar la clave correcta aquí
  });

  const [markerPosition, setMarkerPosition] = useState(ubicacionEvento);

  const handleMapClick = (event) => {
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(latLng);
    setUbicacionEvento(latLng); // Actualiza el estado de ubicación
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombrePareja === "" || fechaBoda === "" || !markerPosition) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const WeddingID = uid();
    const auth = JSON.parse(localStorage.getItem("auth"));

    // Guardar datos, incluyendo la ubicación
    fetch(import.meta.env.VITE_API_ENDPOINT + "/weddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        WeddingID,
        UserID: auth.UserID,
        NombrePareja: nombrePareja,
        FechaEvento: fechaBoda,
        Lugar: markerPosition, // Guardar coordenadas de la ubicación
        Historia: "",
      }),
    })
        .then((res) => {
          if (res.ok) {
            alert("Encuesta enviada con éxito");
          } else {
            alert("Error al enviar la encuesta");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    setAuth({ ...auth, Completado: true });
    localStorage.setItem("auth", JSON.stringify({ ...auth, Completado: true }));
    navigate("/inicio");
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
      <div className="relative h-screen w-screen overflow-hidden">
        <div className="absolute top-0 flex p-2 justify-end w-full">
          <SignOut />
        </div>
        <div className="w-[300px] h-[500px] mx-auto mt-3 font-manrope text-sm">
          {/* Logo */}
          <img src="/icono.png" alt="Logo" className="w-20  mx-auto mb-4" />
          {/* Formulario */}
          <form className="shadow-xl p-6 rounded-xl bg-white" onSubmit={handleSubmit}>
            {/* Nombre de la pareja */}
            <label htmlFor="name" className="block mb-2 font-semibold">
              Nombre de la pareja:
            </label>
            <input
                type="text"
                id="name"
                value={nombrePareja}
                onChange={(e) => setNombrePareja(e.target.value)}
                name="name"
                placeholder="Ej. Luis y Fernanda"
                className="w-full h-10 mb-4 p-2 border-none rounded-md shadow-sm"
            />

            {/* Fecha de la boda */}
            <label htmlFor="date" className="block mb-2 font-semibold">
              Fecha de su boda:
            </label>
            <input
                type="date"
                id="date"
                value={fechaBoda}
                onChange={(e) => setFechaBoda(e.target.value)}
                name="date"
                className="w-full h-10 mb-4 p-2 border-none rounded-md shadow-sm"
            />

            {/* Ubicación del evento - Mapa interactivo */}
            <label htmlFor="location" className="block mb-2 font-semibold">
              Selecciona la ubicación del evento:
            </label>
            <div style={{ height: "400px", width: "100%" }}>
              <GoogleMap
                  center={ubicacionEvento}
                  zoom={15}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  onClick={handleMapClick}
              >
                <Marker position={markerPosition} />
              </GoogleMap>
            </div>

            {/* Botón de confirmar */}
            <input
                type="submit"
                value="Confirmar"
                className="w-full h-9 font-bold bg-primary-100 text-white rounded-md cursor-pointer mt-4"
            />
          </form>
        </div>
      </div>
  );
};

export default Encuesta;
