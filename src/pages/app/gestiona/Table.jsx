import React from "react";
import ContentTable from "./Content-Table";

const Table = ({ guests, isGuestSelected, handleSelect }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="border-b-[1px] border-slate-200">
          <th className="px-0 py-2 text-left"></th>
          <th className="px-4 py-2 text-left">Invitados</th>
          <th className="px-4 py-2 text-left">WhatsApp</th>
          <th className="px-4 py-2 text-left">Acompañantes</th>
          <th className="px-4 py-2 text-left">Estado</th>
          <th className="px-4 py-2 text-left"></th>
        </tr>
      </thead>
      {guests.lenght === 0 ? (
        <tbody>
          <tr>
            <td>No hay invitados</td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {guests.map((guest) => (
            <ContentTable
              key={guest.GuestID}
              guest={guest}
              isSelected={isGuestSelected(guest.GuestID)}
              onSelect={() => handleSelect(guest.GuestID)}
            />
          ))}
        </tbody>
      )}
    </table>
  );
};

export default Table;
