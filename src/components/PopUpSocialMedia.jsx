import React from "react";

const PopUpSocialMedia = ({ onClose, shareLink }) => {
  return (
    <>
      {/* Fondo Oscuro */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>

      {/* Contenedor del Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            Compartir
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Copia y comparte el enlace o utiliza las opciones de abajo.
          </p>

          {/* Campo para copiar el enlace */}
          <div className="flex items-center justify-between border p-2 rounded-lg mb-4 gap-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 text-gray-700 outline-none"
            />
            <button
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="text-pink-500 font-bold hover:underline"
            >
              Copiar
            </button>
          </div>

          {/* Botones para compartir en redes */}
          <div className="flex justify-around">
            <button
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?quote=Hola%20que%20tal`,
                  "_blank"
                )
              }
              className="text-pink-500 text-lg hover:text-pink-700"
            >
              Facebook
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=%C2%A1Estoy%20muy%20feliz!%20%F0%9F%8E%89%20Me%20voy%20a%20casar%20y%20quiero%20compartir%20mi%20p%C3%A1gina%20web%20que%20hice%20en%204EverBodas.%20%E2%9D%A4%EF%B8%8F%20%C2%A1%C3%89chenle%20un%20vistazo%20aqu%C3%AD!%20${shareLink}`,
                  "_blank"
                )
              }
              className="text-pink-500 text-lg hover:text-pink-700"
            >
              Twitter
            </button>
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
};

export default PopUpSocialMedia;
