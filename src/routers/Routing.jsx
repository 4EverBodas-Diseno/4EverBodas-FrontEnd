import { Routes, Route, Navigate } from "react-router-dom";
//imports pages
import Login from "../pages/auth/InicioSesion";
import AuthGuard from "./AuthGuard";
import FirstGuard from "./FirstGuard";

import Registro from "../pages/auth/Registro";
import Encuesta from "../pages/app/encuesta";
import DashBoardPrincipal from "../pages/app";
import MiBoda from "../pages/app/informacion";
import Gestiona from "../pages/app/gestiona";
import Perfil from "../pages/app/perfil";
import Invitacion from "../pages/invitacion";
import Confirmacion from "../pages/confirmacion";
const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<>Not found</>} />
      <Route path="/" element={<Navigate to="/inicio" />} />
      <Route path="inicio-sesion" element={<Login />} />
      <Route path="registro" element={<Registro />} />
      <Route element={<AuthGuard />}>
        <Route path="encuesta" element={<Encuesta />} />
        <Route element={<FirstGuard />}>
          <Route path="inicio" element={<DashBoardPrincipal />} />
          <Route path="mi-boda" element={<MiBoda />} />
          <Route path="invitados" element={<Gestiona />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Route>
      {/* <Route path="perfil">
          <Route index element={<Perfil />} />
          </Route> */}
      {/* </Route> */}
      <Route path="invitacion/:idUser" element={<Invitacion />} />
      <Route path="confirmacion/:idConfirmacion" element={<Confirmacion />} />
    </Routes>
  );
};

export default Routing;
