import React, { useState, useEffect, useRef } from "react";
//import gandalf from "./../../../images/memory/gandalf.jpg";
import { Modal, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

// serve a prendere elemetnti dello store, senza poter modificarli, come un get, useDespatch serve invece a modificarli
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "../../../actions/fetchs";

let limit = 20;
let distancePixelForChangeSlide = 60;

var Cube2 = function () {
  // eslint-disable-next-line
  const [currentSpritePokemon, setcurrentSpritePokemon] = useState({});
  const [mouseDownX, setMouseDownX] = useState(1);
  const [mouseUpX, setMouseUpX] = useState(1);
  // const [indexSearchByName, setIndexSearchByName] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [show, setShow] = useState(false);
  const carousel = useRef(null);
  // ----------------------------//
  const pokemons = useSelector((state) => state.reducerPokemon);

  const dispatch = useDispatch();

  // ----------------------------//
  console.log("pokemons:", pokemons);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //var carousel = document.querySelector(".carousel");
  const cells = useRef([]);
  var cellCount; // cellCount set from cells-range input value
  const [selectedIndex, setSelectedIndex] = useState(0);
  let isHorizontal = true;
  let rotateFn = isHorizontal ? "rotateY" : "rotateX";
  let radius, theta;

  // console.log( cellWidth, cellHeight );

  const prevButton = () => {
    if (selectedIndex === 0) {
      setSelectedIndex(pokemons.length - 1);
    } else {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const nextButton = () => {
    setSelectedIndex(selectedIndex + 1);
  };

  const mouseDown = (e) => {
    setMouseDownX(e.nativeEvent.offsetX);
  };
  const mouseUp = (e) => {
    console.log("mouseX:", e.nativeEvent.offsetX);
    setMouseUpX(e.nativeEvent.offsetX);
  };

  const inputChangeHandler = (e) => setUserInput(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    let index = pokemons.findIndex(
      (singlePokemon) => singlePokemon.name === userInput
    );
    if (index < 0) {
      return;
    } else {
      setSelectedIndex(index);
    }
  };

  // var cellsRange = document.querySelector(".cells-range");
  // cellsRange.addEventListener("change", changeCarousel);
  //cellsRange.addEventListener("input", changeCarousel);
  function rotateCarousel() {
    let angle = theta * selectedIndex * -1;
    carousel.current.style.transform =
      "translateZ(" + -radius + "px) " + rotateFn + "(" + angle + "deg)";
  }

  function changeCarousel() {
    let cellWidth = carousel.current.offsetWidth;
    let cellHeight = carousel.current.offsetHeight;
    cellCount = cells.current.length;
    theta = 360 / cellCount;
    var cellSize = isHorizontal ? cellWidth : cellHeight;
    radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellCount));
    for (var i = 0; i < cells.current.length; i++) {
      let cell = cells.current[i];
      /*  if (cell === null || cell === undefined) {
        continue;
      }*/
      if (i < cellCount) {
        // visible cell

        cell.style.opacity = 1;
        let cellAngle = theta * i;
        cell.style.transform =
          rotateFn + "(" + cellAngle + "deg) translateZ(" + radius + "px)";
      } else {
        // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = "none";
      }
    }

    rotateCarousel();
  }

  /*var orientationRadios = document.querySelectorAll(
    'input[name="orientation"]'
  );
  (function () {
    for (var i = 0; i < orientationRadios.length; i++) {
      var radio = orientationRadios[i];
      radio.addEventListener("change", onOrientationChange);
    }
  })();

function onOrientationChange() {
    var checkedRadio = document.querySelector(
      'input[name="orientation"]:checked'
    );
    isHorizontal = checkedRadio.value == "horizontal";
    rotateFn = isHorizontal ? "rotateY" : "rotateX";
    changeCarousel();
  } */

  // set initials

  const moveSlideByMouse = () => {
    if (mouseDownX - mouseUpX < -distancePixelForChangeSlide) {
      setMouseDownX(1);
      setMouseUpX(1);
      prevButton();
    } else if (mouseDownX - mouseUpX > distancePixelForChangeSlide) {
      setMouseDownX(1);
      setMouseUpX(1);
      nextButton();
    }
  };
  useEffect(() => {
    if (!carousel.current || !cells.current || pokemons.length > limit) {
      return;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!carousel.current || pokemons.length > limit) {
      return;
    }

    moveSlideByMouse();

    if (selectedIndex > pokemons.length - 2) {
      limit += 20;
    }

    dispatch(fetchPokemons(limit));

    changeCarousel();
    // eslint-disable-next-line
  }, [selectedIndex, mouseUpX, cells]);

  return (
    <>
      <Link to="/pokemon2">
        <Button style={{ marginRight: 10 }} variant="primary">
          Visione a griglia
        </Button>
      </Link>
      <div className="scene">
        <div ref={carousel} className="carousel">
          {pokemons.map((element, ind) => {
            let displayElement;
            if (!(ind <= selectedIndex + 5 && ind >= selectedIndex - 5)) {
              displayElement = "none";
            } else {
              displayElement = "inherit";
            }
            return (
              <div
                key={ind}
                ref={(cell) => (cells.current[ind] = cell)}
                className="carousel__cell"
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                style={{ display: displayElement }}
              >
                <img
                  onClick={handleShow}
                  alt=""
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    ind + 1
                  }.png`}
                  style={{ width: 150, height: 150, userSelect: "none" }}
                />
                <p style={{ fontSize: 15, marginTop: -40, userSelect: "none" }}>
                  {" "}
                  {element.name}{" "}
                </p>
                <p
                  style={{
                    fontSize: 15,
                    marginTop: -115,
                    color: "black",
                    userSelect: "none",
                  }}
                >
                  {" "}
                  {ind}{" "}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="carousel-options">
        <form onSubmit={submitHandler}>
          <label>
            Cerca per nome
            <input value={userInput} onChange={inputChangeHandler} />
            <input type="submit" value="Submit" />
          </label>
        </form>

        <p>
          <button onClick={prevButton} className="previous-button">
            Previous
          </button>
          <button onClick={nextButton} className="next-button">
            Next
          </button>
          <button className="next-button">Add</button>
        </p>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="center"> {currentSpritePokemon.name}</h4>
          <p>
            <span style={{ fontWeight: "bold" }}>Altezza:</span>
            {currentSpritePokemon.height}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Larghezza:</span>
            {currentSpritePokemon.weight}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Esperienza di base: </span>
            {currentSpritePokemon.base_experience}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cube2;
