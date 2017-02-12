//get canvas
var canvas = document.getElementById("maze-canvas");
var context = canvas.getContext("2d");


//change canvas size
var canvasContainer = document.getElementById("canvas-container");
console.log(canvasContainer.offsetWidth);
canvas.style.width = canvasContainer.offsetWidth;
canvas.style.height = canvasContainer.offsetHeight;

//generate maze
var maze = new MazeGenerator(20, 10);
maze.generateMaze();
var mazeGrid = maze.getGrid();

var squareSize = 19;

//function for drawing square
var mkSquare = function(x, y) {
  var posX = squareSize*x;
  var posY = squareSize*y;

  context.beginPath();
  context.rect(posX, posY, squareSize, squareSize);
  context.fillStyle = "#6666FF";
  context.fill();
}

//display maze
for (var i = 0; i < mazeGrid.length; i++) {
  for (var j = 0; j < mazeGrid[i].length; j++) {
    if (mazeGrid[i][j]) {
      mkSquare(i, j);
    }
  }
}
