import React, { useRef, useEffect } from "react";

import Canvas from "./games/pong/Canvas";
import Snake from "./games/snake/snake";
import Pacman from "./games/pacman/pacman";
import Memory from "./games/memory/memory";
import Field from "./games/field/field";
import P5 from "./games/gameBalls/gameBalls";
// eslint-disable-next-line

import { GameSelector } from "./GameSelector";
import Cube from "./games/pokemon/carousel";
// eslint-disable-next-line
import Cube2 from "./games/pokemon/carousel2";
import Cube3 from "./games/pokemon/pokemon3";
import { Switch, Route } from "react-router-dom";
import { gsap } from "gsap";
import "../css/carousel.css";
import "../css/App.css";

const Menu = ({ callback, mychoice }) => {
  const boxRef = useRef();
  const el = useRef();
  const q = gsap.utils.selector(el);

  useEffect(() => {
    gsap.to(q(".box2"), {
      x: 100,
      stagger: 0.33,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
    });

    gsap.to(boxRef.current, { rotation: "+=360" });
  });

  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/pong">
          <Canvas />
        </Route>

        <Route path="/field">
          <Field />
        </Route>

        <Route path="/P5">
          <P5 />
        </Route>
        <Route path="/memory">
          <Memory />
        </Route>

        <Route path="/snake">
          <Snake />
        </Route>
        <Route path="/pacman">
          <Pacman />
        </Route>
        <Route path="/pokemon">
          <Cube />
        </Route>
        <Route path="/pokemon2">
          <Cube3 />
        </Route>
        <Route path="/">
          <GameSelector />
        </Route>
      </Switch>
    </div>
  );
};

export default Menu;
