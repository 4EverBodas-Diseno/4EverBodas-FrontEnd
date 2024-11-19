import React, { useState, useEffect } from "react";
import Template from "./Template";
import DropDown from "../../components/DropDown";
import Colors from "../../components/Colors";
import Typography from "../../components/Typography";

const renderTypography = (item) => {
  return <Typography data={item} />;
};
const renderColors = (item) => {
  return <Colors data={item} />;
};
const colores = [
  {
    id: 1,
    primary: "#ff69a7",
    secondary: "#b6f679",
  },
  {
    id: 2,
    primary: "#51c778",
    secondary: "#919edc",
  },
  {
    id: 3,
    primary: "#613bdd",
    secondary: "#ea88c5",
  },
  {
    id: 4,
    primary: "#fd125a",
    secondary: "#a6fe6f",
  },
  {
    id: 5,
    primary: "#0a49fd",
    secondary: "#fe71c9",
  },
  {
    id: 6,
    primary: "#c8dd2c",
    secondary: "#84cfeb",
  },
];
const tipografias = [
  {
    id: 1,
    name: "Roboto",
    url: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
  },
  {
    id: 2,
    name: "Open Sans",
    url: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800",
  },
  {
    id: 3,
    name: "Lato",
    url: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900",
  },
  {
    id: 4,
    name: "Montserrat",
    url: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
  },
  {
    id: 5,
    name: "Poppins",
    url: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  },
];
const RealTime = ({ data, setData }) => {
  const [previousLink, setPreviousLink] = useState(null); // Para guardar el link previo

  const handleFontChange = (tipografia) => {
    setData((prev) => ({
      ...prev,
      tipografia: tipografia,
    }));
    loadFont(tipografia.url);
  };
  const handleColorChange = (color) => {
    setData((prev) => ({
      ...prev,
      color,
    }));
  };
  const loadFont = (url) => {
    // Verifica si ya existe el link
    let existingLink = document.querySelector(`link[href="${url}"]`);

    if (!existingLink) {
      // Si hay un link previo, elimínalo para solo mantener la fuente seleccionada
      if (previousLink) {
        document.head.removeChild(previousLink);
      }

      // Crea y agrega un nuevo link para la fuente seleccionada
      const link = document.createElement("link");
      link.href = url;
      link.rel = "stylesheet";
      document.head.appendChild(link);

      // Guarda el nuevo link como el link previo
      setPreviousLink(link);
    }
  };

  useEffect(() => {
    // Carga la primera tipografía
    handleFontChange(data.tipografia);
    handleColorChange(data.color);
  }, []);

  const submit = () => {
    fetch(import.meta.env.VITE_API_ENDPOINT + "/webpages/" + data.webPageID, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        URLPage: "https://www.google.com",
        Styles: {
          primaryColor: data.color.primary,
          secondaryColor: data.color.secondary,
          Typography: data.tipografia.name,
          FrontURL: data.tipografia.url,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert("Se ha guardado correctamente");
      });
  };

  return (
    <div>
      <div className="mb-5 flex justify-between">
        <section className="flex gap-5">
          {data && (
            <>
              <DropDown
                Component={renderTypography}
                data={tipografias}
                seleccionado={data.tipografia}
                setSeleccionado={handleFontChange}
                seleccionar="Selecciona una tipografía"
              />

              <DropDown
                Component={renderColors}
                data={colores}
                seleccionado={data.color}
                setSeleccionado={handleColorChange}
                seleccionar="Selecciona un color"
              />
            </>
          )}
        </section>
        <button
          onClick={submit}
          className="bg-primary-100 text-white px-5 py-2 rounded-full"
        >
          Aceptar
        </button>
      </div>
      {data && <Template webPage={data} />}
    </div>
  );
};

export default RealTime;
