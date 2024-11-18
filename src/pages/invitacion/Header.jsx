import React from "react";
import { FormatearInicialesPareja } from "../../utils/formats";

const Header = ({ pareja }) => {
  return (
    <header className="flex justify-between items-center py-4 px-8">
      <section className="flex-1 text-left">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#Historia" className="hover:underline">
                Historia
              </a>
            </li>
          </ul>
        </nav>
      </section>

      <section className="text-center flex-1">
        <h1 className="text-2xl font-bold font-playfair">
          {FormatearInicialesPareja(pareja)}
        </h1>
      </section>

      <section className="flex-1 text-right">
        <nav>
          <ul className="flex space-x-4 justify-end">
            <li>
              <a href="#Fecha" className="hover:underline">
                Fecha
              </a>
            </li>
            <li>
              <a href="#Lugar" className="hover:underline">
                Lugar
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
