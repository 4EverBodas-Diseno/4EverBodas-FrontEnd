import React from "react";
import { GoogleCalendarLink } from "../../utils/formats";
const Hero = ({ pareja, fecha, colores }) => {
  console.log(colores);

  return (
    <section className="flex md:flex-row h-[500px] justify-between ">
      <div
        className="text-center  md:text-left md:w-1/2 px-5  text-white py-10 h-full flex flex-col justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${colores.primary}, ${colores.secondary})`,
        }}
      >
        <div className="flex flex-col px-20 gap-2">
          <h2 className="text-5xl font-bold mb-4">{pareja}</h2>
          <p className="mb-6">
            Con amor y alegría, les invitamos a celebrar nuestro día especial.
            Acompáñanos a compartir este momento único en nuestras vidas...
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href={GoogleCalendarLink(fecha, pareja)}
              target="_blank"
              className="bg-white  px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
              style={{ color: colores.secondary }}
            >
              Agendar boda
            </a>
            {/*  <button className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-500">
                Confirmar mi asistencia
              </button> */}
          </div>
        </div>
      </div>

      <div className="md:w-1/2 mt-8 md:mt-0 h-full  overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Imagen boda"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
