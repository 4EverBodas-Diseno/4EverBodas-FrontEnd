import React from "react";
import {
  FormatearFecha,
  CalcularDiferencia,
  GoogleCalendarLink,
} from "../../utils/formats";
const Date = ({ fecha, nombrePareja, colores }) => {
  return (
    <div className="bg-white rounded-lg p-8 text-center">
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: colores.secondary }}
      >
        Nos casamos el {FormatearFecha(fecha)}
      </h2>
      <div className="flex justify-center space-x-4 text-center mb-6">
        <div>
          <p className="text-5xl font-bold" style={{ color: colores.primary }}>
            {CalcularDiferencia(fecha).meses}
          </p>
          <p className="text-lg" style={{ color: colores.primary }}>
            meses
          </p>
        </div>
        <div>
          <p className="text-5xl font-bold" style={{ color: colores.primary }}>
            {CalcularDiferencia(fecha).semanas}
          </p>
          <p className="text-lg" style={{ color: colores.primary }}>
            semanas
          </p>
        </div>
        <div>
          <p className="text-5xl font-bold" style={{ color: colores.primary }}>
            {CalcularDiferencia(fecha).dias}
          </p>
          <p className="text-lg" style={{ color: colores.primary }}>
            días
          </p>
        </div>
      </div>
      <p className="text-gray-600 mb-4">
        Estaremos muy contentos de que puedas celebrar junto a nosotros esta
        fecha tan importante, no olvides agendarlo y agregarlo en tus
        pendientes. Queremos que la pases bien a nuestro lado{" "}
        <span aria-label="emoji">😊</span>
      </p>
      <a
        href={GoogleCalendarLink(fecha, nombrePareja)}
        target="_blank"
        className=" text-white py-2 px-6 rounded-full transition duration-300"
        style={{ backgroundColor: colores.secondary }}
      >
        Agendar boda
      </a>
    </div>
  );
};

export default Date;
