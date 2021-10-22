import React, { useState, useRef } from "react";
import { useEffect } from "react";
import foodPacman from "./../../../images/foodPacman.png";
import wallI from "./../../../images/walls/wall-I.png";
import wallI_O from "./../../../images/walls/wall-I-O.png";
import wallDL_DR from "./../../../images/walls/wall-DL-DR.png";
import wallDL_DL from "./../../../images/walls/wall-DL-DL.png";
import wallDL_UR from "./../../../images/walls/wall-DL-UR.png";
import wallDL_UL from "./../../../images/walls/wall-DL-UL.png";

import pacman_1 from "./../../../images/pacman/pacman1.png";
import pacman_2 from "./../../../images/pacman/pacman2.png";
import pacman_3 from "./../../../images/pacman/pacman3.png";

import ghost_red_D from "./../../../images/ghosts/ghost-red-D.png";
import ghost_red_U from "./../../../images/ghosts/ghost-red-U.png";
//import { render } from "react-dom";

import Menu from "../../menu";
import gameOverImg from "./../../../images/pacman-menu.jpg";
import "../../../css/Game.css";
let currentTime = 0;

let lastCalledTime = 0;
// eslint-disable-next-line
let fps = 0;

const WIDTH = 600;
// eslint-disable-next-line
const HEIGTH = 300;

const directions = {
  RIGHT: "right",
  LEFT: "left",
  UP: "up",
  DOWN: "down",
};

const SIZE = 25;
let timeForAnimation = 0;
let speedAnimation = 100;
let stateAnimation = 0;
const rotationPacman = {
  right: 0,
  down: 1,
  left: 2,
  up: 3,
};
let currentRotationPacman = rotationPacman.right;
let towardAnimation = 0;
let speedPlayer = 2;
let speedghostRed = 2;

const BLOCK = WIDTH / SIZE;
let player = { x: BLOCK * 14, y: BLOCK * 17 };
let ghostRed = { x: BLOCK * 16, y: BLOCK * 8 };
let foods = [];
let walls = [];
const layout = [
  6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 5, 5, 0, 6, 1, 1, 7, 0, 6, 1, 1, 1, 7, 0, 5, 5, 0, 6, 1, 1, 1, 7, 0,
  6, 1, 1, 7, 0, 5, 5, 3, 5, 1, 1, 5, 0, 5, 1, 1, 1, 5, 0, 5, 5, 0, 5, 1, 1, 1,
  5, 0, 5, 1, 1, 5, 3, 5, 5, 0, 9, 1, 1, 8, 0, 9, 1, 1, 1, 8, 0, 9, 8, 0, 9, 1,
  1, 1, 8, 0, 9, 1, 1, 8, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 6, 1, 1, 7, 0, 6, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 7, 0, 6, 1, 1, 7, 0, 5, 5, 0, 9, 1, 1, 8, 0, 9, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 9, 1, 1, 8, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 9, 1, 1, 1, 1, 7, 0, 6,
  1, 1, 1, 1, 0, 9, 8, 0, 1, 1, 1, 1, 7, 0, 6, 1, 1, 1, 1, 8, 1, 1, 1, 1, 7, 5,
  0, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 0, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1,
  8, 5, 0, 5, 5, 4, 6, 1, 1, 2, 2, 1, 1, 7, 4, 5, 5, 0, 5, 9, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 8, 0, 9, 8, 4, 5, 2, 2, 2, 2, 2, 2, 5, 4, 9, 8, 0, 9, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 5, 2, 2, 2, 2, 2, 2, 5, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 7, 0, 6, 7, 4, 5, 2, 2, 2, 2, 2, 2, 5, 4, 6, 7, 0, 6, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 5, 5, 4, 6, 1, 1, 1, 1, 1, 1, 7, 4, 5, 5, 0,
  5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 9, 8, 4, 9, 1, 1, 1, 1, 1, 1, 8, 4, 9,
  8, 0, 9, 1, 1, 1, 1, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 6, 1, 1, 7, 0, 6, 1, 1, 1, 7, 0, 6, 7, 0,
  6, 1, 1, 1, 7, 0, 6, 1, 1, 7, 0, 5, 5, 0, 9, 1, 7, 5, 0, 9, 1, 1, 1, 8, 0, 9,
  8, 0, 9, 1, 1, 1, 8, 0, 5, 6, 1, 8, 0, 5, 5, 3, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0, 3, 5, 9, 1, 7, 0, 5, 5, 0, 6, 7, 0,
  6, 1, 1, 1, 1, 1, 1, 7, 0, 6, 7, 0, 5, 5, 0, 6, 1, 8, 6, 1, 8, 0, 9, 8, 0, 5,
  5, 0, 9, 1, 1, 7, 6, 1, 1, 8, 0, 5, 5, 0, 9, 8, 0, 9, 1, 7, 5, 0, 0, 0, 0, 0,
  0, 5, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 0, 6, 1,
  1, 1, 1, 8, 9, 1, 1, 7, 0, 5, 5, 0, 6, 1, 1, 8, 9, 1, 1, 1, 1, 7, 0, 5, 5, 0,
  9, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 9, 8, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 5,
  5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 5, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 8,
];

