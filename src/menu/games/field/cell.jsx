import React from "react";
import "../../../css/Game.css";

const Cell = ({ show, size, x, y, callback }) => {
  return (
    <div
      className="cell"
      onClick={() => callback(x, y)}
      style={{
        width: size,
        backgroundSize: size,
        top: x * size,
        left: y * size,
        height: size,
        position: "absolute",
        border: "1px solid black",
        backgroundImage: `url(${show})`,
      }}
    ></div>
  );
};
export default Cell;
