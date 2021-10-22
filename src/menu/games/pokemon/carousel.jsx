import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import { Modal, Button } from "react-bootstrap";
// eslint-disable-next-line
import gandalf from "./../../../images/memory/gandalf.jpg";

import { fetchPokemons, fetchSelectedPokemon } from "../../../actions/fetchs";
let carouselStyle = { width: 250, height: 300, zIndex: 0 };
let swipeWidth = 1;
let limit = 20;

var Cube = function ({
  link,
  background,
  mraid,
  // assets,
  //carouselStyle,
  //swipeWidth,
  isLocatorActive,
  locator,
  //animationDelay,
}) {
  //const pokemons = useSelector((state) => state.reducerPokemon);
  const pokemons = useSelector((state) => state.setPokemonsReducer);
  const selectedPokemon = useSelector(
    (state) => state.selectedPokemonSliceReducer
  );

  const dispatch = useDispatch();
  //const [map, setMap] = useState(false);
  //const [markers, setMarkers] = useState();
  // eslint-disable-next-line
  const [interacted, setInteracted] = useState(false);
  const [index, setIndex] = useState(0);
  const [clicked, setclicked] = useState(false);
  const [isTouch, setisTouch] = useState(false);
  const [startPress, setstartPress] = useState(0);

  useEffect(() => {
    if (index > pokemons.length - 2) {
      limit += 20;
      dispatch(fetchPokemons(limit));
    }
    dispatch(fetchSelectedPokemon(index + 1));
    // eslint-disable-next-line
  }, [index]);

  useEffect(() => {
    if (selectedPokemon.name) {
      setIndex(selectedPokemon.id - 1);
    }
    if (pokemons.length < limit) {
      dispatch(fetchSelectedPokemon(index + 1));
      dispatch(fetchPokemons(limit));
    }
    // eslint-disable-next-line
  }, []);

  const tz = Math.round(
    carouselStyle.width / 2 / Math.tan(Math.PI / pokemons.length)
  );

  const basicAngle = 360 / pokemons.length;
  useEffect(() => {
    clicked &&
      setTimeout(() => {
        setclicked(false);
      }, 250);
  }, [clicked]);

  // const rotateCarouselX = () => {setIndex(index+1);setAngleX((360/4) * index * -1)}
  const handleStartAction = (e) => {
    setInteracted(true);

    setstartPress({ x: e.clientX, y: e.clientY });
  };

  const handleSwipeOrPress = (e) => {
    if (e.clientX - startPress.x > swipeWidth) setIndex(index - 1);
    else if (e.clientX - startPress.x < -swipeWidth) setIndex(index + 1);
    else setclicked(true);
  };

  return (
    <>
      <Link to="/pokemon2">
        <Button style={{ marginRight: 10 }} variant="primary">
          Visione a griglia
        </Button>
      </Link>
      <div
        style={{
          width: carouselStyle.width,
          height: carouselStyle.height,
          zIndex: carouselStyle.zIndex,

          transform: `translateZ(-${tz}px) rotateY(${
            (360 / pokemons.length) * index * -1
          }deg)`,
          WebkitTransform: `translateZ(-${tz}px) rotateY(${
            (360 / pokemons.length) * index * -1
          }deg)`,
          MozTransform: `translateZ(-${tz}px) rotateY(${
            (360 / pokemons.length) * index * -1
          }deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 1s",
        }}
      >
        {
          /* {!map &&
        pokemons && */
          pokemons.map((item, ind) => {
            let displayElement;
            if (!(ind <= index + 3 && ind >= index - 3)) {
              displayElement = "none";
            } else {
              displayElement = "inherit";
            }

            return (
              <div
                key={ind}
                style={{
                  display: displayElement,
                  userSelect: "none",
                  transform: `rotateY(${
                    basicAngle * ind
                  }deg) translateZ(${tz}px)`,
                  WebkitTransform: `rotateY(${
                    basicAngle * ind
                  }deg) translateZ(${tz}px)`,
                  width: carouselStyle.width,
                  height: carouselStyle.height,
                  backgroundColor: "white",
                  position: "absolute",
                  border: "1px solid black",
                  top: 0,
                  left: 0,
                  zIndex: 10005,
                }}
              >
                <div
                  onMouseDown={(e) => !isTouch && handleStartAction(e)}
                  onTouchStart={(e) => {
                    setisTouch(true);
                    handleStartAction(e.changedTouches[0]);
                  }}
                  onMouseUp={(e) => {
                    !isTouch && handleSwipeOrPress(e);
                  }}
                  onTouchEnd={(e) => handleSwipeOrPress(e.changedTouches[0])}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,

                    width: carouselStyle.width,
                    height: carouselStyle.height,
                    zIndex: 100050,
                  }}
                  // eventName={`swipe-${ind}`}
                />

                <img
                  alt="gandalf"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    ind + 1
                  }.png`}
                  style={{
                    userSelect: "none",
                    width: carouselStyle.width,
                    height: carouselStyle.height,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 10005,
                  }}
                />
                <h4>{item.name}</h4>
                <p>{ind}</p>
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default Cube;

// controll + k + c per commentare la parte selezionata
// controll + k + u per decommentare la parte selezionata
