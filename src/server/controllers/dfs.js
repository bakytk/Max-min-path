import {
  Point,
  qNode,
  canVisit,
  buildMaze,
  construct2DArray,
  letterCellValue,
  anyExit,
  recoverPath
} from "./utils.js";

export const maxPath = async maze => {
  try {
    //console.log("mazeInput:", maze);
    let { matrix, entrance } = await buildMaze(maze);
    let { history, dist } = await DFSearch(matrix, entrance);
    //console.log("bfs history, dist: ", history, dist);
    let path = await recoverPath(history);
    //console.log("dfs path: ", path.length, dist);
    return path;
  } catch (e) {
    throw e;
  }
};

// get shortest path or throw
const DFSearch = async (matrix, entry) => {
  try {
    //init visited bool matrix
    let src = new Point(entry[0], entry[1]);

    //init bool array
    let height = matrix.length;
    let width = matrix[0].length;
    let visited = construct2DArray(height, width, false);
    //console.log("visited", visited);

    // init queue & params
    visited[src.x][src.y] = true;

    //track history of nodes
    let history = [];

    async function traverse(node) {
      let { point, dist } = node;
      let { x, y } = point;
      let result = await letterCellValue([[x, y]]);
      let cellAddress = result[0];

      //record traverse history
      history.push(node);
      //console.log("interim history:", history);

      //check if any exit
      let isExit = await anyExit(point, matrix);
      if (isExit) {
        return { history, dist };
      }

      // compared to bfs, values updated to stray away
      let rNum = [-1, 0, 0, 1];
      let cNum = [0, 1, -1, 0];
      for (let i = 0; i < 4; i++) {
        let row = point.x + rNum[i];
        let col = point.y + cNum[i];
        if (
          row < 0 ||
          col < 0 ||
          matrix[row][col] == 0 ||
          !canVisit(row, col, matrix) ||
          visited[row][col]
        ) {
          continue;
        } else {
          visited[row][col] = true;
          let newNode = new qNode(new Point(row, col), dist + 1);
          newNode.set_previous(cellAddress);
          return await traverse(newNode);
        }
      }
    }

    //start dfs search
    let start = new qNode(src, 0);
    let result = await traverse(start);
    //console.log("dfs result:", result);
    return result;
  } catch (e) {
    //return new Error("Maze solution not found !");
    throw new Error(`${e.message}`);
  }
};
