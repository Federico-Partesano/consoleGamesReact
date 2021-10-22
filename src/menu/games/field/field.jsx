import React, { useState, useMemo } from "react";
import { size, countAdiacentBoom, generateField } from "./resources";
//import { gsap } from "gsap";
import grey from "./../../../images/field/grey.png";
import white from "./../../../images/field/white.jpg";
import Cell from "./cell";
//import { render } from "react-dom";
import "../../../css/Game.css";

let countClick = 0;
let field = generateField();

//------------------------------------------------------------//
const Field = ({ callback2 }) => {
  const GenerateCell = (element, size, x, y) => {
    return useMemo(
      () => (
        <Cell
          key={x + "-" + y}
          bomb={element.bomb}
          show={element.showed}
          adiacent={element.bombAdiacent}
          x={x}
          y={y}
          size={size}
          callback={() => handlerClick(x, y)}
        />
      ),
      // eslint-disable-next-line
      [element.showed]
    );
  };

  // eslint-disable-next-line
  const [fieldClicked, setFieldClicked] = useState();
  const [gameOver, setGameOver] = useState(false);

  const showAllCell = () => {
    field.forEach((row) => {
      row.forEach((element) => {
        element.showed = element.bombAdiacent;
      });
    });
  };

  const resetField = () => {
    field = generateField();
    setGameOver(false);
  };

  const handlerClick = (x, y) => {
    if (gameOver) {
      return;
    }

    if (countClick === 0) {
      countClick++;
      if (field[x][y].bomb) {
        field[x][y].bomb = false;
        field[x][y].bombAdiacent = countAdiacentBoom(x, y);

        showedCell(x, y);
        setFieldClicked({ FieldX: x, FieldY: y });
        return;
      }
    } else {
      if (field[x][y].bomb) {
        showAllCell();

        setGameOver(true);
      }
    }
    countClick++;

    showedCell(x, y);
    setFieldClicked({ FieldX: x, FieldY: y });
  };

  const exit = () => {
    resetField();
    callback2("none");
  };

  const showedCell = (x, y) => {
    if (!field[x][y].bomb) {
      field[x][y].showed = field[x][y].bombAdiacent;

      for (let index = -1; index < 2; index++) {
        for (let index2 = -1; index2 < 2; index2++) {
          if (index === 0 && index2 === 0) {
            continue;
          }

          try {
            if (
              !field[x + index][y + index2].bomb &&
              field[x + index][y + index2].showed === grey
            ) {
              field[x + index][y + index2].showed =
                field[x + index][y + index2].bombAdiacent;
              if (field[x + index][y + index2].bombAdiacent === white) {
                showedCell(x + index, y + index2);
              }
            }
          } catch (error) {
            return;
          }
        }
      }

      // setFieldClicked({FieldX: x+1,FieldY: y+1});
    } else {
      field[x][y].showed = field[x][y].bombAdiacent;
    }
  };

  switch (gameOver) {
    case false:
      return <Grid field={field} generateCell={GenerateCell} />;

    case true:
      return (
        <Grid field={field} generateCell={GenerateCell}>
          <div
            style={{
              position: "absolute",
              width: 312,
              height: 109,
              top: 171,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              left: 92,
              backgroundColor: "grey",
            }}
          >
            <p>Vuoi giocare ancora?</p>
            <button onClick={resetField}>YES</button>
            <button onClick={exit}>NO</button>
          </div>
        </Grid>
      );

    default:
      break;
  }
};

export default Field;

const Grid = ({ generateCell, field, children }) => (
  <div style={{ margin: 100, position: "relative", width: 500, height: 500 }}>
    {field.map((row, x) => {
      return row.map((element, y) => generateCell(element, size, x, y));
    })}
    {children}
  </div>
);
