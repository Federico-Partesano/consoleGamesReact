import React, { useState, useEffect, useRef } from "react";
import "../css/App.css";

const Buttons = () => {
  const refSpan = useRef(null);
  const [styleBody, setStyleBody] = useState("white");
  const [styleSpan, setStyleSpan] = useState("#000000");

  const changeBackgroundColor = (color) => setStyleBody(color);

  useEffect(() => {
    document.body.style.backgroundColor = styleBody;
    if (styleBody === "white") {
      setStyleSpan("#000000");
    } else {
      setStyleSpan("#ffffff");
    }
  }, [styleBody]);

  // map per i button dei colori
  return (
    <div className="div-buttons" style={{ marginBottom: 20 }}>
      <span ref={refSpan} style={{ color: styleSpan, marginRight: 40 }}>
        Colore Sfondo:{" "}
      </span>
      <button
        style={{ backgroundColor: "white", paddingRight: 40, marginRight: 10 }}
        onClick={() => changeBackgroundColor("white")}
      ></button>
      <button
        style={{ backgroundColor: "red", paddingRight: 40, marginRight: 10 }}
        onClick={() => changeBackgroundColor("red")}
      ></button>
      <button
        style={{ backgroundColor: "brown", paddingRight: 40, marginRight: 10 }}
        onClick={() => changeBackgroundColor("brown")}
      ></button>
      <button
        style={{ backgroundColor: "green", paddingRight: 40, marginRight: 10 }}
        onClick={() => changeBackgroundColor("green")}
      ></button>
      <button
        style={{
          backgroundColor: "#282c34",
          paddingRight: 40,
          marginRight: 10,
        }}
        onClick={() => changeBackgroundColor("#282c34")}
      ></button>
    </div>
  );
};

export default Buttons;