// 0 - pac-dots
// 1 - wall I orizzontale
// 5 - wall I_O orizzontale
// 6 - wall DL-DR orizzontale
// 7 - wall DL-DL orizzontale
// 8 - wall DL-UL orizzontale
// 9 - wall DL-UR orizzontale

// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const createField = () => {
  for (let index = 0; index < 28; index++) {
    let colum = index * 28;
    for (let index2 = colum; index2 < colum + 28; index2++) {
      let row = index2 - colum;

      if (layout[index2] === 1) {
        walls.push({ x: BLOCK * row, y: BLOCK * index, type: "IO" });
      } else if (layout[index2] === 0 || layout[index2] === 3) {
        foods.push({ x: BLOCK * row, y: BLOCK * index });
      } else if (layout[index2] === 5) {
        walls.push({ x: BLOCK * row, y: BLOCK * index, type: "I" });
      } else if (layout[index2] === 6) {
        walls.push({ x: BLOCK * row, y: BLOCK * index, type: "DL-DR" });
      } else if (layout[index2] === 7) {
        walls.push({ x: BLOCK * row, y: BLOCK * index, type: "DL-DL" });
      } else if (layout[index2] === 8) {
        walls.push({ x: BLOCK * row, y: BLOCK * index, type: "DL-UL" });
      } else if (layout[index2] === 9) {
        walls.push({ x: BLOCK * row, y: BLOCK * index, type: "DL-UR" });
      }
      /*if(layout[index2] === 1){
          walls.push({x:  BLOCK * row ,y: BLOCK * index })
      }*/
    }
  }
};

createField();

// eslint-disable-next-line
let startGameTime = 0;

let directionPlayer = directions.RIGHT;
let directionGhostRed = directions.RIGHT;

