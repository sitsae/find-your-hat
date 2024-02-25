const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor() {
    this._field;
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

  generateField(width, height) {
    const newField = [];
    const createRow = () => {
      const row = [];
      for (let i = 0; i < width; i++) {
        const prob = Math.random();
        if (prob < 0.3) {
          row.push(hole);
        } else {
          row.push(fieldCharacter);
        }
      }
      return row;
    };
    for (let i = 0; i < height; i++) {
      newField.push(createRow());
    }
    newField[0][0] = pathCharacter;
    newField[height-1][width-1] = hat;
    this._field = newField;
  }

  playGame() {
    this.generateField(15, 20)
    this.print();
    this.getCurrentPosition();
    console.log(
      "Find your hat (^), without falling into a hole or going out of boudns.\nWrite 'w' for Up, 's' for Down, 'a' for Left, 'd' for Right."
    );
    while (!this.gameOver) {
      const direction = prompt("where to go? ");
      switch (direction) {
        case "w":
          this.moveUp(...this.currentPosition);
          this.getCurrentPosition();
          if (!this.gameOver) {
            console.clear()

            this.print();
          }
          break;
        case "s":
          this.moveDown(...this.currentPosition);
          this.getCurrentPosition();
          if (!this.gameOver) {
            console.clear()

            this.print();
          }
          break;
        case "d":
          this.moveRight(...this.currentPosition);
          this.getCurrentPosition();
          if (!this.gameOver) {
            console.clear()
            this.print();
          }
          break;
        case "a":
          this.moveLeft(...this.currentPosition);
          this.getCurrentPosition();
          if (!this.gameOver) {
            console.clear()
            this.print();

          }
          break;
        default:
          console.log(
            "Write 'w' for Up, 's' for Down, 'a' for Left, 'd' for Right.."
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

const fieldTest = new Field();

fieldTest.playGame();
