const UI = () => {
  const container = document.querySelector(".container");
  const modal = document.getElementById("gameOverModal");
  const gameOverContent = document.querySelector(".game-over-content");
  const rotate = document.querySelector(".rotate");
  const placeFleet = document.querySelector(".message");

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
    } else {
      message.textContent = "The computer has won this time...";
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
    const button = document.querySelector(".play-again");
    button.addEventListener("click", () => {
      window.location.reload();
    });
  };

  const rotateButton = () => {
    rotate.addEventListener("click", (e) => {
      e.preventDefault();
      rotate.classList.toggle("active");
    });
  };

  const placeShips = (shipsArray, gameboard1, gameboard2, player1, player2) => {
    const boards = document.querySelectorAll(".gameboard");
    const square = document.querySelectorAll(".Human");
    square.forEach((element) => {
      element.addEventListener("click", (e) => {
        const dataRow = Number(e.target.dataset.row);
        const dataCol = Number(e.target.dataset.col);
        const isHorizontal = !rotate.classList.contains("active");
        if (shipsArray.length > 0) {
          gameboard1.placeShip(dataCol, dataRow, shipsArray[0], isHorizontal);
          if (gameboard1.board[dataRow][dataCol] === shipsArray[0]) {
            boards.forEach((board) => board.remove());
            renderBoard("Human", gameboard1, true);
            renderBoard("AI", gameboard2, true);
            shipsArray.shift();
            placeShips(shipsArray, gameboard1, gameboard2, player1, player2);
          }
        }
        if (shipsArray.length === 0) {
          attackBoardOnClick(player1, player2, gameboard1, gameboard2);
          playAgainButton();
          placeFleet.textContent = "Attack the enemy!";
          rotate.style.display = "none";
        }
      });
    });
  };

  return {
    renderBoard,
    attackBoardOnClick,
    playAgainButton,
    placeShips,
    rotateButton,
  };
};

export default UI;
