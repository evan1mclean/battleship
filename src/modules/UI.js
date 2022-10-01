import Game from "./Game";

/* eslint-disable no-param-reassign */
const UI = () => {
  const container = document.querySelector(".container");
  const modal = document.getElementById("gameOverModal");
  const gameOverContent = document.querySelector(".game-over-content");

  const renderBoard = (playerName, gameboard, shouldRender) => {
    const board = document.createElement("div");
    board.classList.add("gameboard");
    container.appendChild(board);
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.classList.add(playerName);
        board.appendChild(square);
        square.setAttribute("data-row", i);
        square.setAttribute("data-col", j);
        if (gameboard.board[i][j] !== null && shouldRender) {
          square.classList.add("ship");
        }
      }
    }
  };

  const updateBoardRender = (gameboard, player) => {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const square = document.querySelector(
          `.${player}[data-row="${i}"][data-col="${j}"]`
        );
        if (gameboard.attacks[i][j] !== null) {
          square.textContent = "X";
        }
        if (gameboard.attacks[i][j] === "hit") {
          square.classList.add("ship");
          if (gameboard.board[i][j].isSunk()) {
            square.classList.add("sunk");
          }
        }
      }
    }
  };

  const displayWinner = (humanPlayer) => {
    const message = document.querySelector(".display-winner");
    modal.classList.add("show-modal");
    gameOverContent.classList.add("show-modal");
    if (humanPlayer) {
      message.textContent = "Congratulations! You won!";
    }
  };

  const attackBoardOnClick = (player1, player2, gameboard1, gameboard2) => {
    const square = document.querySelectorAll(".AI");
    square.forEach((element) => {
      element.addEventListener("click", (e) => {
        const dataRow = Number(e.target.dataset.row);
        const dataCol = Number(e.target.dataset.col);
        if (gameboard2.attacks[dataRow][dataCol] !== null) {
          return;
        }
        player1.attack(dataCol, dataRow, gameboard2);
        updateBoardRender(gameboard2, "AI");
        if (gameboard2.allShipsSunk()) {
          displayWinner(true);
          return;
        }
        player2.attackRandomSquare(gameboard1);
        updateBoardRender(gameboard1, "Human");
        if (gameboard1.allShipsSunk()) {
          displayWinner(false);
        }
      });
    });
  };

  const playAgainButton = () => {
    const button = document.querySelector('.play-again');
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const boards = document.querySelectorAll('.gameboard');
      boards.forEach(board => {
        board.remove();
      })
      modal.classList.remove('show-modal');
      gameOverContent.classList.remove('show-modal');
      Game();
    })
  }

  const placeShips = () => {
    //carrier (5), battleship (4), destroyer (3), submarine (3), patrol boat (2)
  }

  return { renderBoard, attackBoardOnClick, playAgainButton, placeShips };
};

export default UI;
