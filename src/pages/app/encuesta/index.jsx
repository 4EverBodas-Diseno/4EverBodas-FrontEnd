import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import SignOut from "../../../components/SignOut";
import { uid } from "uid";
import { useNavigate } from "react-router-dom";
import { FormatearPareja } from "../../../utils/formats";
const Encuesta = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nombrePareja, setNombrePareja] = useState("");
  const [fechaBoda, setFechaBoda] = useState("");
  const [ubicacionEvento, setUbicacionEvento] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    //validar que todos estén llenos
    // Validar que todos los campos estén llenos
    if (nombrePareja === "" || fechaBoda === "" || ubicacionEvento === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const WeddingID = uid();
      let convertirNombrePareja = FormatearPareja(nombrePareja);
      const URL =
        import.meta.env.VITE_URL_FRONTEND +
        convertirNombrePareja +
        "/" +
        fechaBoda;

      const auth = JSON.parse(localStorage.getItem("auth"));

      console.log("Ejecutando weddings");
      const weddingResponse = await fetch(
        import.meta.env.VITE_API_ENDPOINT + "/weddings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            WeddingID,
            UserID: auth.UserID,
            NombrePareja: nombrePareja,
            FechaEvento: fechaBoda,
            Lugar: ubicacionEvento,
            Historia: "",
          }),
        }
      );

      if (weddingResponse.ok) {
        console.log("Encuesta enviada con éxito");
      } else {
        console.error("Error al enviar la encuesta");
        return; // Salir si ocurre un error
      }

      console.log("Actualizando user");
      const userResponse = await fetch(
        import.meta.env.VITE_API_ENDPOINT +
          "/users/" +
          auth.UserID +
          "/completed",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (userResponse.ok) {
        console.log("Usuario actualizado");
      } else {
        console.error("Error al actualizar el usuario");
      }

      console.log("Ejecutando webpages");
      const webpageResponse = await fetch(
        import.meta.env.VITE_API_ENDPOINT + "/webpages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            WebPageID: uid(),
            WeddingID,
            URLPage: URL,
            Styles: {
              primaryColor: "#ff69a7",
              secondaryColor: "#b6f679",
              Typography: "Roboto",
              FrontURL:
                "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
            },
          }),
        }
      );

      if (webpageResponse.ok) {
        console.log("Web page creada");
      } else {
        console.error("Error al crear web page");
      }

      setAuth({ ...auth, Completado: true });
      localStorage.setItem(
        "auth",
        JSON.stringify({ ...auth, Completado: true })
      );
      navigate("/inicio");
    } catch (error) {
      console.error("Error en el proceso:", error);
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute top-0 flex p-2 justify-end w-full">
        <SignOut />
      </div>
      <div className="w-[300px] h-[350px] mx-auto mt-3 font-manrope text-sm">
        {/* Logo */}
        <img src="/icono.png" alt="Logo" className="w-20  mx-auto mb-4" />
        {/* Formulario */}
        <form
          className="shadow-xl p-6 rounded-xl bg-white"
          onSubmit={handleSubmit}
        >
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
            className="w-full h-10 mb-4 p-2 border-none rounded-md shadow-sm "
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

          {/* Ubicación del evento */}
          <label htmlFor="location" className="block mb-2 font-semibold">
            Ubicación del evento:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={ubicacionEvento}
            onChange={(e) => setUbicacionEvento(e.target.value)}
            placeholder="Insertar link del Google Maps"
            className="w-full h-10 mb-4 p-2 border-none rounded-md shadow-sm"
          />

          {/* Botón para ir a Google Maps */}

          <a
            href="https://www.google.com/maps"
            className="w-full h-9 font-bold text-gray-800 flex justify-center items-center border-[1px] border-black rounded-md cursor-pointer mb-4"
            target="_blank"
          >
            Ir a Google Maps
          </a>

          {/* Botón de confirmar */}
          <input
            type="submit"
            value="Confirmar"
            className="w-full h-9 font-bold bg-primary-100 text-white rounded-md cursor-pointer"
          />
        </form>
      </div>
      <div className="absolute -z-10 bottom-0  flex place-items-end w-screen justify-between">
        <img className="w-80" src="/left-flower.png" alt="" />
        <img className="w-60" src="/mid-flower.png" alt="" />
        <img
          className="w-80 transform scale-x-[-1]"
          src="/left-flower.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Encuesta;
