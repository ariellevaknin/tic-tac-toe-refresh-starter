const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);
    Screen.setBackgroundColor(0, 0, 'yellow');

    Screen.addCommand('up', 'Press up to go Up', () => { this.cursorMove(this.cursor.up); });
    Screen.addCommand('down', 'Press down to go Down', () => { this.cursorMove(this.cursor.down); });
    Screen.addCommand('left', 'Press left to go Left', () => { this.cursorMove(this.cursor.left); });
    Screen.addCommand('right', 'Press right to go Rsight', () => { this.cursorMove(this.cursor.right); });

    // Add command for placing a move
    Screen.addCommand('j', 'Press j to place move', () => { this.placeMove(); });

    Screen.render();
  }

  cursorMove(cursorMoveFunction) {
    cursorMoveFunction.call(this.cursor);
    Screen.render();
  }

  placeMove() {
    const newRow = this.cursor.row;
    const newCol = this.cursor.col;

    // Check if the selected tile is empty
    if (this.grid[newRow][newCol] === ' ') {
      // Place the move
      this.grid[newRow][newCol] = this.playerTurn;

      // Switch player turns
      this.playerTurn = this.playerTurn === 'O' ? 'X' : 'O';

      Screen.setGrid(newRow, newCol, this.grid[newRow][newCol]);

      // Check for win or tie after the move
      const winResult = TTT.checkWin(this.grid);
      if (winResult) {
        TTT.endGame(winResult);
      }
    }

    Screen.render();
  }

  updateGrid() {
    // Use Screen.setGrid to update the grid based on the cursor's position
    // Example: Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
    // You may need to modify this based on your game logic
    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
    // You might also want to set text or background colors using Screen.setTextColor and Screen.setBackgroundColor
    // Example: Screen.setBackgroundColor(this.cursor.row, this.cursor.col, 'yellow');
    Screen.render(); // Render the updated grid
  }


  static checkWin(grid) {
    let blank = 0;

    for (let i = 0; i < grid.length; i++) {
      let horX = 0;
      let horO = 0;

      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === ' ') blank++;
        if (grid[i][j] === 'X') horX++;
        if (grid[i][j] === "O") horO++;
      }

      if (horX === 3) return 'X';
      if (horO === 3) return 'O';
   
    }

    if (grid[0][0] === 'X' && grid[1][0] === 'X' && grid[2][0] === 'X') return 'X';
    if (grid[0][1] === 'X' && grid[1][1] === 'X' && grid[2][1] === 'X') return 'X';
    if (grid[0][2] === 'X' && grid[1][2] === 'X' && grid[2][2] === 'X') return 'X';

    if (grid[0][0] === 'O' && grid[1][0] === 'O' && grid[2][0] === 'O') return 'O';
    if (grid[0][1] === 'O' && grid[1][1] === 'O' && grid[2][1] === 'O') return 'O';
    if (grid[0][2] === 'O' && grid[1][2] === 'O' && grid[2][2] === 'O') return 'O';

    if (grid[0][0] === 'X' && grid[1][1] === 'X' && grid[2][2] === 'X') return 'X';
    if (grid[0][1] === 'O' && grid[1][1] === 'O' && grid[2][1] === 'O') return 'O';
    if (grid[0][2] === 'X' && grid[1][1] === 'X' && grid[2][0] === 'X') return 'X';
    if (grid[0][2] === 'O' && grid[1][1] === 'O' && grid[2][0] === 'O') return 'O';
    
    if (blank === 9) return false;

    for (let a = 0; a < grid.length; a++) {
      for (let b = 0; b < grid[a].length; b++) {
        if (grid[a][b] === ' ') return false;
      }
    }

    return 'T';
  
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
