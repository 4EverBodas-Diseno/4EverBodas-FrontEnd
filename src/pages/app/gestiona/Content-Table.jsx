import { ClipboardIcon } from "@heroicons/react/24/outline";
import React, { memo } from "react";
import { copyToClipboard, generarMensajeWhatsApp } from "../../../utils/extra";

const Styles = (text) => {
  if (text === "Por confirmar") {
    return "bg-gray-200 text-gray-600";
  }
  if (text === "Asistirá") {
    return "bg-green-200 text-green-600";
  }

  if (text === "No Asistirá") {
    return "bg-red-200 text-red-600";
  }
};

const ContentTable = memo(({ guest, isSelected, onSelect }) => {
  return (
    <tr className="bg-white">
      <td className="py-2">
        <input
          type="checkbox"
          value={isSelected}
          onChange={onSelect}
          className="mr-1"
          checked={isSelected}
        />
      </td>
      <td className="px-4 py-2">
        {guest.Nombre} {guest.Apellido}
      </td>
      <td className="px-4 py-2">{guest.Telefono}</td>
      <td className="px-4 py-2">
        {guest.numAcompanantes}/{guest.numMaxAcompanantes}
        <span className="text-xs">max</span>
      </td>
      <td className="px-4 py-2">
        <span
          className={`${Styles(
            guest.EstadoInvitacion
          )} px-2 py-1 rounded-full text-sm`}
        >
          {guest.EstadoInvitacion}
        </span>
      </td>
      <td className="px-4 py-2 text-primary-100 text-xs">
        <buttton
          onClick={() =>
            copyToClipboard(
              import.meta.env.VITE_URL_FRONTEND +
                "/confirmacion/" +
                guest.GuestID
            )
          }
          className="flex items-center gap-1 cursor-pointer"
        >
          <ClipboardIcon className="h-4 w-4 cursor-pointer" />
          <p>Copiar link de invitación</p>
        </buttton>
      </td>
      <td className="px-4 py-2">
        <a
          className="border border-green-500 text-green-500 px-4 py-2 rounded-full font-semibold hover:bg-green-100 text-xs"
          target="_blank"
          href={generarMensajeWhatsApp(guest)}
        >
          Enviar por WhatsApp
        </a>
      </td>
    </tr>
  );
});

export default ContentTable;
