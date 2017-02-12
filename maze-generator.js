var MazeGenerator = function(w, h) {
  //Add space for walls
  this.width = w*2+1;
  this.height = h*2+1;

  //Maze grid
  this.maze = new Array(this.width);;

  //Init grid
  for (var i = 0; i < this.width; i++) {
    this.maze[i] = new Array(this.height);
  }

  for (var i = 0; i < this.width; i++) {
    for (var j = 0; j < this.height; j++) {
      if (i%2 == 0 && j%2 == 0) {
        this.maze[i][j] = true;
      } else if (i==0 || i == this.width-1 || j == 0 || j == this.height-1) {
        this.maze[i][j] = true;
      } else {
        this.maze[i][j] = false;
      }
    }
  }
}

MazeGenerator.prototype.isSquareBorderWall = function(x, y) {
  if (x == 0 || y == 0 || x == this.width-1 || y == this.height-1) {
    return true;
  }
  return false;
}

MazeGenerator.prototype.isSquareConnected = function(x, y) {
  if (this.isSquareBorderWall(x, y)) {
    return true;
  }

  return (this.maze[x-1][y] ||
          this.maze[x+1][y] ||
          this.maze[x][y-1] ||
          this.maze[x][y+1]);
}

MazeGenerator.prototype.isInHistory = function(x, y, hist) {
  var isInHistory = false;
  for (var i = 0; i < hist.length; i++) {
    if (hist[i][0] == x && hist[i][1] == y) {
      isInHistory = true;
    }
  }

  return isInHistory;
}

MazeGenerator.prototype.findPossiblePath = function(x, y, hist) {
  var posibilities = new Array();

  if (!this.isInHistory(x + 2, y, hist)) {
    posibilities.push([x + 2, y]);
  }

  if (!this.isInHistory(x, y + 2, hist)) {
    posibilities.push([x, y + 2]);
  }

  if (!this.isInHistory(x - 2, y, hist)) {
    posibilities.push([x - 2, y]);
  }

  if (!this.isInHistory(x, y - 2, hist)) {
    posibilities.push([x, y - 2]);
  }

  //if no posibilities
  if (posibilities.length == 0) {
    //done
    return null;
  }

  var randomDirection = Math.floor(Math.random() * posibilities.length);

  return posibilities[randomDirection];
}

MazeGenerator.prototype.mkMazeWallStep = function(x, y, hist) {

  //is block connected
  var done = this.isSquareConnected(x, y);

  //if not first coords
  if (hist.length != 0) {
    //build wall between actual last path
    this.maze[(hist[hist.length-1][0] + x) / 2][(hist[hist.length-1][1] + y) / 2] = true;
  }

  //if block is connected befot the last wall build
  if (done) {
    return ;  //done
  };

  //add to history
  hist.push([x, y]);

  //get some random path from actual position
  var randomPath = this.findPossiblePath(x, y, hist);

  //if no path possible
  if (randomPath == null) {
    return ;  //done
  }

  this.mkMazeWallStep(randomPath[0], randomPath[1], hist);
}

// 2 dors are generated one at the top and the other at the bottom
MazeGenerator.prototype.generateDoors = function() {
  var borderLength = (this.width - 1) / 2;
  var firstDoorPosition = Math.floor(Math.random() * borderLength);

  var secondDoorPosition = borderLength - firstDoorPosition - 1;

  this.maze[1 + firstDoorPosition*2][0] = false;
  this.maze[1 + secondDoorPosition*2][this.height-1] = false;
}

MazeGenerator.prototype.generateMaze = function() {
  //TODO optimise
  for (var i = 0; i < this.width; i++) {
    for (var j = 0; j < this.height; j++) {
      if (i%2 == 0 && j%2 == 0 && !this.isSquareBorderWall(i, j)) {
        this.mkMazeWallStep(i, j, []);
      }
    }
  }
  this.generateDoors();
  console.log("Done");
}

MazeGenerator.prototype.getGrid = function() {
  return this.maze;
}
