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

export const maxPath = async maze => {
  try {
    //console.log("mazeInput:", maze);
    let { matrix, entrance } = await buildMaze(maze);
    let { point, dist } = await DFSearch(matrix, entrance);
    console.log("exiting DF search:", point, dist);
    //build linkedList from history & dist
    return dist;
  } catch (e) {
    throw e;
  }
};

// get shortest path or throw
const DFSearch = async (matrix, entry) => {
  try {
    //init visited bool matrix
    console.log("DF.entry", entry);
    let src = new Point(entry[0], entry[1]);

    //init bool array
    let height = matrix.length;
    let width = matrix[0].length;
    let visited = construct2DArray(height, width, false);
    //console.log("visited", visited);

    // init queue & params
    visited[src.x][src.y] = true;

    //track history as tree
    let history = [];

    async function traverse(node) {
      // return new Promise(async (resolve, reject) => {
      let { point, dist } = node;
      let { x, y } = point;

      //record traverse history
      let result = await letterCellValue([[x, y]]);
      console.log("\ncurrent cell: ", result[0]);
      console.log("\nx, y: ", x, y);
      history.push(result[0]);
      console.log("interim history:", history);

      //check if any exit
      let isExit = await anyExit(point, matrix);
      if (isExit) {
        console.log("reaching exit condition");
        return node;
        // resolve(node);
      }

      // compared to bfs, values updated to stray away
      let rNum = [-1, 0, 0, 1];
      let cNum = [0, 1, -1, 0];

      //assign priority to go back
      let priority = [-100, -100, -100, -100];
      for (let i = 0; i < 4; i++) {
        let row = point.x + rNum[i];
        let col = point.y + cNum[i];
        if (
          row < 0 ||
          col < 0 ||
          matrix[row][col] == 0 ||
          !canVisit(row, col, matrix)
        )
          continue;
        console.log("for-loop-entry: ", row, col);
        console.log("can visit: ", canVisit(row, col, matrix));
        console.log("matrix[row][col] == 1: ", matrix[row][col] == 1);
        console.log("!visited[row][col]: ", !visited[row][col], "\n");
        if (!visited[row][col]) {
          console.log("if passed: canVisit(row, col)", row, col);
          visited[row][col] = true;
          let newNode = new qNode(new Point(row, col), dist + 1);
          return await traverse(newNode);
        } else {
          //go back
        }
      }
    }

    //start dfs search
    let start = new qNode(src, 0);
    let result = await traverse(start);
    console.log("dfs result:", result);
    return result;
  } catch (e) {
    //return new Error("Maze solution not found !");
    throw new Error(`${e.message}`);
  }
};
