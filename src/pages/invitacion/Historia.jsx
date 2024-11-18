import React from "react";
import { Link } from "react-router-dom";

const Historia = ({ description, colores }) => {
  return (
    <section
      id="Historia"
      className=" flex gap-5 mx-auto items-center justify-between "
    >
      <div className="w-[450px]">
        <h2
          className="text-2xl font-extrabold"
          style={{
            color: colores.secondary,
          }}
        >
          Nuestra historia
        </h2>
        <p className="mt-5">
          {description === "" ? (
            <Link to={"/mi-boda"} className="font-semibold text-sm underline">
              Escribe una emocionante historia dando click aquí...
            </Link>
          ) : (
            description
          )}
        </p>
      </div>
      <img
        className="h-80 rounded-2xl shadow-xl"
        src="/historia.jpg"
        alt="Imagen historia bodas"
      />
    </section>
  );
};

export default Historia;
