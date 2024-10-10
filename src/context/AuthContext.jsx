import React, { useState, createContext } from "react";
const initialAuth = null;

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth);
  const data = { auth, setAuth };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
