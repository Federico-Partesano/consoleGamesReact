import React, { useState, useRef } from "react";
import { useEffect } from "react";
//import { render } from "react-dom";
import img from "./../../../images/gameover.png";
import arrow from "./../../../images/arrow.png";
import { Link } from "react-router-dom";
//import Menu from "./menu";
import "../../../css/Game.css";

let currentTime = 0;
let timeForFood = 0;
let lastCalledTime = 0;
// eslint-disable-next-line
let fps = 0;
let spawnTime = 0;
let startGameTime = 0;
let foods = [];

const useFrameLoop = (callback) => {
  const requestID = useRef();
  const previousTime = useRef();
  const loop = (time) => {
    if (previousTime.current !== undefined) {
      // const deltaTime = time - previousTime.current;
      callback(time);
    }

    function requestAnimFrame() {
      if (!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
        return;
      }
      let delta = (Date.now() - lastCalledTime) / 1000;
      lastCalledTime = Date.now();
      fps = 1 / delta;
    }

    requestAnimFrame();

    previousTime.current = time;
    currentTime = time;

    if (startGameTime === 0) {
      startGameTime = time;
    }

    requestID.current = requestAnimationFrame(loop);
  };
  useEffect(() => {
    requestID.current = requestAnimationFrame(loop);

    return () => {
      callback(undefined);
    };
    // eslint-disable-next-line
  }, []);
};
// eslint-disable-next-line
const FPS = 10;
//let lastTimestamp = 0;
let ball = { x: 600, y: 294 };
let speedBall = 0.1;
let padel1 = 300;
let padel2 = 300;

let direction = "right-down";
let directionPadel = "none";
let score = 0;
let padelWidth1 = 6;
let padelHeight1 = 80;
let padelHeight = 80;

