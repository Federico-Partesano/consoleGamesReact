import React, { useState, useEffect } from "react";

//import { render } from "react-dom";
import { Link } from "react-router-dom";
import retro from "./../../../images/memory/retro.jpg";
import { statusRotation, settingLevels } from "./resources";
import "../../../css/Game.css";

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

let cards = [];

let firstChoice = "";
let secondChoice = "";

//------------------------------------------------------------//
const Memory = () => {
  const statusGames = {
    IN_GAME: 0,
    WINNER: 1,
    GAME_OVER: 2,
    CHOICE_LEVEL: 3,
  };

  const [levelChoice, setLevelChoice] = useState("none");
  const [rotationCard, setRotationCard] = useState();
  const [statusGame, setSatusGame] = useState(statusGames.CHOICE_LEVEL);
  const [attempts, setAttempts] = useState();

  const HundlerClickCard = (id, img) => {
    if ((firstChoice && secondChoice) || rotationCard === id) {
      return;
    }

    if (firstChoice === "") {
      firstChoice = img;

      let index = cards.findIndex((card) => card.id === id);
      cards[index].trasform = statusRotation.SHOWED;
    } else {
      secondChoice = img;

      if (firstChoice !== secondChoice) {
        // reset carte

        setTimeout(() => {
          cards = cards.map(
            (card) =>
              (card = {
                id: card.id,
                trasform: statusRotation.ROTATED,
                img: card.img,
              })
          );

          firstChoice = "";
          secondChoice = "";
          setAttempts((attempts) => attempts - 1);

          setRotationCard(-1);
        }, 1000);
      } else {
        firstChoice = "";
        secondChoice = "";
      }
    }
    let index = cards.findIndex((card) => card.id === id);
    cards[index].trasform = statusRotation.SHOWED;
    setRotationCard(id);
  };

  const checkStatusGame = () => {
    //   VITTORIA
    if (!cards.some((element) => element.trasform === statusRotation.ROTATED)) {
    } else if (attempts <= 0) {
      setSatusGame(statusGames.GAME_OVER);
    }
  };

  useEffect(() => {
    checkStatusGame();
    // eslint-disable-next-line
  }, [rotationCard]);

  useEffect(() => {
    if (levelChoice !== "none") {
      cards = levelChoice.cards;
      shuffle(cards);
      setSatusGame(statusGames.IN_GAME);
      setAttempts(levelChoice.attempt);
    }
    console.log(levelChoice);
    // eslint-disable-next-line
  }, [levelChoice]);

  switch (statusGame) {
    case statusGames.IN_GAME:
      return (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: levelChoice.layoutGrid,
            }}
          >
            {cards.map(({ id, trasform, img }) => (
              <div
                key={id}
                className="flip-card"
                style={{
                  margin: 20,
                  width: levelChoice.widthCard,
                  height: levelChoice.heightCard,
                }}
              >
                <div
                  id={id}
                  className="flip-card-inner"
                  onClick={() => HundlerClickCard(id, img)}
                  style={{ transform: trasform }}
                >
                  <div className="flip-card-front">
                    <img
                      src={retro}
                      alt="Avatar"
                      style={{
                        width: levelChoice.widthCard,
                        height: levelChoice.heightCard,
                      }}
                    />
                  </div>
                  <div className="flip-card-back">
                    <img
                      src={img}
                      alt="Avatar"
                      style={{
                        width: levelChoice.widthCard,
                        height: levelChoice.heightCard,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ color: "white", textAlign: "center", fontSize: 25 }}>
            Tentativi rimasti: {attempts}
            <Link to="/">
              <button
                style={{ marginLeft: 20 }}
                //onClick={() => callback2("none")}
              >
                EXIT
              </button>
            </Link>
          </p>
        </div>
      );

    case statusGames.GAME_OVER:
      return (
        <p style={{ color: "white", fontSize: 30 }}>
          GAME OVER
          <Link to="/">
            <button style={{ marginLeft: 20 }}>EXIT</button>{" "}
          </Link>
        </p>
      );

    case statusGames.CHOICE_LEVEL:
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span style={{ color: "white", padding: 10 }}>
            Scegli a che difficoltà vuoi giocare
          </span>
          <button
            style={{
              padding: 10,
              backgroundColor: "green",
              borderRadius: 10,
              border: 0,
              marginRight: 10,
            }}
            onClick={() => setLevelChoice(settingLevels.easy)}
          >
            EASY
          </button>
          <button
            style={{
              padding: 10,
              backgroundColor: "yellow",
              borderRadius: 10,
              border: 0,
              marginRight: 10,
            }}
            onClick={() => setLevelChoice(settingLevels.medium)}
          >
            MEDIUM
          </button>
          <button
            style={{
              padding: 10,
              backgroundColor: "red",
              borderRadius: 10,
              border: 0,
              marginRight: 10,
            }}
            onClick={() => setLevelChoice(settingLevels.hard)}
          >
            HARD
          </button>
        </div>
      );

    default:
      break;
  }
};

export default Memory;
