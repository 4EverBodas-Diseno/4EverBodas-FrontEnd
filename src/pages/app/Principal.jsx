import React, { useContext, useEffect, useState } from "react";
import { ClipboardIcon, ShareIcon } from "@heroicons/react/24/outline";
import RealTime from "./RealTime";
import fetchingByUserID from "../../utils/fetching";
import AuthContext from "../../context/AuthContext";
const Principal = () => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const webPage = await fetchingByUserID(auth.UserID);
        setData(webPage);
        console.log(webPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Llamamos a la función asíncrona
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-secondary-200">
        Bienvenidos, {data?.nombrePareja}
      </h1>
      <section className="flex gap-3 mb-5">
        <p className="text-secondary-200">
          Enlace de tu invitación:{" "}
          <strong className="text-secondary-100">
            {import.meta.env.VITE_URL_FRONTEND}/invitacion/{auth.UserID}
          </strong>
        </p>
        <ClipboardIcon
          onClick={() =>
            copyToClipboard(
              import.meta.env.VITE_URL_FRONTEND + "/invitacion/" + auth.UserID
            )
          }
          className="h-6 w-6 text-primary-100 cursor-pointer"
        />
        <ShareIcon className="h-6 w-6 text-primary-100" />
      </section>
      {data && <RealTime data={data} setData={setData} />}
    </>
  );
};

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Texto copiado al portapapeles:", text);
      alert("Texto copiado al portapapeles"); // Mensaje de éxito (puedes personalizarlo)
    })
    .catch((err) => {
      console.error("Error al copiar el texto:", err);
      alert("Error al copiar el texto");
    });
};

export default Principal;
