import { Point, qNode, canVisit, constructMatrix } from "./utils.js";

export const minPath = async maze => {
  try {
    //console.log("mazeInput:", maze);
    let source = new Point(0, 0);
    let dest = new Point(3, 4);
    let matrix = await constructMatrix(maze);
    let dist = await BFSearch(matrix, source, dest);
    return dist;
  } catch (e) {
    throw e;
  }
};

// get shortest path or throw
const BFSearch = async (matrix, src, dest) => {
  //init visited bool matrix
  if (matrix[src.x][src.y] != 1 || matrix[dest.x][dest.y] != 1) return -1;
  let visited = new Array(matrix.length)
    .fill(false)
    .map(() => new Array(matrix[0].length).fill(false));
  //console.log("visited", visited);

  // init queue & params
  visited[src.x][src.y] = true;
  let queue = [];
  let start = new qNode(src, 0);
  queue.push(start);
  while (queue) {
    let current = queue.shift();
    let { point, dist } = current;
    if (point.x == dest.x && point.y == dest.y) return dist;

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
