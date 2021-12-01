let gameState = {
  gameIsStarted: false,
  playerTurn: 1,
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
const gameBoard = document.querySelector(".game-board");
const gameResult = document.querySelector("#game-result-container");
const playerOneInput = document.querySelector('input[name="player-one"]');
const playerTwoInput = document.querySelector('input[name="player-two"]');
const getWinnerSoundPlayerOne = document.querySelector("#winner-sound-one");
const getWinnerSoundPlayerTwo = document.querySelector("#winner-sound-two");
const getTieSound = document.querySelector("#tie-sound");
playerOneScore.innerText = gameState.playerOne.wins;
playerTwoScore.innerText = gameState.playerTwo.wins;

//END OF SETUP

//Start of callbacks
function resetGameBoard() {
  // if (gameState.gameIsStarted === false) {
  //   return;
  // }
  for (let i = 0; i < gameBoard.children.length; i++) {
    gameBoard.children[i].innerText = "";
    gameBoard.children[i].className = "box";
  }
  gameState.playerTurn = 1;
}
function resetGameScoresAndBoard() {
  gameState.playerOne.wins = 0;
  gameState.playerTwo.wins = 0;
  playerOneScore.innerText = gameState.playerOne.wins;
  playerTwoScore.innerText = gameState.playerTwo.wins;
  playerOneInput.value = "";
  playerTwoInput.value = "";
  gameResult.innerText = "Previous Winners:";
  resetGameBoard();
}
//End of callbacks

//Starting the game
startGameButton.addEventListener("click", () => {
  if (gameState.gameIsStarted === true) {
    return;
  }
  gameState.gameIsStarted = true;
  resetGameBoard();
});

//Resetting the game
resetGameButton.addEventListener("click", resetGameScoresAndBoard);

//EVENT LOOP FOR GAME BOARD
for (let i = 0; i < 9; i++) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.setAttribute("id", i);
  //Event listener for each box
  box.addEventListener("click", () => {
    if (gameState.gameIsStarted === false) {
      return;
    }
    if (checkIfEntireBoardIsFilled()) {
      resetGameBoard();
    }
    //INSIDE HERE WE NEED TO DO A CHECK OF THE BOARD STATE
    if (gameState.playerTurn === 1 && gameBoard.children[i].innerText === "") {
      box.innerText = playerOneInput.value ? playerOneInput.value : "X";
      gameState.playerTurn = 2;
    } else if (
      gameState.playerTurn === 2 &&
      gameBoard.children[i].innerText === ""
    ) {
      box.innerText = playerTwoInput.value ? playerTwoInput.value : "O";
      gameState.playerTurn = 1;
    }
    console.log(gameState.playerTurn);
    if (checkForWin()) {
      if (gameState.playerTurn === 2) {
        const winnerElement = document.createElement("h3");
        winnerElement.innerHTML = `Player ${gameState.playerTurn - 1} wins \n`;
        gameResult.appendChild(winnerElement);
        gameState.playerOne.wins++;
        playerOneScore.innerText = gameState.playerOne.wins;
        getWinnerSoundPlayerOne.play();
        gameState.gameIsStarted = false;
      } else {
        const winnerElement = document.createElement("h3");
        winnerElement.innerHTML = `Player ${gameState.playerTurn + 1} wins \n`;
        gameResult.appendChild(winnerElement);
        gameState.playerTwo.wins++;
        playerTwoScore.innerText = gameState.playerTwo.wins;
        getWinnerSoundPlayerTwo.play();
        gameState.gameIsStarted = false;
      }
    } else if (
      checkForWin() === false &&
      checkIfEntireBoardIsFilled() === true
    ) {
      getTieSound.play();
      const tieElement = document.createElement("h3");
      tieElement.innerHTML = `Tie! \n`;
      gameResult.appendChild(tieElement);
      resetGameBoard();
    }
  });
  gameBoard.appendChild(box);
}

//END of EVENT LOOP

//Check for the win conditions still need to figure out the logic for ties
function checkForWin() {
  //check for horizontal win
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard.children[i * 3].innerText ===
        gameBoard.children[i * 3 + 1].innerText &&
      gameBoard.children[i * 3].innerText ===
        gameBoard.children[i * 3 + 2].innerText &&
      gameBoard.children[i * 3].innerText !== ""
    ) {
      gameBoard.children[i * 3].className = "winner";
      gameBoard.children[i * 3 + 1].className = "winner";
      gameBoard.children[i * 3 + 2].className = "winner";
      return true;
    }
  }
  //check for vertical win
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard.children[i].innerText === gameBoard.children[i + 3].innerText &&
      gameBoard.children[i].innerText === gameBoard.children[i + 6].innerText &&
      gameBoard.children[i].innerText !== ""
    ) {
      gameBoard.children[i].className = "winner";
      gameBoard.children[i + 3].className = "winner";
      gameBoard.children[i + 6].className = "winner";
      return true;
    }
  }
  //check for diagonal win
  if (
    gameBoard.children[0].innerText === gameBoard.children[4].innerText &&
    gameBoard.children[0].innerText === gameBoard.children[8].innerText &&
    gameBoard.children[0].innerText !== ""
  ) {
    gameBoard.children[0].className = "winner";
    gameBoard.children[4].className = "winner";
    gameBoard.children[8].className = "winner";
    return true;
  }
  if (
    gameBoard.children[2].innerText === gameBoard.children[4].innerText &&
    gameBoard.children[2].innerText === gameBoard.children[6].innerText &&
    gameBoard.children[2].innerText !== ""
  ) {
    gameBoard.children[2].className = "winner";
    gameBoard.children[4].className = "winner";
    gameBoard.children[6].className = "winner";
    return true;
  }
  if (
    gameBoard.children[2].innerText === gameBoard.children[4].innerText &&
    gameBoard.children[2].innerText === gameBoard.children[6].innerText &&
    gameBoard.children[2].innerText !== ""
  ) {
    return true;
  }
  return false;
}

// This checks if there is a tie or not
function checkIfEntireBoardIsFilled() {
  for (let i = 0; i < 9; i++) {
    if (gameBoard.children[i].innerText === "") {
      return false;
    }
  }
  return true;
}
