import React, { useEffect /*, useLayoutEffect*/ } from "react";

import Aos from "aos";
import "aos/dist/aos.css";
import { arrayTest, array, images } from "./resourceMenu";
import { Link } from "react-router-dom";
import "../css/App.css";

export const GameSelector = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        placeItems: "center",
        justifyContent: "center",
        flexDirection: "column",

        maxWidth: 900,
        // backgroundColor: "#15324c",
        marginBottom: 20,
      }}
    >
      {array.map((name, index) => (
        <div
          key={index}
          style={{ display: "flex", flexDirection: arrayTest[name].flex }}
        >
          <Link to={"/" + name}>
            <img
              data-aos={arrayTest[name].animation}
              key={index}
              src={images[name]}
              style={{
                padding: 50,
                backgroundColor: "white",
                cursor: "grab",
                minWidth: 408,
              }}
              width="400"
              alt="snake"
            />
          </Link>

          <div
            data-aos={arrayTest[name].animationText}
            style={{
              padding: 50,
              backgroundColor: "white",
            }}
          >
            <h3 className="center" style={{ color: "black" }}>
              {arrayTest[name].title}
            </h3>
            <p style={{ color: "black" }}>{arrayTest[name].description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
