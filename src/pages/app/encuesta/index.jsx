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

  function handleSubmit(e) {
    e.preventDefault();
    //validar que todos estén llenos
    if (nombrePareja === "" || fechaBoda === "" || ubicacionEvento === "") {
      alert("Todos los campos son obligatorios");
      return;
    }
    const WeddingID = uid();
    let convertirNombrePareja = FormatearPareja(nombrePareja);
    const URL =
      import.meta.env.VITE_URL_FRONTEND +
      convertirNombrePareja +
      "/" +
      fechaBoda;
    //extrar auth.UserID del local storage
    const auth = JSON.parse(localStorage.getItem("auth"));

    console.log("Ejecutando weddings");
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
        Lugar: ubicacionEvento,
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
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("actualizando user");
    fetch(
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
    )
      .then((res) => {
        if (res.ok) {
          //actualizar el estado de auth en el contexto con Completado = true
          alert("Good al actualizar el user");
        } else {
          alert("Error al actualizar el user");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("Ejecutando webpages");
    fetch(import.meta.env.VITE_API_ENDPOINT + "/webpages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        WebPageID: uid(),
        WeddingID,
        URLPage: URL,
        Styles: {
          primaryColor: "#FFD700",
          secondaryColor: "#FFD700",
          Typography: "Roboto",
          FrontURL:
            "https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap",
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Creado web page");
        } else {
          alert("Error al crear web page");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setAuth({ ...auth, Completado: true });
    //actualizar en el local storage
    localStorage.setItem("auth", JSON.stringify({ ...auth, Completado: true }));
    navigate("/inicio");
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
