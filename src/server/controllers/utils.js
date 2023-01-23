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
    this.prev = "";
  }
  set_previous(cellAddress) {
    //console.log(this.name);
    this.prev = cellAddress;
  }
}

export const recoverPath = async history => {
  /*
    -start from tail
    -if preceding cell address = current.prev, push to result
  */
  let result = [];
  //let prev = history[history.length - 1]["prev"];
  let expected_previous = "";

  for (let [i, node] of history.reverse().entries()) {
    //let node = history.pop();
    let { point, prev } = node;
    let { x, y } = point;
    let convert = await letterCellValue([[x, y]]);
    let letterAddress = convert[0];
    //console.log("recoverPath letterAddress: ", letterAddress);

    if (i === 0) {
      result.push(letterAddress);
      expected_previous = prev;
    } else {
      if (expected_previous === letterAddress) {
        result.unshift(letterAddress);
        expected_previous = prev;
      }
    }
  }
  return result;
};

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

export const longestExitPath = async (exits, history) => {
  let max_dist = 0;
  for (let exit of exits) {
    let { dist } = exit;
    if (dist > max_dist) {
      max_dist = dist;
    }
  }

  let finalAddress = "";
  let expected_previous = "";

  for (let exit of exits) {
    let { point, dist } = exit;
    if (dist === max_dist) {
      let { point, prev } = exit;
      let { x, y } = point;
      let convert = await letterCellValue([[x, y]]);
      finalAddress = convert[0];
      expected_previous = prev;
    }
  }

  let result = [];
  result.push(finalAddress);

  for (let [i, node] of history.reverse().entries()) {
    let { point, prev } = node;
    let { x, y } = point;
    let convert = await letterCellValue([[x, y]]);
    let letterAddress = convert[0];

    if (expected_previous === letterAddress) {
      result.unshift(letterAddress);
      expected_previous = prev;
    }
  }
  return result;
};

export const anyExit = async (point, matrix) => {
  let { x, y } = point;
  let last_row = matrix.length - 1;
  let width = matrix[0].length;
  //console.log("last_row", x, y, width, last_row, x === last_row);
  if (x === last_row) {
    for (let w = 0; w < width; w++) {
      //if cell not = 0
      //console.log("matrix[x][w]", w, matrix[x][w]);
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
