export const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Texto copiado al portapapeles:", text);
      alert("Texto copiado al portapapeles"); // Mensaje de éxito (puedes personalizarlo)
    })
    .catch((err) => {
      console.error("Error al copiar el texto:", err);
      alert("Error al copiar el texto");
    });
};

export function generarMensajeWhatsApp(guest) {
  const urlInvitacion = `${import.meta.env.VITE_URL_FRONTEND}/invitacion/${
    guest.UserID
  }`;
  const urlConfirmacion = `${import.meta.env.VITE_URL_FRONTEND}/confirmacion/${
    guest.GuestID
  }`;

  const mensaje = `Hola, ${guest.Nombre}.\n\n ¡Nos encantaría que seas parte de este momento especial! Puedes ver nuestra boda aquí:\n${urlInvitacion}\n\n Y confirmar tu asistencia aquí:\n${urlConfirmacion}\n\n¡Esperamos verte allí!`;

  return `https://wa.me/51${guest.Telefono}?text=${encodeURIComponent(
    mensaje
  )}`;
}
