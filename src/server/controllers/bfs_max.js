import {
  Point,
  qNode,
  canVisit,
  buildMaze,
  construct2DArray,
  letterCellValue,
  anyExit,
  recoverPath,
  longestExitPath
} from "./utils.js";

export const maxPath = async maze => {
  try {
    //console.log("mazeInput:", maze);
    let { matrix, entrance } = await buildMaze(maze);
    let path = await BFSearch(matrix, entrance);
    console.log("bfs path: ", path.length);
    return path;
  } catch (e) {
    throw e;
  }
};

// get shortest path or throw
const BFSearch = async (matrix, entry) => {
  //init visited bool matrix
  let src = new Point(entry[0], entry[1]);

  //init bool array
  let height = matrix.length;
  let width = matrix[0].length;
  let visited = construct2DArray(height, width, false);
  //console.log("visited", visited);

  // init queue & params
  visited[src.x][src.y] = true;
  let queue = [];
  let exits = [];
  let start = new qNode(src, 0);
  queue.push(start);

  //track history as tree & linked list for path
  let history = [];

  while (queue.length > 0) {
    let current = queue.shift();
    console.log("current", current);

    let { point, dist } = current;
    let { x, y } = point;

    //record traverse history
    let result = await letterCellValue([[x, y]]);
    let cellAddress = result[0];
    console.log("currentAddress", cellAddress);
    history.push(current);

    //check if any exit
    let isExit = await anyExit(point, matrix);
    if (isExit) {
      console.log("exitPoint:", point);
      exits.push(current);
    }

    // traverse adjacent cells & push to queue
    // loops to traverse cell values in four directions
    let rNum = [1, 0, 0, -1];
    let cNum = [0, 1, -1, 0];
    for (let i = 0; i < 4; i++) {
      let row = point.x + rNum[i];
      let col = point.y + cNum[i];
      if (row < 0 || col < 0) continue;
      if (!canVisit(row, col, matrix) && matrix[row][col] == 0) continue;
      if (!visited[row][col]) {
        visited[row][col] = true;
        let newNode = new qNode(new Point(row, col), dist + 1);
        newNode.set_previous(cellAddress);
        queue.push(newNode);
      } else {
        queue.pop();
      }
    }
  }
  if (exits.length > 0) {
    return await longestExitPath(exits, history);
  } else {
    throw new Error("Maze exit not found !");
  }
};
