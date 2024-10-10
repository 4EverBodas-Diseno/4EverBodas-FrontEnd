const fetchingByUserID = async (UserID) => {
  let idWedding = "";
  const webPage = {};

  try {
    // Primer fetch: obtener bodas
    const resWedding = await fetch(
      import.meta.env.VITE_API_ENDPOINT + "/weddings/user/" + UserID,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resWedding.ok) {
      const dataWedding = await resWedding.json();
      idWedding = dataWedding.WeddingID;
      webPage.fecha = dataWedding.FechaEvento;
      webPage.URLLugar = dataWedding.Lugar;
      webPage.nombrePareja = dataWedding.NombrePareja;
      webPage.historia = dataWedding.Historia;
    } else {
      console.log("Error al obtener las bodas");
    }

    // Segundo fetch: obtener datos de la webPage
    const resWebPage = await fetch(
      import.meta.env.VITE_API_ENDPOINT + "/webpages/wedding/" + idWedding,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resWebPage.ok) {
      const dataWebPage = await resWebPage.json();
      webPage.tipografia = {
        name: dataWebPage.Styles.Typography,
        url: dataWebPage.Styles.FrontURL,
      };
      webPage.color = {
        primary: dataWebPage.Styles.primaryColor,
        secondary: dataWebPage.Styles.secondaryColor,
      };
      webPage.webPageID = dataWebPage.WebPageID;
    } else {
      console.log("Error al obtener la webPage");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return webPage;
};

export default fetchingByUserID;
