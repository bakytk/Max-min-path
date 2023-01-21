const ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class qNode {
  constructor(point, dist) {
    this.point = point; // cell coordinates
    this.dist = dist; // from source
  }
}

export const canVisit = (row, col, matrix) => {
  let HEIGHT = matrix.length;
  let WIDTH = matrix[0].length;
  return row >= 0 && row < HEIGHT && col >= 0 && col < WIDTH;
};

export const construct2DArray = (height, width, seed) => {
  return new Array(height).fill(seed).map(() => new Array(width).fill(seed));
};

const numericCellValue = arr => {
  let result = [];
  for (const str of arr) {
    let [letter, num] = str.split("");
    if (!ALPHABET.includes(letter)) {
      throw new Error(`Inappropriate character for cell letter : ${letter}!`);
    }
    let first = Number(num) - 1;
    let second = ALPHABET.indexOf(letter);
    result.push([first, second]);
  }
  return result;
};

export const letterCellValue = async arr => {
  let result = [];
  for (let [x, y] of arr) {
    let letter = ALPHABET[y];
    let num = x + 1;
    result.push(letter + num);
  }
  return result;
};

export const anyExit = async (point, matrix) => {
  let { x, y } = point;
  let last_row = matrix.length - 1;
  let width = matrix[0].length;
  console.log("last_row", x, y, width, last_row, x === last_row);
  if (x === last_row) {
    for (let w = 0; w < width; w++) {
      //if cell not = 0
      console.log("matrix[x][w]", w, matrix[x][w]);
      if (matrix[x][w]) {
        if (y === w) return true;
      }
    }
  }
  return false;
};

export const buildMaze = async maze => {
  let { gridSize, entrance: entry_cell, walls } = maze;
  let entrance = numericCellValue([entry_cell])[0];

  let matrix = construct2DArray(gridSize[0], gridSize[1], 1);
  let numericWalls = numericCellValue(walls);
  for (let [x, y] of numericWalls) {
    matrix[x][y] = 0;
  }
  return { matrix, entrance };
};
