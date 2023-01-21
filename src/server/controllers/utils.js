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
    let [letter, second] = str.split("");
    if (!ALPHABET.includes(letter)) {
      throw new Error(`Inappropriate character for cell letter : ${letter}!`);
    }
    let first = ALPHABET.indexOf(letter);
    second = Number(second) - 1;
    result.push([first, second]);
  }
  return result;
};

export const letterCellValue = arr => {
  let result = [];
  for (let [x, y] of arr) {
    let letter = ALPHABET[x];
    let num = y + 1;
    result.push(letter + num);
  }
  return result;
};

export const buildMaze = async maze => {
  let { gridSize, entrance: entry_cell, walls } = maze;
  let entrance = numericCellValue([entry_cell])[0];

  let matrix_ = construct2DArray(gridSize[0], gridSize[1], 1);
  let numericWalls = numericCellValue(walls);
  for (let [x, y] of numericWalls) {
    matrix_[x][y] = 0;
  }
  //console.log("buildMaze: ", matrix_);

  let matrix = [
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 0, 0, 1]
  ];
  return { matrix: matrix_, entrance };
};
