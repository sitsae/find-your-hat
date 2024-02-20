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
  }

  print() {
    for (let line of this._field) {
      console.log(line.join(""));
    }
  }
}

exampleField = [
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter],
];

let gameWon = false;
let outOfBounds = false;
let inHole = false;

function playGame() {
  if (gameWon) {
    console.log("Congratualtions! You found your hat!");
  }
  if (outOfBounds) {
    console.log("You cant go outside of the field");
  }
  if (inHole) {
    console.log("Oops! You have fallen into a hole");
  } else {
    const input = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    input.question("Where would you like to go?\n", (answer) => {
      console.log("you went ", answer);
    });
  }
}
const fieldTest = new Field(exampleField);

console.log(fieldTest.print());
playGame();
