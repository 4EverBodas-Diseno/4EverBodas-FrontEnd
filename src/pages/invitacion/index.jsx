import React, { useState, useEffect } from "react";
import Principal from "./Principal";
import { fetchingByUserID } from "../../utils/fetching";
import { useParams } from "react-router-dom";

const Index = () => {
  /* aquí hacer el fetch desde la db */
  const [webPage, setWebPage] = useState(null);
  const { idUser } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const webPage = await fetchingByUserID(idUser);
        setWebPage(webPage);
        loadFont(webPage.tipografia.url);
        console.log(webPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Llamamos a la función asíncrona
  }, []);
  const loadFont = (url) => {
    // Verifica si ya existe el link
    let existingLink = document.querySelector(`link[href="${url}"]`);

    if (!existingLink) {
      // Crea y agrega un nuevo link para la fuente seleccionada
      const link = document.createElement("link");
      link.href = url;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  };

  return (
    <>
      {webPage ? (
        <div style={{ fontFamily: webPage.tipografia.name }}>
          <Principal webPage={webPage} />
        </div>
      ) : (
        "Cargando..."
      )}
    </>
  );
};

export default Index;
