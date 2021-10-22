import React, { useState, useRef } from "react";
import { useEffect } from "react";
//import { render } from "react-dom";
import gameOverImg from "./../../../images/gameoverSnake.jpg"
import "../../../css/Game.css";
  let currentTime = 0;

  let lastCalledTime = 0;
  // eslint-disable-next-line
  let fps = 0;

    const WIDTH = 600;
    // eslint-disable-next-line
    const HEIGTH =600;
  
    const SIZE = 30;
    let TimeForSnakes = 0;
    
    let speedSnake = 500;
    const BLOCK = WIDTH / SIZE;
  let snakes = [{x: BLOCK * 5,y:BLOCK * 3},{x:BLOCK*4,y: BLOCK*3}];
  let foods = [];
  // eslint-disable-next-line
  let startGameTime = 0;
 
const directions = {
  RIGHT: "right",
  LEFT: "left",
  DOWN : "down",
  UP: "up"
}

  let directionSnake = directions.RIGHT;
  let isEat = false;
  



const useFrameLoop = (callback) => {

  const requestID = useRef();
  const previousTime = useRef();
  const loop = (time) => {
    if (previousTime.current !== undefined) {
      // const deltaTime = time - previousTime.current;
      callback(time);
    }


    function requestAnimFrame() {
  
      if(!lastCalledTime) {
         lastCalledTime = Date.now();
         fps = 0;
         return;
      }
      let delta = (Date.now() - lastCalledTime)/1000;
      lastCalledTime = Date.now();
      fps = 1/delta;
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
const Snake = ({callback2}) => {
  const canvasRef = useRef(null);

  const [isGameOver, setGameOver] = useState(true);
  // eslint-disable-next-line
  const [returnMenu, setReturnMenu] = useState(false);
  const [tick, setTick] = useState(0);

  useFrameLoop((timestamp) => {
    if (
     
      timestamp === undefined ||
      !isGameOver || tick === undefined ||
      !canvasRef.current
    )
      return;
 
    setTick(currentTime);
  });


  useEffect((timestamp) => {
    if (!canvasRef.current) return;
    render(timestamp);
    // eslint-disable-next-line
  }, [tick]);



  const  hundlerKeyPressed= (e) =>{
    var code = e.keyCode;
    //Up arrow pressed
    switch (code) {
      case 119:
      if(directionSnake !== directions.DOWN) {directionSnake = directions.UP};
        break;
      case 115:
        if(directionSnake !== directions.UP) {directionSnake =  directions.DOWN};
        break;
        case 100:
            if(directionSnake !==  directions.LEFT) {directionSnake =  directions.RIGHT};
        break;
        case 97:
            if(directionSnake !==  directions.RIGHT) {directionSnake = directions.LEFT};
            break;
      default:
       
        break;
    }
    
  }

    useEffect(() => {
        window.addEventListener("keypress", hundlerKeyPressed, true);
   
    
    return () => {
        window.removeEventListener("keypress", hundlerKeyPressed, true);
    
    };
  });


  const movementSnake = () =>{
       
       

            switch(directionSnake){
                case directions.RIGHT:
                  if(!isEat){snakes.pop();} else { isEat = false};
                  snakes.unshift({x:snakes[0].x + BLOCK,y: snakes[0].y});
                break;
                case directions.LEFT:
                    if(!isEat){snakes.pop();} else { isEat = false};
                  snakes.unshift({x:snakes[0].x - BLOCK,y: snakes[0].y});
                break;
                case directions.UP:
                    if(!isEat){snakes.pop();} else { isEat = false};
                  snakes.unshift({x:snakes[0].x ,y: snakes[0].y - BLOCK});
                break;
                case directions.DOWN:
                    if(!isEat){snakes.pop();} else { isEat = false};
                  snakes.unshift({x:snakes[0].x ,y: snakes[0].y + BLOCK});
                break;



                default:

                break;
            }
         
  }

  const spawnFood = () => {
   if(foods.length === 0){

          do{
            var food1 = {x: Math.floor(Math.random() * SIZE) * BLOCK, y: Math.floor(Math.random() * SIZE) * BLOCK }
            // eslint-disable-next-line
          } while(foods.some((food) => food === food1 ));
          foods.push(food1);
        speedSnake -=20;
   }
  }
  const checkCollision = () => {
      foods.forEach(food => {
          if(food.x === snakes[0].x && food.y === snakes[0].y){
              food.x = -100;
             
               isEat = true; 
            
            }
      });
foods = foods.filter((food) => food.x >=0);
  }

  const checkGameOver = () => {
     if(snakes[0].x < 0 || snakes[0].y < 0 || snakes[0].x > BLOCK * (SIZE -1) || snakes[0].y > BLOCK * (SIZE -1)){
        setGameOver(true);
     }
  }

  

  const render = (timestamp) => {
    
   
  
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    ctx.fillStyle = "white";

    snakes.forEach(element => {
        ctx.fillRect(element.x , element.y , BLOCK, BLOCK);
        ctx.fill();
        ctx.stroke();
    });

    for (let index = 0; index < snakes.length; index++) {
        if(index === 0 ){
            ctx.fillStyle = "green";
            ctx.fillRect(snakes[index].x , snakes[index].y , BLOCK, BLOCK);
            ctx.fill();
            ctx.stroke(); 
            ctx.fillStyle = "white"; 
        } else{
            ctx.fillRect(snakes[index].x , snakes[index].y , BLOCK, BLOCK);
            ctx.fill();
            ctx.stroke();
        }
      }
        ctx.fillStyle = "red"; 
        foods.forEach(food => {
            ctx.fillRect(food.x , food.y , BLOCK, BLOCK);
            ctx.fill();
            ctx.stroke();
        });
        ctx.fillStyle = "white"; 
        


 
    //ctx.font = "25px serif";
   // ctx.fillText("score:" + currentTime, 200  , 200);
   // ctx.fillText("score2:" + startGameTime, 200  , 300);
   if(currentTime - TimeForSnakes > speedSnake){
    movementSnake();
    spawnFood();
    checkCollision();
    checkGameOver();
    TimeForSnakes = currentTime
}

  };

  const handleClick = (choice) =>{
      
    if(choice === "yes"){
        snakes = [{x: BLOCK * 5,y:BLOCK * 3},{x:BLOCK*4,y: BLOCK*3}];
        foods = [];
        setGameOver(false);
    } else callback2('none')
    
}

  if(!isGameOver){
  return (
    <canvas id="canvasSnake" className="canvasSnake" 
    width="600" height="600" ref={canvasRef}></canvas>
  );
  } else{
      if(!returnMenu){
      return (
      <div style={{position:"relative"}}>
      <img src={gameOverImg} width="1200" alt="game over"></img>
      <span className="yesSnake" onClick={() => handleClick("yes")}>YES</span>
      <span className="noSnake"onClick={() => handleClick("no")}>NO</span>
      </div>
      )
      }
  }
};

export default Snake;
