const process = require("process");
const readline = require("readline");

const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this.currentPosition = [];
    this.gameOver = false;
    this.gameWon = false;
  }

  print() {
    for (let line of this._field) {
      console.log(line.join(""));
    }
  }

  moveUp(x, y) {
    if (y - 1 < 0) {
      console.log("out of bounds!");
      this.gameOver = true;
    } else if (this._field[y - 1][x] === hat) {
      console.log("You found your hat!");
      this.gameWon = true;
      this.gameOver = true;
    } else if (this._field[y - 1][x] === hole) {
      console.log("You fell into a deep black hole...");
      this.gameOver = true;
    } else if (this._field[y - 1][x] === fieldCharacter) {
      this._field[y][x] = fieldCharacter;
      this._field[y - 1][x] = pathCharacter;
    } else {
      console.log("out of bounds!");
      this.gameOver = true;
    }
  }
  moveDown(x, y) {
    if (y + 1 > this._field.length - 1) {
      console.log("out of bounds!");
      this.gameOver = true;
    } else if (this._field[y + 1][x] === hat) {
      console.log("You found your hat!");
      this.gameOver = true;

      this.gameWon = true;
    } else if (this._field[y + 1][x] === hole) {
      console.log("You fell into a deep black hole...");
      this.gameOver = true;
    } else if (this._field[y + 1][x] === fieldCharacter) {
      this._field[y][x] = fieldCharacter;
      this._field[y + 1][x] = pathCharacter;
    } else {
      console.log("out of bounds!");
      this.gameOver = true;
    }
  }
  moveLeft(x, y) {
    if (x - 1 < 0) {
      console.log("out of bounds!");
      this.gameOver = true;
    } else if (this._field[y][x - 1] === hat) {
      console.log("You found your hat!");
      this.gameOver = true;

      this.gameWon = true;
    } else if (this._field[y][x - 1] === hole) {
      console.log("You fell into a deep black hole...");
      this.gameOver = true;
    } else if (this._field[y][x - 1] === fieldCharacter) {
      this._field[y][x] = fieldCharacter;
      this._field[y][x - 1] = pathCharacter;
    } else {
      console.log("out of bounds!");
      this.gameOver = true;
    }
  }
  moveRight(x, y) {
    if (x + 1 > this._field[0].length - 1) {
      console.log("out of bounds!");
      this.gameOver = true;
    } else if (this._field[y][x + 1] === hat) {
      console.log("You found your hat!");
      this.gameOver = true;

      this.gameWon = true;
    } else if (this._field[y][x + 1] === hole) {
      console.log("You fell into a deep black hole...");
      this.gameOver = true;
    } else if (this._field[y][x + 1] === fieldCharacter) {
      this._field[y][x] = fieldCharacter;
      this._field[y][x + 1] = pathCharacter;
    } else {
      console.log("out of bounds!");
      this.gameOver = true;
    }
  }

  getCurrentPosition() {
    this.currentPosition = [];
    this._field.map((row, rowIndex) =>
      row.map((symbol, symbolIndex) => {
        if (symbol === pathCharacter) {
          this.currentPosition.push(symbolIndex);
          this.currentPosition.push(rowIndex);
        }
      })
    );
  }

  playGame() {
    this.print();
    this.getCurrentPosition();
    console.log(
      "Find your hat (^), without falling into a hole or going out of boudns.\nWrite 'u' for Up, 'd' for Down, 'l' for Left, 'r' for Right."
    );
    while (!this.gameOver) {
      const direction = prompt("where to go? ");
      switch (direction) {
        case "u":
          this.moveUp(...this.currentPosition);
          this.getCurrentPosition();
          if (!this.gameOver) {
            this.print();
          }
          break;
        case "d":
          this.moveDown(...this.currentPosition);
          this.getCurrentPosition();
          if (!this.gameOver) {
            this.print();
          }
          break;
        case "r":
          this.moveRight(...this.currentPosition);
          this.getCurrentPosition();
          if (!this.gameOver) {
            this.print();
          }
          break;
        case "l":
          this.moveLeft(...this.currentPosition);
          this.getCurrentPosition();
          if (!this.gameOver) {
            this.print();
          }
          break;
        default:
          console.log(
            "Write 'u' for Up, 'd' for Down, 'l' for Left, 'r' for Right.."
          );
      }
    }
    if (this.gameWon) {
      prompt("Congratulations!");
    }
    if (this.gameOver) {
      prompt("Play again? y/n");
    }
  }
}

exampleField = [
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter],
];

const fieldTest = new Field(exampleField);
fieldTest.playGame();
