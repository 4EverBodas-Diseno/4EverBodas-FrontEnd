import React from "react";

const Table = ({ guests }) => {
  console.log(guests);

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="border-b-[1px] border-slate-200">
          <th className="px-4 py-2 text-left">Invitados</th>
          <th className="px-4 py-2 text-left">WhatsApp</th>
          <th className="px-4 py-2 text-left">Acompañantes</th>
          <th className="px-4 py-2 text-left">Estado</th>
          <th className="px-4 py-2 text-left"></th>
        </tr>
      </thead>
      <tbody>
        {guests.lenght !== 0 ? (
          <div>
            <h1>No hay invitados</h1>
          </div>
        ) : (
          guests.map((guest) => (
            <tr key={guest.GuestID} className="bg-white">
              <td className="px-4 py-2">
                <input type="checkbox" className="mr-2" />
                {guest.Nombre}
              </td>
              <td className="px-4 py-2">{guest.Telefono}</td>
              <td className="px-4 py-2">{guest.numAcompanantes}</td>
              <td className="px-4 py-2">
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
                  Por confirmar{" "}
                </span>
              </td>
              <td className="px-4 py-2 text-pink-500">
                Invitación personalizada
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
