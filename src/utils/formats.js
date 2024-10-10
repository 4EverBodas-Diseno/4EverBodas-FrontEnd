function GoogleCalendarLink(date, nombrePareja) {
  const eventDate = new Date(date);

  // Ajustar la fecha para que sea de 8:00 AM a 10:00 PM en UTC
  // Para convertir a UTC, se suman 5 horas a la hora local
  const startDate = new Date(eventDate);
  startDate.setUTCHours(8 + 5, 0, 0); // 8 AM Lima es 1 PM UTC

  const endDate = new Date(eventDate);
  endDate.setUTCHours(22 + 5, 0, 0); // 10 PM Lima es 3 AM UTC del día siguiente

  // Formatear las fechas en el formato que Google Calendar entiende
  const startFormatted = startDate.toISOString().replace(/-|:|\.\d+/g, "");
  const endFormatted = endDate.toISOString().replace(/-|:|\.\d+/g, "");

  // Crear el enlace de Google Calendar
  const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Boda de ${nombrePareja.toLowerCase()}`
  )}&dates=${startFormatted}/${endFormatted}`;

  return calendarLink;
}

function FormatearPareja(nombrePareja) {
  return nombrePareja
    .normalize("NFD") // Normaliza la cadena para separar los acentos
    .replace(/[\u0300-\u036f]/g, "") // Elimina los caracteres con tilde
    .replace(/ /g, "-") // Reemplaza los espacios por guiones
    .toLowerCase(); // Convierte todo a minúsculas;
}

function FormatearInicialesPareja(nombrePareja) {
  const names = nombrePareja.split(" ");

  // Obtener las iniciales de cada parte
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
  initials.slice(0, 2);
  const newString = initials.slice(0, 1) + initials.slice(1 + 1);
  return newString;
}

// Función para formatear la fecha
const FormatearFecha = (fechaString) => {
  const fecha = new Date(fechaString);
  const opciones = { day: "2-digit", month: "long", year: "numeric" };
  return fecha.toLocaleDateString("es-ES", opciones);
};

// Función para calcular la diferencia en meses, semanas y días
const CalcularDiferencia = (fechaString) => {
  const ahora = new Date();
  const fecha = new Date(fechaString);
  let diferenciaMeses =
    fecha.getFullYear() * 12 +
    fecha.getMonth() -
    (ahora.getFullYear() * 12 + ahora.getMonth());
  let diferenciaDias = fecha.getDate() - ahora.getDate();

  // Ajustar los días si es necesario
  if (diferenciaDias < 0) {
    diferenciaMeses--;
    const diasDelMesAnterior = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      0
    ).getDate();
    diferenciaDias += diasDelMesAnterior;
  }

  // Convertir meses a semanas y ajustar días
  const semanas = Math.floor(diferenciaDias / 7);
  diferenciaDias = diferenciaDias % 7;

  // Ajustar meses y semanas si es negativo
  if (diferenciaMeses < 0) {
    return {
      meses: "00",
      semanas: "00",
      dias: "00",
    };
  }

  return {
    meses: String(diferenciaMeses).padStart(2, "0"),
    semanas: String(semanas).padStart(2, "0"),
    dias: String(diferenciaDias).padStart(2, "0"),
  };
};

// Exportar las funciones
export {
  GoogleCalendarLink,
  FormatearPareja,
  FormatearInicialesPareja,
  FormatearFecha,
  CalcularDiferencia,
};
