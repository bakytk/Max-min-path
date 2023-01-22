import {
  Point,
  qNode,
  canVisit,
  buildMaze,
  construct2DArray,
  letterCellValue,
  anyExit
} from "./utils.js";
//import { linkedList } from "./linked_list.js";
import Tree from "./tree.js";

export const minPath = async maze => {
  try {
    //console.log("mazeInput:", maze);
    let { matrix, entrance } = await buildMaze(maze);
    let { history, dist } = await BFSearch(matrix, entrance);
    //build linkedList from history & dist
    return dist;
  } catch (e) {
    throw e;
  }
};

// get shortest path or throw
const BFSearch = async (matrix, entry) => {
  //init visited bool matrix
  console.log("BF.entry", entry);
  let src = new Point(entry[0], entry[1]);

  //init bool array
  let height = matrix.length;
  let width = matrix[0].length;
  let visited = construct2DArray(height, width, false);
  //console.log("visited", visited);

  // init queue & params
  visited[src.x][src.y] = true;
  let queue = [];

  //track history as tree
  let history = [];

  let start = new qNode(src, 0);
  queue.push(start);
  while (queue) {
    console.log("queue", queue, queue.length);
    let current = queue.shift();

    let { point, dist } = current;
    let { x, y } = point;

    //record traverse history
    let result = await letterCellValue([[x, y]]);
    history.push(result[0]);
    console.log("interim history", history);

    //check if any exit
    let isExit = await anyExit(point, matrix);
    if (isExit) {
      return { history, dist };
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
        let newNode = new qNode(new Point(row, col), dist + 1);
        queue.push(newNode);
      }
    }
  }
  throw new Error("Maze solution not found !");
};
