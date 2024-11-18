import React, { useState, useEffect } from "react";
import InputField from "./InputAgregarInvitado";
const PopUpAgregarInvitado = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    Nombre: "",
    Apellido: "",
    Telefono: "",
    Correo: "",
    numMaxAcompanantes: "",
  });

  useEffect(() => {
    // Si se pasa `initialData`, llena el formulario
    if (initialData) {
      console.log(initialData);
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones
    if (!formData.Nombre.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }

    if (!formData.Apellido.trim()) {
      alert("Los apellidos son obligatorios.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Correo)) {
      alert("El correo electrónico no es válido.");
      return;
    }

    if (!formData.numMaxAcompanantes || formData.numMaxAcompanantes <= 0) {
      alert("El número máximo de acompañantes debe ser mayor a 0.");
      return;
    }

    onSave(formData);
    onClose();
  };
  return (
    //form to add a new guest
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-extrabold text-center text-primary-100 text-gray-800 mb-6">
            Agregar Invitado
          </h2>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Nombre"
              id="Nombre"
              name="Nombre"
              type="text"
              value={formData.Nombre}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Apellidos"
              id="Apellido"
              name="Apellido"
              type="text"
              value={formData.Apellido}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Número de Teléfono"
              id="Telefono"
              name="Telefono"
              type="text"
              value={formData.Telefono}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Correo Electrónico"
              id="Correo"
              name="Correo"
              type="Correo"
              value={formData.Correo}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Número Máximo de Acompañantes"
              id="numMaxAcompanantes"
              name="numMaxAcompanantes"
              type="number"
              value={formData.numMaxAcompanantes}
              onChange={handleInputChange}
              required
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PopUpAgregarInvitado;
