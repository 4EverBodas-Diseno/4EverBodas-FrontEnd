import React from "react";
import Hero from "./Hero";
import Historia from "./Historia";
import Date from "./Date";
import Lugar from "./Lugar";
import Header from "./Header";
const Principal = ({ webPage }) => {
  return (
    <div className="w-full @container">
      <Header pareja={webPage.nombrePareja} />
      <Hero
        colores={webPage.color}
        pareja={webPage.nombrePareja}
        fecha={webPage.fecha}
      />
      <div className="max-w-4xl mx-auto py-10 space-y-10">
        <Historia colores={webPage.color} description={webPage.historia} />
        <Date
          colores={webPage.color}
          fecha={webPage.fecha}
          nombrePareja={webPage.nombrePareja}
        />
        <Lugar colores={webPage.color} url={webPage.URLLugar} />
      </div>
    </div>
  );
};

export default Principal;
