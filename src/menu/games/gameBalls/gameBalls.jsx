import React from "react";
import Sketch from "react-p5";
import { cos, atan2, sqrt, sin } from "mathjs";

let width = 1200;
let height = 800;
let numBalls = 13;
let spring = 0.05;
let gravity = 0.03;
let friction = -0.9;
let balls = [];
let toggleIndexBall = null;
// eslint-disable-next-line
let lastFramePress = false;
let toggle = false;

const P5 = (p5) => {
  //let x = 50;
  // let y = 50;
  const addBall = (xin, yin, din, idin, oin) => {
    return {
      x: xin,
      y: yin,
      vx: 0,
      vy: 0,
      diameter: din,
      id: idin,
      others: oin,
    };
  };

  const collide = (ball) => {
    for (let i = ball.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = ball.others[i].x - ball.x;
      let dy = ball.others[i].y - ball.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = ball.others[i].diameter / 2 + ball.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = ball.x + cos(angle) * minDist;
        let targetY = ball.y + sin(angle) * minDist;
        let ax = (targetX - ball.others[i].x) * spring;
        let ay = (targetY - ball.others[i].y) * spring;
        ball.vx -= ax;
        ball.vy -= ay;
        ball.others[i].vx += ax;
        ball.others[i].vy += ay;
      }
    }
  };

  const move = (ball) => {
    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x + ball.diameter / 2 > width) {
      ball.x = width - ball.diameter / 2;
      ball.vx *= friction;
    } else if (ball.x - ball.diameter / 2 < 0) {
      ball.x = ball.diameter / 2;
      ball.vx *= friction;
    }
    if (ball.y + ball.diameter / 2 > height) {
      ball.y = height - ball.diameter / 2;
      ball.vy *= friction;
    } else if (ball.y - ball.diameter / 2 < 0) {
      ball.y = ball.diameter / 2;
      ball.vy *= friction;
    }
  };

  const display = (p5, ball) => {
    p5.ellipse(ball.x, ball.y, ball.diameter, ball.diameter);
  };

  const checkMouse = (p5) => {
    Object.keys(balls).forEach((key) => {
      if (
        p5.dist(p5.mouseX, p5.mouseY, balls[key].x, balls[key].y) <
        balls[key].diameter / 2
      ) {
        toggle = true;
        toggleIndexBall = key;
      }
    });
  };

  const mouseReleased = () => {
    toggle = false;
    if (toggleIndexBall !== null) {
      balls[toggleIndexBall].vx = 0;
      balls[toggleIndexBall].vy = 0;
      toggleIndexBall = null;
    }

    console.log("fuoeri");
  };

  const toggleBall = (p5) => {
    if (!toggle) {
      return;
    } else {
      balls[toggleIndexBall].x = p5.mouseX;
      balls[toggleIndexBall].y = p5.mouseY;
    }
  };
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    for (let i = 0; i < numBalls; i++) {
      balls[i] = addBall(
        p5.random(width),
        p5.random(height),
        p5.random(30, 70),
        i,
        balls
      );
    }
    p5.noStroke();
    p5.fill(255, 204);
  };

  const draw = (p5) => {
    p5.background(0);

    //p5.ellipse(x, y, 70, 70);
    balls.forEach((ball) => {
      collide(ball);
      move(ball);
      display(p5, ball);
      toggleBall(p5);
      //checkMouse(p5);
    });
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={checkMouse}
      mouseReleased={mouseReleased}
    />
  );
};

export default P5;
// NOTE: Do not use setState in the draw function or in functions that are executed
// in the draw function...
// please use normal variables or class properties for these purposes
