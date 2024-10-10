import React from "react";

const Invitation = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center font-manrope"
      style={{
        backgroundImage: `url('/texture.png')`,
      }}
    >
      <header>
        <div className="bg-blue-500 text-white p-5 h-20 text-center relative flex items-center">
          <h2 className="text-xl font-bold absolute left-0 ml-8">
            Hola, Nombre de usuario
          </h2>
          <p className="text-sm absolute right-0 mr-8">Déjanos un mensaje</p>
        </div>
      </header>

      <main>
        <div
          className="max-w-4xl  mx-auto my-10 p-5 bg-white border border-gray-300 shadow-lg bg-cover bg-center relative"
          style={{ backgroundImage: `url('/flowers-corners.png')` }}
        >
          <header className="text-center">
            <h2 className="text-blue-500 text-5xl font-playfair mb-4">
              Ale y Uziel
            </h2>
            <h5 className="text-base">Requerimos el placer de tu compañía</h5>
            <h3 className="text-lg mt-2">
              Agosto 15, 2024 Sunset Beach Resort
            </h3>
          </header>

          <form id="invitation-form" className="mt-5">
            <hr className="my-4" />
            <div className="text-center text-2xl mb-5">
              <label htmlFor="attendance">¿Contaremos con tu presencia?</label>
            </div>

            <div className="flex justify-center my-5">
              <div className="relative mr-5">
                <input
                  type="radio"
                  id="yes"
                  name="attendance"
                  value="yes"
                  className="absolute opacity-0"
                />
                <div className="bg-gray-300 p-3 rounded-lg w-44 text-center cursor-pointer hover:bg-blue-500 hover:text-white transition-colors">
                  <label htmlFor="yes">Sí</label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="radio"
                  id="no"
                  name="attendance"
                  value="no"
                  className="absolute opacity-0"
                />
                <div className="bg-gray-300 p-3 rounded-lg w-44 text-center cursor-pointer hover:bg-blue-500 hover:text-white transition-colors">
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <input
                type="number"
                placeholder="Número de acompañantes:"
                id="guests"
                name="guests"
                min="0"
                className="bg-gray-300 p-4 rounded-lg w-96 text-center mb-5"
              />
            </div>

            <button
              type="submit"
              id="send"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg mx-auto block hover:bg-blue-600 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Invitation;
