import React from "react";
import Principal from "../invitacion/Principal";
const Template = ({ webPage }) => {
  return (
    <div
      className="w-full shadow-xl rounded-xl"
      style={{ fontFamily: webPage.tipografia.name }}
    >
      <Principal webPage={webPage} />
    </div>
  );
};

export default Template;
