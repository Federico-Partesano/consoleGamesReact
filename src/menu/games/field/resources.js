import grey from "./../../../images/field/grey.png";
import white from "./../../../images/field/white.jpg";
import one from "./../../../images/field/one2.png";
import two from "./../../../images/field/two2.png";
import three from "./../../../images/field/three2.png";
import four from "./../../../images/field/four2.png";
import five from "./../../../images/field/five.png";
import six from "./../../../images/field/six.png";
import seven from "./../../../images/field/seven.png";
import heightNumber from "./../../../images/field/height.png";

import bomb from "./../../../images/field/bomb.jpg";
export const size = 25;
export const generateField = () => {
  let f = [];

  for (let row = 0; row < 20; row++) {
    f[row] = [];
    f[row] = [];
  }

  for (let row = 0; row < 20; row++) {
    for (let colum = 0; colum < 20; colum++) {
      let isBomb = false;
      let randomBomb = Math.random() * 10;
      // Probabilità
      if (randomBomb > 9) {
        isBomb = true;
      }
      f[row][colum] = { bomb: isBomb, showed: grey, bombAdiacent: bomb };
    }
  }

  for (let row = 0; row < 20; row++) {
    for (let colum = 0; colum < 20; colum++) {
      if (f[row][colum].bomb) {
        continue;
      }
      let count = 0;

      try {
        if (f[row - 1][colum - 1].bomb) {
          count += 1;
        }
      } catch (error) {}
      try {
        if (f[row - 1][colum + 1].bomb) {
          count += 1;
        }
      } catch (error) {}
      try {
        if (f[row - 1][colum].bomb) {
          count += 1;
        }
      } catch (error) {}

      try {
        if (f[row + 1][colum + 1].bomb) {
          count += 1;
        }
      } catch (error) {}
      try {
        if (f[row + 1][colum - 1].bomb) {
          count += 1;
        }
      } catch (error) {}
      try {
        if (f[row + 1][colum].bomb) {
          count += 1;
        }
      } catch (error) {}

      try {
        if (f[row][colum - 1].bomb) {
          count += 1;
        }
      } catch (error) {}
      try {
        if (f[row][colum + 1].bomb) {
          count += 1;
        }
      } catch (error) {}

      switch (count) {
        case 0:
          f[row][colum].bombAdiacent = white;
          break;
        case 1:
          f[row][colum].bombAdiacent = one;
          break;
        case 2:
          f[row][colum].bombAdiacent = two;
          break;
        case 3:
          f[row][colum].bombAdiacent = three;
          break;
        case 4:
          f[row][colum].bombAdiacent = four;
          break;
        case 5:
          f[row][colum].bombAdiacent = five;
          break;
        case 6:
          f[row][colum].bombAdiacent = six;
          break;
        case 7:
          f[row][colum].bombAdiacent = seven;
          break;
        case 8:
          f[row][colum].bombAdiacent = heightNumber;
          break;
        default:
          f[row][colum].bombAdiacent = white;
          break;
      }
    }
  }
  return f;
};

export const countAdiacentBoom = (f, x, y) => {
  let count = 0;

  try {
    if (f[x - 1][y - 1].bomb) {
      count += 1;
    }
  } catch (error) {}
  try {
    if (f[x - 1][y + 1].bomb) {
      count += 1;
    }
  } catch (error) {}
  try {
    if (f[x - 1][y].bomb) {
      count += 1;
    }
  } catch (error) {}

  try {
    if (f[x + 1][y + 1].bomb) {
      count += 1;
    }
  } catch (error) {}
  try {
    if (f[x + 1][y - 1].bomb) {
      count += 1;
    }
  } catch (error) {}
  try {
    if (f[x + 1][y].bomb) {
      count += 1;
    }
  } catch (error) {}

  try {
    if (f[x][y - 1].bomb) {
      count += 1;
    }
  } catch (error) {}
  try {
    if (f[x][y + 1].bomb) {
      count += 1;
    }
  } catch (error) {}

  switch (count) {
    case 0:
      return white;

    case 1:
      return one;
    case 2:
      return two;
    case 3:
      return three;
    case 4:
      return four;
    case 5:
      return five;
    case 6:
      return six;
    case 7:
      return seven;
    case 8:
      return heightNumber;
    default:
      return white;
  }
};
