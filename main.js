console.log("You're in....");
/**
 * TODO: 
    - for tomorrow make the board interactive
    - if there is time see if you can wire in some game logic to find the winner of the game.
 */

let gameState = {
  gameIsStarted: false,
  playerOne: {
    wins: 0,
  },
  playerTwo: {
    wins: 0,
  },
};

//INITIAL SETUP
const startGameButton = document.querySelector(".start-button");

const resetGameButton = document.querySelector(".reset-button");

const playerOneScore = document.querySelector("#player-one-score");
const playerTwoScore = document.querySelector("#player-two-score");

playerOneScore.innerText = gameState.playerOne.wins;
playerTwoScore.innerText = gameState.playerTwo.wins;

//END OF SETUP

//Testing players scores
const increaseButton = document.querySelector("#increase-test");

// increaseButton.addEventListener("click", () => {
//   gameState.playerOne.wins++;
//   playerOneScore.innerText = gameState.playerOne.wins;
//   game.gameState.gameIsStarted = false;
// });

//Starting the game
startGameButton.addEventListener("click", () => {
  if (gameState.gameIsStarted === true) {
    return;
  }
  gameState.gameIsStarted = true;
  console.log(gameState);
  console.log("Game is started");
});

//Resetting the game
resetGameButton.addEventListener("click", () => {
  if (gameState.gameIsStarted === false) {
    return;
  }
  gameState.gameIsStarted = false;
  console.log(gameState);
  console.log("Game is reset");
});

console.log(startGameButton);
