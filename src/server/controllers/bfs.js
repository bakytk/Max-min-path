import {
  Point,
  qNode,
  canVisit,
  buildMaze,
  construct2DArray,
  letterCellValue
} from "./utils.js";
//import { linkedList } from "./linked_list.js";

export const minPath = async maze => {
  try {
    //console.log("mazeInput:", maze);
    let { matrix, entrance } = await buildMaze(maze);
    let dist = await BFSearch(matrix, entrance);
    return dist;
  } catch (e) {
    throw e;
  }
};

//25b785e8-9173-4fea-9ec8-fd443c08471d: B4 -> A5
//4608fced-c83b-4193-b176-65c21999aee7

// get shortest path or throw
const BFSearch = async (matrix, entry) => {
  //init visited bool matrix
  console.log("BFinput", matrix, entry);
  let src = new Point(0, 0);
  let dest = new Point(0, 7);
  if (matrix[src.x][src.y] != 1 || matrix[dest.x][dest.y] != 1) return -1;

  //init bool array
  let height = matrix.length;
  let width = matrix[0].length;
  let visited = construct2DArray(height, width, false);
  //console.log("visited", visited);

  // init queue & params
  visited[src.x][src.y] = true;
  let queue = [];

  //track history
  let history = [];

  let start = new qNode(src, 0);
  queue.push(start);
  while (queue) {
    let current = queue.shift();
    let { point, dist } = current;
    let { x, y } = point;

    //record traverse history
    let result = letterCellValue([[x, y]]);
    history.push(result[0]);

    //check if exit
    if (point.x == dest.x && point.y == dest.y) {
      console.log("history:", history);
      return dist;
    }

    // traverse adjacent cells & push to queue
    //loops to traverse cell values in four directions
    let rNum = [-1, 0, 0, 1];
    let cNum = [0, -1, 1, 0];
    for (let i = 0; i < 4; i++) {
      let row = point.x + rNum[i];
      let col = point.y + cNum[i];
      if (
        canVisit(row, col, matrix) &&
        matrix[row][col] == 1 &&
        !visited[row][col]
      ) {
        visited[row][col] = true;
        let newCell = new qNode(new Point(row, col), dist + 1);
        queue.push(newCell);
      }
    }
  }
  throw new Error("Maze solution not found !");
};
