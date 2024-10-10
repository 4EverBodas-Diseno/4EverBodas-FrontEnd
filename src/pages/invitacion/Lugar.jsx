import React from "react";

const Lugar = ({ url, colores }) => {
  return (
    <div className="bg-white  rounded-lg p-8 text-center mt-10">
      <img src="" alt="" />
      <section>
        <h3
          className="text-xl font-bold mb-4"
          style={{ color: colores.secondary }}
        >
          Lugar de la boda
        </h3>
        <p className="text-gray-600 mb-4">
          La ceremonia y la celebración tendrán lugar en un entorno especial que
          hemos elegido con mucho cariño para compartir este día inolvidable con
          nuestros seres queridos. Puedes consultar la ubicación exacta en el
          siguiente enlace:
        </p>
        <a
          href={url}
          target="_blank"
          className=" text-white py-2 px-6 rounded-full  transition duration-300"
          style={{ backgroundColor: colores.secondary }}
        >
          Ver en Maps
        </a>
      </section>
    </div>
  );
};

export default Lugar;
