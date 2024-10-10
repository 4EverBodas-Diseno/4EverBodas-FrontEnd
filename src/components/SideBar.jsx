import React from "react";
import {
  HomeIcon,
  HeartIcon,
  UserGroupIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import SignOut from "./SignOut";

const navItems = [
  {
    path: "/inicio",
    text: "Inicio",
    icon: <HomeIcon className="size-5" />,
  },
  {
    path: "/mi-boda",
    text: "Mi boda",
    icon: <HeartIcon className="size-5" />,
  },
  {
    path: "/invitados",
    text: "Invitados",
    icon: <UserGroupIcon className="size-5" />,
  },
];

const styles = {
  activeClass: "bg-primary-200 text-white font-bold",
  inactiveClass: "text-secondary-100",
};

const SideBar = () => {
  const location = useLocation();
  return (
    <aside className="py-2 px-5 w-72 bg-slate-50 h-screen flex flex-col fixed">
      <img className="w-16 mx-auto mb-3" src="/icono.png" alt="4Everbodas" />
      <section className="border-b-[1px] border-b-primary-100 mb-5">
        <h3 className="text-primary-100 tracking-widest text-sm font-light">
          MENU
        </h3>
      </section>
      <nav className="flex flex-col justify-between flex-1">
        <ul className="flex flex-col gap-2 text-secondary-100">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 gap-5 rounded-full ${
                  location.pathname === item.path
                    ? styles.activeClass
                    : styles.inactiveClass
                }`}
              >
                {item.icon}
                <p>{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-secondary-100">
          <li>
            <Link
              to="/perfil"
              className={`flex items-center px-4 py-3 gap-5 rounded-xl ${
                location.pathname === "/perfil" ? "bg-slate-200" : ""
              }`}
            >
              <UserCircleIcon className="size-5" />
              <p>Perfil</p>
            </Link>
          </li>
          <li>
            <Link to="/ayuda" className="flex items-center px-4 py-3 gap-5">
              <Cog6ToothIcon className="size-5" />
              <p>¿Necesitas ayuda?</p>
            </Link>
          </li>
          <li className="w-full ">
            <SignOut />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
