//consts to hold the classes names for x and o
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
//const of all possible winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//consts to store the elements we are going to be working on
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
//boolean to check who's turn it is to play
let circleTurn;
//starts the game on loading for first time.
startGame();
//restarts game if the game has ended
restartButton.addEventListener("click", startGame);

//starts the game, assigns random starting turn, removes all previous classes and click listeners, and hides the winnig message
function startGame() {
  circleTurn = Math.random() > 0.5;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}
//adds a class of the appropriate turn when a player clicks and checks if the game is over
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}
//displays the end result of the game
function endGame(draw) {
  if (draw) {
    winningMessageText.innerHTML = "Draw!";
  } else {
    winningMessageText.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}
//checks if all the cells have been drawn on
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
//switches turns
function swapTurns() {
  circleTurn = !circleTurn;
}
//adds a class to a cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
//shows the elements hovering above the cell, to help user visualize where to place them.
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
//checks if the current player has won with a winning combination
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
