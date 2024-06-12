const Screen = require("./screen");
const TTT = require("./ttt");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {
    if (this.row > 0){
      resetBackgroundColor();
      this.row--;
      setBackgroundColor();
    }
  }

  down() {
    if (this.row < 2){
      resetBackgroundColor();
      this.row++;
      setBackgroundColor();
    }
  }

  left() {
    if (this.col > 0){
      resetBackgroundColor();
      this.col--;
      setBackgroundColor();
    }
  }

  right() {
    if (this.col < 2){
      resetBackgroundColor();
      this.col++;
      setBackgroundColor();
    }
  }

}


module.exports = Cursor;
