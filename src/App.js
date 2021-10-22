import React, { useState } from "react";
//import ReactDOM from 'react-dom';
import "./css/index.css";
import Buttons from "./menu/buttons";
import Menu from "./menu/menu";
import Header from "./components/header";
import { BrowserRouter as Router } from "react-router-dom";

// serve a prendere elemetnti dello store, senza poter modificarli, come un get, useDespatch serve invece a modificarli

function App() {
  const [choice, setChoice] = useState("none");

  return (
    <Router>
      <div>
        <Header callback={setChoice} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Menu callback={setChoice} mychoice={choice} />
        </div>
        <Buttons />
      </div>
    </Router>
  );
}

export default App;
