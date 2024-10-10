import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const SignOut = () => {
  const { setAuth } = useContext(AuthContext);

  function signOut() {
    setAuth(null);
    // eliminate the user from the local storage
    localStorage.removeItem("auth");
  }
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 rounded-lg bg-slate-600 text-white"
    >
      Sign out
    </button>
  );
};

export default SignOut;
