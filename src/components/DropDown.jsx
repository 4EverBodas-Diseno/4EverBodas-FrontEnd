import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
const DropDown = (props) => {
  const { data, Component, seleccionado, setSeleccionado, seleccionar } = props;
  const [active, setActive] = useState(false);
  return (
    <div id="dropdown" className="w-64 relative">
      <p className="text-gray-500 text-xs mb-2">{seleccionar}</p>
      <button
        id="dropdown-btn"
        className="p-2 w-full bg-white shadow-xl font-semibold text-gray-500 flex items-center justify-between cursor-pointer rounded-lg"
        onClick={() => setActive(!active)}
      >
        {Component(seleccionado)}
        <ChevronDownIcon
          className={`w-5 h-5 ${
            active && "transform rotate-180"
          } transition duration-300 ease-in-out`}
        />
      </button>
      {active && (
        <div
          id="dropdown-content"
          className="absolute bg-white top-[110%] shadow-md w-full z-30"
        >
          {data.map((item) => (
            <button
              key={item.id}
              id="dropdown-item"
              className="block p-3 hover:bg-gray-100 cursor-pointer w-full text-left"
              onClick={() => {
                setSeleccionado(item);
                setActive(false);
              }}
            >
              {Component(item)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
