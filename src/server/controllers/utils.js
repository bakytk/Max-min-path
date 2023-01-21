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

export const constructMatrix = async maze => {
  let { gridSize, entrance, walls } = maze;
  console.log("constructMatrix: ", gridSize, entrance, walls);
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
  return matrix;
};