const Canvas = () => {
  const canvasRef = useRef(null);
  const padelWidth = 6;
  const Width = 1200;
  //let AllstatusGame = { GAMEOVER: "gameover", IN_GAME: "ingame" };
  const [isGameOver, setGameOver] = useState(false);
  //const [isGameOut, setGameOut] = useState(false);
  const [deltaTime, setDeltaTime] = useState(1);
  const [modifyFoods, setModifyFood] = useState(false);

  const [tick, setTick] = useState(0);
  //const [tick2, setTick2] = useState();

  useEffect(() => {
    window.addEventListener("keydown", checkKeyDown, true);
    window.addEventListener("keyup", checkKeyUp, true);

    return () => {
      window.removeEventListener("keydown", checkKeyDown, true);
      window.removeEventListener("keyup", checkKeyUp, true);
    };
  });

  useFrameLoop((timestamp) => {
    if (
      timestamp === undefined ||
      isGameOver ||
      tick === undefined ||
      !canvasRef.current
    )
      return;

    setTick(currentTime);
  });

  useEffect(
    (timestamp) => {
      if (!canvasRef.current && timestamp === undefined) return;

      render(timestamp);

      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [tick]
  );

  const render = (timestamp) => {
    setDeltaTime(currentTime - tick);

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    ctx.fillStyle = "white";
    ctx.fillRect(10, padel1, padelWidth1, padelHeight1);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "red";
    foods.forEach((food) => {
      ctx.fillRect(food.x, food.y, 10, 10);
      ctx.fill();
      ctx.stroke();
    });
    ctx.fillStyle = "white";
    ctx.arc(ball.x, ball.y, 6, 0, 2 * Math.PI);

    ctx.fillRect(Width - padelWidth, padel2, padelWidth, padelHeight);

    ctx.fillRect(Width / 2, 0, 1, 600);

    ctx.font = "25px serif";
    ctx.fillText("score:" + score, Width - 130, 25);
    ctx.fillText(
      "time:" +
        new Date(currentTime - startGameTime).toTimeString().slice(3, 9),
      Width - 130,
      70
    );

    ctx.fill();
    ctx.stroke();
    checkCollision();
    checkCollisionFood();
    spawnFood();

    movementBall();
    movementFood();
    movementPadel();

    checkscore();

    if (currentTime - startGameTime > 120000) {
      setGameOver(false);
      startGameTime = 0;
    }
  };

  function checkKeyDown(e) {
    var code = e.keyCode;
    //Up arrow pressed
    switch (code) {
      case 87:
        directionPadel = "up";
        break;
      case 83:
        directionPadel = "down";
        break;
      default:
        directionPadel = "none";
        break;
    }
  }

  function checkKeyUp(e) {
    directionPadel = "none";
  }

  const movementFood = () => {
    foods = foods.map(
      (food) => (food = { x: food.x - 0.3 * deltaTime, y: food.y })
    );
  };

  const movementBall = () => {
    switch (direction) {
      case "right-down":
        ball = {
          x: ball.x + speedBall + 0.2 * deltaTime,
          y: ball.y + speedBall + 0.2 * deltaTime,
        };

        break;
      case "left-up":
        ball = {
          x: ball.x - speedBall - 0.2 * deltaTime,
          y: ball.y - speedBall - 0.2 * deltaTime,
        };

        break;
      case "left-down":
        ball = {
          x: ball.x - speedBall - 0.2 * deltaTime,
          y: ball.y + speedBall + 0.2 * deltaTime,
        };

        break;
      case "right-up":
        ball = {
          x: ball.x + speedBall + 0.2 * deltaTime,
          y: ball.y - speedBall - 0.2 * deltaTime,
        };

        break;
      default:
        break;
    }
  };

  const movementPadel = () => {
    padel2 = padel1;
    switch (directionPadel) {
      case "down":
        padel1 = padel1 + 0.2 * deltaTime;

        break;
      case "up":
        padel1 = padel1 - 0.2 * deltaTime;

        break;
      default:
        break;
    }
  };

  const checkscore = () => {
    if (ball.x + 6 < 0 || ball.x > 1200) {
      score -= 40;

      // setGameOver(true);
      ball = { x: Width / 2, y: 600 / 2 };
      direction = "right-up";
    }
  };

  const spawnFood = () => {
    //checkCollisionFood

    if (currentTime - timeForFood > spawnTime) {
      foods.push({ x: 1200, y: Math.floor(Math.random() * 590) });
      spawnTime = Math.floor(Math.random() * (8000 - 1000) + 1000);

      timeForFood = currentTime;
    }
  };

  const checkCollisionFood = () => {
    //checkCollisionFood
    foods.forEach((food) => {
      if (
        ((food.x > 16 && food.x < 16 + 6) ||
          (food.x + 10 > 16 && food.x + 10 < 16 + 6)) &&
        ((food.y > padel1 && food.y < padel1 + padelHeight1) ||
          (food.y + 10 > padel1 && food.y + 10 < padel1 + padelHeight1))
      ) {
        food.x = -100;

        score += 10;

        //console.log(food);
        padelHeight1 -= 2;
        padelHeight = padelHeight1;
        setModifyFood(currentTime);
      }
    });
  };

  useEffect(() => {
    foods = foods.filter((element) => element.x >= 0);
  }, [modifyFoods]);

  const checkCollision = () => {
    if (ball.y > 594) {
      if (direction === "right-down") {
        direction = "right-up";
      } else if (direction === "left-down") {
        direction = "left-up";
      }
    } else if (ball.y <= 0) {
      if (direction === "right-up") {
        direction = "right-down";
      } else if (direction === "left-up") {
        direction = "left-down";
      }
    } else if (
      ((ball.x > 16 && ball.x < 16 + 6) ||
        (ball.x + 6 > 16 && ball.x + 6 < 16 + 6)) &&
      ((ball.y > padel1 && ball.y < padel1 + padelHeight1) ||
        (ball.y + 6 > padel1 && ball.y + 6 < padel1 + padelHeight1))
    ) {
      if (direction === "left-down") {
        direction = "right-down";
      } else if (direction === "left-up") {
        direction = "right-up";
      }
    } else if (
      ((ball.x > Width - padelWidth && ball.x < Width - padelWidth + 6) ||
        (ball.x + 6 > Width - padelWidth &&
          ball.x + 6 < Width - padelWidth + 6)) &&
      ((ball.y > padel2 && ball.y < padel2 + padelHeight1) ||
        (ball.y + 6 > padel2 && ball.y + 6 < padel2 + padelHeight1))
    ) {
      if (direction === "right-down") {
        direction = "left-down";
      } else if (direction === "right-up") {
        direction = "left-up";
      }
    }

    if (padel1 <= 0) {
      padel1 = 1;
    } else if (padel1 + padelHeight1 >= 600) {
      padel1 = 600 - padelHeight1;
    }
    /*
if(padel2 < 0){
    padel2 = 1;
} else
if(padel2 + padelHeight >= 600){
    padel2 = 600-padelWidth;
}
*/
  };

  const inputHandlerYes = () => {
    setGameOver(true);
    ball = { x: 600, y: 294 };
  };

  if (isGameOver) {
    return (
      <canvas
        id="canvas"
        className="canvas"
       
        ref={canvasRef}
      ></canvas>
    );
  } else {
    return (
      <div style={{ position: "relative" }}>
        <img src={img} alt="game over" width="1200"></img>
        <span
          id="yes"
          style={{
            position: "absolute",
            left: 513,
            bottom: 169,
            color: "red",
            padding: 10,
            opacity: 0,
            cursor: "grab",
          }}
          onClick={inputHandlerYes}
        >
          YES
        </span>

        <span id="no">
          {" "}
          <Link to="/">NO </Link>
        </span>

        <img id="arrow" src={arrow} alt="arrow" width="50"></img>
      </div>
    );
  }
};

export default Canvas;
