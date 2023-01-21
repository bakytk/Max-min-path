// JavaScript program to find the shortest
// path between a given source cell
// to a destination cell.

const ROW = 9;
const COL = 10;

// To store matrix cell coordinates
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// A data structure for queue used in BFS
class queueNode {
  constructor(pt, dist) {
    this.pt = pt; // The coordinates of the cell
    this.dist = dist; // Cell's distance from the source
  }
}

// Check whether given cell(row,col)
// is a valid cell or not
function isValid(row, col) {
  return row >= 0 && row < ROW && col >= 0 && col < COL;
}

// These arrays are used to get row and column
// numbers of 4 neighbours of a given cell?
let rowNum = [-1, 0, 0, 1];
let colNum = [0, -1, 1, 0];

// Function to find the shortest path between
// a given source cell to a destination cell.
function BFS(mat, src, dest) {
  // check source and destination cell
  // of the matrix have value 1
  if (mat[src.x][src.y] != 1 || mat[dest.x][dest.y] != 1) return -1;

  let visited = new Array(ROW)
    .fill(false)
    .map(() => new Array(COL).fill(false));

  // Mark the source cell as visited
  visited[src.x][src.y] = true;

  // Create a queue for BFS
  let q = [];

  // Distance of source cell is 0
  let s = new queueNode(src, 0);
  q.push(s);
  // Enqueue source cell

  // Do a BFS starting from source cell
  while (q) {
    let curr = q.shift(); // Dequeue the front cell

    // If we have reached the destination cell,
    // we are done
    let pt = curr.pt;
    if (pt.x == dest.x && pt.y == dest.y) return curr.dist;

    // Otherwise enqueue its adjacent cells
    for (let i = 0; i < 4; i++) {
      let row = pt.x + rowNum[i];
      let col = pt.y + colNum[i];

      // if adjacent cell is valid, has path
      // and not visited yet, enqueue it.
      if (isValid(row, col) && mat[row][col] == 1 && !visited[row][col]) {
        visited[row][col] = true;
        let Adjcell = new queueNode(new Point(row, col), curr.dist + 1);
        q.push(Adjcell);
      }
    }
  }
  // Return -1 if destination cannot be reached
  return -1;
}

// Driver code
export const minPath = async maze => {
  let mat = [
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

  let source = new Point(0, 0);
  let dest = new Point(3, 4);

  let dist = BFS(mat, source, dest);

  if (dist != -1) return dist;
  else return -1;
};
