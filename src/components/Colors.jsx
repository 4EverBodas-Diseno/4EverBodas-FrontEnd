import React from "react";

const Colors = ({ data }) => {
  return (
    <div className="flex gap-2">
      <div
        className="w-8 h-5 shadow-md rounded-sm"
        style={{ backgroundColor: data.primary }}
      ></div>
      <div
        className="w-8 h-5 shadow-md rounded-sm"
        style={{ backgroundColor: data.secondary }}
      ></div>
    </div>
  );
};

export default Colors;