let previousDirectionPlayer = directions.RIGHT;

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
    /*
   if(startGameTime === 0){
    startGameTime = time;
}   
*/
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
//------------------------------------------------------------//
const Pacman = ({ callback2 }) => {
  let foodImage = new Image();
  foodImage.src = foodPacman;

  let wallIImage = new Image();
  wallIImage.src = wallI;

  let wall_I_O_Image = new Image();
  wall_I_O_Image.src = wallI_O;

  let wall_DL_DR_Image = new Image();
  wall_DL_DR_Image.src = wallDL_DR;

  let wall_DL_DL_Image = new Image();
  wall_DL_DL_Image.src = wallDL_DL;

  let wall_DL_UR_Image = new Image();
  wall_DL_UR_Image.src = wallDL_UR;

  let wall_DL_UL_Image = new Image();
  wall_DL_UL_Image.src = wallDL_UL;

  let pacman_1_Image = new Image();
  pacman_1_Image.src = pacman_1;

  let pacman_2_Image = new Image();
  pacman_2_Image.src = pacman_2;

  let pacman_3_Image = new Image();
  pacman_3_Image.src = pacman_3;

  let ghost_red_D_Image = new Image();
  ghost_red_D_Image.src = ghost_red_D;

  let ghost_red_U_Image = new Image();
  ghost_red_U_Image.src = ghost_red_U;

  //let imagess = [foodImage,wallIImage,wall_I_O_Image,wall_DL_DR_Image,wall_DL_DL_Image,wall_DL_UR_Image,wall_DL_UL_Image];

  const canvasRef = useRef(null);
  //let AllstatusGame = { GAMEOVER: "gameover", IN_GAME: "ingame" };
  const [isGameOver, setGameOver] = useState(true);
  // eslint-disable-next-line
  const [returnMenu, setReturnMenu] = useState(false);
  const [tick, setTick] = useState(0);
  /*
  useEffect(() => {
    window.addEventListener("keydown", checkKeyDown, true);
    window.addEventListener("keyup", checkKeyUp, true);
    
    return () => {
      window.removeEventListener("keydown", checkKeyDown, true);
      window.removeEventListener("keyup", checkKeyUp, true);
    };
  });
*/
  useFrameLoop((timestamp) => {
    if (
      timestamp === undefined ||
      !isGameOver ||
      tick === undefined ||
      !canvasRef.current
    )
      return;

    setTick(currentTime);
  });

  useEffect(
    (timestamp) => {
      if (!canvasRef.current) return;
      render(timestamp);
    },
    // eslint-disable-next-line
    [tick]
  );

  const hundlerKeyPressed = (e) => {
    var code = e.keyCode;
    //Up arrow pressed

    switch (code) {
      case 87:
        previousDirectionPlayer = directions.UP;
        break;
      case 83:
        previousDirectionPlayer = directions.DOWN;

        break;
      case 68:
        previousDirectionPlayer = directions.RIGHT;

        break;
      case 65:
        previousDirectionPlayer = directions.LEFT;

        break;
      default:
        break;
    }
  };

  const changeDirectionPlayer = () => {
    if (
      Number.isInteger(player.x / BLOCK) &&
      Number.isInteger(player.y / BLOCK)
    ) {
      switch (previousDirectionPlayer) {
        case directions.RIGHT:
          if (
            !walls.some(
              (wall) => wall.x === player.x + BLOCK && wall.y === player.y
            )
          ) {
            directionPlayer = previousDirectionPlayer;
            currentRotationPacman = rotationPacman.right;
          }
          break;
        case directions.DOWN:
          if (
            !walls.some(
              (wall) => wall.x === player.x && wall.y === player.y + BLOCK
            )
          ) {
            directionPlayer = previousDirectionPlayer;
            currentRotationPacman = rotationPacman.down;
          }
          break;
        case directions.UP:
          if (
            !walls.some(
              (wall) => wall.x === player.x && wall.y === player.y - BLOCK
            )
          ) {
            directionPlayer = previousDirectionPlayer;
            currentRotationPacman = rotationPacman.up;
          }
          break;
        case directions.LEFT:
          if (
            !walls.some(
              (wall) => wall.x === player.x - BLOCK && wall.y === player.y
            )
          ) {
            directionPlayer = previousDirectionPlayer;
            currentRotationPacman = rotationPacman.left;
          }
          break;

        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", hundlerKeyPressed, true);

    return () => {
      window.removeEventListener("keydown", hundlerKeyPressed, true);
    };
  });

  const movementPlayer = () => {
    switch (directionPlayer) {
      case directions.RIGHT:
        if (
          !walls.some(
            (wall) => wall.x === player.x + BLOCK && wall.y === player.y
          )
        ) {
          player.x += speedPlayer;
        }
        break;
      case directions.LEFT:
        if (
          !walls.some(
            (wall) => wall.x === player.x - BLOCK && wall.y === player.y
          )
        ) {
          player.x -= speedPlayer;
        }
        break;
      case directions.UP:
        if (
          !walls.some(
            (wall) => wall.x === player.x && wall.y === player.y - BLOCK
          )
        ) {
          player.y -= speedPlayer;
        }
        break;
      case directions.DOWN:
        if (
          !walls.some(
            (wall) => wall.x === player.x && wall.y === player.y + BLOCK
          )
        ) {
          player.y += speedPlayer;
        }
        break;

      default:
        break;
    }
    if (player.x + BLOCK < 0) {
      player.x = BLOCK * 28;
    } else if (player.x > BLOCK * 28) {
      player.x = 0 - BLOCK;
    }
  };

  const checkMovementGhostRed = () => {
    let checkCollapse = (direction) => {
      switch (direction) {
        case directions.RIGHT:
          return !walls.some(
            (wall) => wall.x === ghostRed.x + BLOCK && wall.y === ghostRed.y
          );
        case directions.LEFT:
          return !walls.some(
            (wall) => wall.x === ghostRed.x - BLOCK && wall.y === ghostRed.y
          );
        case directions.UP:
          return !walls.some(
            (wall) => wall.x === ghostRed.x && wall.y === ghostRed.y - BLOCK
          );
        case directions.DOWN:
          return !walls.some(
            (wall) => wall.x === ghostRed.x && wall.y === ghostRed.y + BLOCK
          );
        default:
          break;
      }
    };

    let up = {
      direction: directions.UP,
      value: Math.sqrt(
        Math.pow(ghostRed.x - player.x, 2) +
          Math.pow(ghostRed.y - 1 - player.y, 2)
      ),
    };
    let down = {
      direction: directions.DOWN,
      value: Math.sqrt(
        Math.pow(ghostRed.x - player.x, 2) +
          Math.pow(ghostRed.y + 1 - player.y, 2)
      ),
    };
    let right = {
      direction: directions.RIGHT,
      value: Math.sqrt(
        Math.pow(ghostRed.x + 1 - player.x, 2) +
          Math.pow(ghostRed.y - player.y, 2)
      ),
    };
    let left = {
      direction: directions.LEFT,
      value: Math.sqrt(
        Math.pow(ghostRed.x - 1 - player.x, 2) +
          Math.pow(ghostRed.y - player.y, 2)
      ),
    };
    let arrayNum = [up, down, right, left];

    arrayNum.sort((a, b) => {
      return a.value - b.value;
    });

    if (
      Number.isInteger(ghostRed.x / BLOCK) &&
      Number.isInteger(ghostRed.y / BLOCK)
    ) {
      if (checkCollapse(arrayNum[0].direction)) {
        directionGhostRed = arrayNum[0].direction;
      } else if (checkCollapse(arrayNum[1].direction)) {
        directionGhostRed = arrayNum[1].direction;
      } else if (checkCollapse(arrayNum[2].direction)) {
        directionGhostRed = arrayNum[2].direction;
      } else {
        directionGhostRed = arrayNum[3].direction;
      }
    }
  };

  /*function findWay(ind, departure, destination) {
    //if arrival and departure have a same coordinates, return a blank array
    if (departure.x == destination.x && departure.y == destination.y)
      return [];
    //push departure to the queue as the start point
    let queue = [departure], index = 0, result = null;
  
    //keep finding a way until get a result
    while (result == null) {
      let adj = getAdjacences(ind, queue, queue[index]);
      adj.forEach((value) => {
        //deep copy the adjacence and push to queue
        value.prev = JSON.parse(JSON.stringify(queue[index]));
        queue.push(value);
  
        //if it reaches its target, assign to result and break the loop
        if (value.x == destination.x && value.y == destination.y) {
          result = value;
        }
      });
      index++;
    }
  
    //inverse nextMoves
    let nextMoves = [];
    let curr = result;
    do {
      nextMoves.push({ x: curr.x, y: curr.y });
      curr = curr.prev;
    } while (curr != null);
  
    //return nextMoves without the first one (the ghost itself)
    return nextMoves.reverse().splice(1);
  }



function Asearch(start,goal){
closedset = the empty set                 //L'insieme dei nodi già valutati.     
openset = set containing the initial node // The set of tentative nodes to be evaluated.
g_score[start] = 0                        // Distance from start along optimal path.
came_from = the empty map                 // The map of navigated nodes.
h_score[start] = heuristic_estimate_of_distance(start, goal)
f_score[start] = h_score[start]           // Estimated total distance from start to goal through y.
while openset is not empty
    x = the node in openset having the lowest f_score[] value
    if x = goal
        return reconstruct_path(came_from,goal)
    remove x from openset
    add x to closedset
    foreach y in neighbor_nodes(x)
        if y in closedset
            continue
        tentative_g_score := g_score[x] + dist_between(x,y)
        
        if y not in openset
            add y to openset
           
            tentative_is_better = true
        elseif tentative_g_score < g_score[y]
            tentative_is_better = true
        else
            tentative_is_better = false
        if tentative_is_better = true
            came_from[y] := x
            g_score[y] := tentative_g_score
            h_score[y] := heuristic_estimate_of_distance(y, goal)
            f_score[y] := g_score[y] + h_score[y]
return failure

function reconstruct_path(came_from,current_node)
if came_from[current_node] is set
    p = reconstruct_path(came_from,came_from[current_node])
    return (p + current_node)
else
    return the empty path


}
*/

  const MovementGhostRed = () => {
    switch (directionGhostRed) {
      case directions.RIGHT:
        if (
          !walls.some(
            (wall) => wall.x === ghostRed.x + BLOCK && wall.y === ghostRed.y
          )
        ) {
          ghostRed.x += speedghostRed;
        }
        break;
      case directions.LEFT:
        if (
          !walls.some(
            (wall) => wall.x === ghostRed.x - BLOCK && wall.y === ghostRed.y
          )
        ) {
          ghostRed.x -= speedghostRed;
        }
        break;
      case directions.UP:
        if (
          !walls.some(
            (wall) => wall.x === ghostRed.x && wall.y === ghostRed.y - BLOCK
          )
        ) {
          ghostRed.y -= speedghostRed;
        }
        break;
      case directions.DOWN:
        if (
          !walls.some(
            (wall) => wall.x === ghostRed.x && wall.y === ghostRed.y + BLOCK
          )
        ) {
          ghostRed.y += speedghostRed;
        }
        break;

      default:
        break;
    }
  };

  const checkCollisionFood = () => {
    //               CHIEDERE!!!!!!!!!!!!!!!!
    //foods = foods.filter((food) => food.x !== player.x && food.y !== player.y);
    foods.forEach((food) => {
      if (food.x === player.x && food.y === player.y) {
        food.x = -50;
        foods = foods.filter((food) => food.x >= 0);
      }
    });
  };

  const animationPacman = () => {
    if (towardAnimation === 0) {
      if (stateAnimation < 2) {
        stateAnimation += 1;
      } else {
        towardAnimation = 1;
      }
    }

    if (towardAnimation === 1) {
      if (stateAnimation > 0) {
        stateAnimation -= 1;
      } else {
        towardAnimation = 0;
        stateAnimation += 1;
      }
    }
  };

  const render = (timestamp) => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    ctx.fillStyle = "#182b5f";

    walls.forEach((wall) => {
      if (wall.type === "DL-DR") {
        ctx.drawImage(wall_DL_DR_Image, wall.x, wall.y, BLOCK, BLOCK);
        ctx.fill();
        ctx.stroke();
      } else if (wall.type === "DL-DL") {
        ctx.drawImage(wall_DL_DL_Image, wall.x, wall.y, BLOCK, BLOCK);
        ctx.fill();
        ctx.stroke();
      } else if (wall.type === "I") {
        ctx.drawImage(wallIImage, wall.x, wall.y, BLOCK, BLOCK);
        ctx.fill();
        ctx.stroke();
      } else if (wall.type === "DL-UR") {
        ctx.drawImage(wall_DL_UR_Image, wall.x, wall.y, BLOCK, BLOCK);
        ctx.fill();
        ctx.stroke();
      } else if (wall.type === "IO") {
        ctx.drawImage(wall_I_O_Image, wall.x, wall.y, BLOCK, BLOCK);
        ctx.fill();
        ctx.stroke();
      } else if (wall.type === "DL-UL") {
        ctx.drawImage(wall_DL_UL_Image, wall.x, wall.y, BLOCK, BLOCK);
        ctx.fill();
        ctx.stroke();
      }
    });
    ctx.fillStyle = "white";

    ctx.fillStyle = "green";

    //player

    ctx.save();
    ctx.translate(player.x + BLOCK / 2, player.y + BLOCK / 2);
    ctx.rotate((currentRotationPacman * 90 * Math.PI) / 180);
    if (stateAnimation === 0) {
      ctx.drawImage(pacman_1_Image, -(BLOCK / 2), -(BLOCK / 2), BLOCK, BLOCK);
    } else if (stateAnimation === 1) {
      ctx.drawImage(pacman_2_Image, -(BLOCK / 2), -(BLOCK / 2), BLOCK, BLOCK);
    } else {
      ctx.drawImage(pacman_3_Image, -(BLOCK / 2), -(BLOCK / 2), BLOCK, BLOCK);
    }
    ctx.restore();

    ctx.drawImage(ghost_red_D_Image, ghostRed.x, ghostRed.y, BLOCK, BLOCK);
    ctx.fill();
    ctx.stroke();

    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";

    ctx.fillStyle = "red";
    foodImage.onload = () => {
      foods.forEach((food) => {
        ctx.drawImage(foodImage, food.x, food.y, BLOCK, BLOCK);
        ctx.fill();
        ctx.stroke();
      });
    };

    ctx.fillStyle = "white";

    movementPlayer();
    changeDirectionPlayer();
    checkCollisionFood();
    checkMovementGhostRed();
    MovementGhostRed();

    if (currentTime - timeForAnimation > speedAnimation) {
      animationPacman();

      timeForAnimation = currentTime;
    }
  };

  const handleClick = (choice) => {
    // snakes = [{x: BLOCK * 5,y:BLOCK * 3},{x:BLOCK*4,y: BLOCK*3}];
    foods = [];
    createField();
    setGameOver(false);
  };

  if (!isGameOver) {
    return (
      <canvas
        id="canvasPacman"
        className="canvasPacman"
        width="670"
        height="670"
        ref={canvasRef}
      ></canvas>
    );
  } else {
    if (!returnMenu) {
      return (
        <div style={{ position: "relative" }}>
          <img src={gameOverImg} width="1200" alt="game over"></img>
          <span className="text-play-pacman"> You want play?</span>
          <span className="yesPacman" onClick={handleClick}>
            YES
          </span>
          <span className="noPacman" onClick={() => callback2("none")}>
            NO
          </span>
        </div>
      );
    } else {
      return <Menu></Menu>;
    }
  }
};

export default Pacman;
