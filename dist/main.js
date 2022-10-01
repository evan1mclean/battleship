/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Game.js":
/*!*****************************!*\
  !*** ./src/modules/Game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/modules/Player.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ship */ "./src/modules/Ship.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI */ "./src/modules/UI.js");





const Game = () => {
  const p1 = (0,_Player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const p1Ships = [(0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(5), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(4), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(2)];
  const p1Board = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const p2 = (0,_Player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const p2Ships = [(0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(5), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(4), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(2)];
  const p2Board = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();

  const ui = (0,_UI__WEBPACK_IMPORTED_MODULE_3__["default"])();
  ui.rotateButton();

  while (p2Ships.length > 0) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const coinFlip = Math.random() > 0.5;
    const ship = p2Ships[0];
    p2Board.placeShip(x, y, ship, coinFlip);
    if (p2Board.board[y][x] === ship) {
      p2Ships.shift();
    }
  }

  ui.renderBoard("Human", p1Board, true);
  ui.renderBoard("AI", p2Board, true);
  ui.placeShips(p1Ships, p1Board, p2Board, p1, p2);
  ui.playAgainButton();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Gameboard = () => {
  // creates a 10x10 array of null values
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    board[i] = Array(10).fill(null);
  }
  const attacks = JSON.parse(JSON.stringify(board));
  const shipsArray = [];

  const placeShip = (x, y, ship, isHorizontal) => {
    // makes sure ship cannot go off the board
    /* if (x + ship.length - 1 > 9 || y + ship.length - 1 > 9) {
      return;
    } */

    if (x + ship.length - 1 > 9 && isHorizontal === true)  {
      return;
    }
    if (y + ship.length - 1 > 9 && isHorizontal === false) {
      return;
    }

    // makes sure that the ship will not overlap with another ship
    for (let i = 0; i < ship.length; i += 1) {
      if (isHorizontal === true) {
        if (board[y][x + i] !== null) {
          return;
        }
      }
      if (isHorizontal === false) {
        if (board[y + i][x] !== null) {
          return;
        }
      }
    }

    // if ship is horizontal, place it starting from x, y, for as long as the ship
    // else, do the same thing vertically
    if (isHorizontal) {
      for (let i = 0; i < ship.length; i += 1) {
        board[y][x + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        board[y + i][x] = ship;
      }
    }
    shipsArray.push(ship);
  };

  // loops through the gameboard to find all positions the ship occupies and returns the position of the hit
  const findHitPosition = (x, y, ship) => {
    let counter = 0;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (board[j][i] === ship) {
          if (j === y && i === x) {
            return counter;
          }
          counter += 1;
        }
      }
    }
    return counter;
  };

  // takes coordinates and returns if it was a hit or not
  const receiveAttack = (x, y) => {
    if (board[y][x] !== null) {
      attacks[y][x] = "hit";
      // if the board position is an object, passes that object and coordinates into the function to find the position of the hit on the ship and then records that hit
      const position = findHitPosition(x, y, board[y][x]);
      board[y][x].hit(position);
      // updates the ships array if a ship is sunk
      if (board[y][x].isSunk()) {
        const index = shipsArray.indexOf(board[y][x]);
        shipsArray.splice(index, 1);
      }
      return true;
    }
    attacks[y][x] = "X";
    return false;
  };

  const allShipsSunk = () => {
    if (shipsArray.length > 0) {
      return false;
    }
    return true;
  };
  return { board, shipsArray, attacks, placeShip, receiveAttack, allShipsSunk };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);


/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Player = () => {
  const attackLocations = [];

  const alreadyAttacked = (x, y) => {
    if (attackLocations.length > 0) {
      for (let i = 0; i < attackLocations.length; i += 1) {
        if (attackLocations[i][0] === x && attackLocations[i][1] === y) {
          return true;
        }
      }
    }
    return false;
  };

  const attack = (x, y, gameboard) => {
    if (alreadyAttacked()) {
      return;
    }
    gameboard.receiveAttack(x, y);
    attackLocations.push([x, y]);
  };

  const attackRandomSquare = (gameboard) => {
    if (attackLocations.length === 100) return;
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (alreadyAttacked(x, y)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    gameboard.receiveAttack(x, y);
    attackLocations.push([x, y]);
  };

  return { attack, attackRandomSquare, alreadyAttacked };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ "./src/modules/Ship.js":
/*!*****************************!*\
  !*** ./src/modules/Ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = (length) => {
  const hits = Array(length).fill(null);

  const hit = (position) => {
    if (position < hits.length) {
      hits[position] = position;
    }
  };
  const isSunk = () => {
    if (hits.includes(null)) {
      return false;
    }
    return true;
  };
  return { length, hit, isSunk, hits };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Game */ "./src/modules/Game.js");


(0,_modules_Game__WEBPACK_IMPORTED_MODULE_0__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLEVBQUUsRUFBQzs7Ozs7OztVQ25JbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05rQzs7QUFFbEMseURBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvR2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL1VJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcFwiO1xuaW1wb3J0IFVJIGZyb20gXCIuL1VJXCI7XG5cbmNvbnN0IEdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IHAxID0gUGxheWVyKCk7XG4gIGNvbnN0IHAxU2hpcHMgPSBbU2hpcCg1KSwgU2hpcCg0KSwgU2hpcCgzKSwgU2hpcCgzKSwgU2hpcCgyKV07XG4gIGNvbnN0IHAxQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgcDIgPSBQbGF5ZXIoKTtcbiAgY29uc3QgcDJTaGlwcyA9IFtTaGlwKDUpLCBTaGlwKDQpLCBTaGlwKDMpLCBTaGlwKDMpLCBTaGlwKDIpXTtcbiAgY29uc3QgcDJCb2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0IHVpID0gVUkoKTtcbiAgdWkucm90YXRlQnV0dG9uKCk7XG5cbiAgd2hpbGUgKHAyU2hpcHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBjb2luRmxpcCA9IE1hdGgucmFuZG9tKCkgPiAwLjU7XG4gICAgY29uc3Qgc2hpcCA9IHAyU2hpcHNbMF07XG4gICAgcDJCb2FyZC5wbGFjZVNoaXAoeCwgeSwgc2hpcCwgY29pbkZsaXApO1xuICAgIGlmIChwMkJvYXJkLmJvYXJkW3ldW3hdID09PSBzaGlwKSB7XG4gICAgICBwMlNoaXBzLnNoaWZ0KCk7XG4gICAgfVxuICB9XG5cbiAgdWkucmVuZGVyQm9hcmQoXCJIdW1hblwiLCBwMUJvYXJkLCB0cnVlKTtcbiAgdWkucmVuZGVyQm9hcmQoXCJBSVwiLCBwMkJvYXJkLCB0cnVlKTtcbiAgdWkucGxhY2VTaGlwcyhwMVNoaXBzLCBwMUJvYXJkLCBwMkJvYXJkLCBwMSwgcDIpO1xuICB1aS5wbGF5QWdhaW5CdXR0b24oKTtcbn07XG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICAvLyBjcmVhdGVzIGEgMTB4MTAgYXJyYXkgb2YgbnVsbCB2YWx1ZXNcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgYm9hcmRbaV0gPSBBcnJheSgxMCkuZmlsbChudWxsKTtcbiAgfVxuICBjb25zdCBhdHRhY2tzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShib2FyZCkpO1xuICBjb25zdCBzaGlwc0FycmF5ID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHgsIHksIHNoaXAsIGlzSG9yaXpvbnRhbCkgPT4ge1xuICAgIC8vIG1ha2VzIHN1cmUgc2hpcCBjYW5ub3QgZ28gb2ZmIHRoZSBib2FyZFxuICAgIC8qIGlmICh4ICsgc2hpcC5sZW5ndGggLSAxID4gOSB8fCB5ICsgc2hpcC5sZW5ndGggLSAxID4gOSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gKi9cblxuICAgIGlmICh4ICsgc2hpcC5sZW5ndGggLSAxID4gOSAmJiBpc0hvcml6b250YWwgPT09IHRydWUpICB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh5ICsgc2hpcC5sZW5ndGggLSAxID4gOSAmJiBpc0hvcml6b250YWwgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbWFrZXMgc3VyZSB0aGF0IHRoZSBzaGlwIHdpbGwgbm90IG92ZXJsYXAgd2l0aCBhbm90aGVyIHNoaXBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChpc0hvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGJvYXJkW3ldW3ggKyBpXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzSG9yaXpvbnRhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGJvYXJkW3kgKyBpXVt4XSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHNoaXAgaXMgaG9yaXpvbnRhbCwgcGxhY2UgaXQgc3RhcnRpbmcgZnJvbSB4LCB5LCBmb3IgYXMgbG9uZyBhcyB0aGUgc2hpcFxuICAgIC8vIGVsc2UsIGRvIHRoZSBzYW1lIHRoaW5nIHZlcnRpY2FsbHlcbiAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYm9hcmRbeV1beCArIGldID0gc2hpcDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGJvYXJkW3kgKyBpXVt4XSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuICAgIHNoaXBzQXJyYXkucHVzaChzaGlwKTtcbiAgfTtcblxuICAvLyBsb29wcyB0aHJvdWdoIHRoZSBnYW1lYm9hcmQgdG8gZmluZCBhbGwgcG9zaXRpb25zIHRoZSBzaGlwIG9jY3VwaWVzIGFuZCByZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgaGl0XG4gIGNvbnN0IGZpbmRIaXRQb3NpdGlvbiA9ICh4LCB5LCBzaGlwKSA9PiB7XG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGlmIChib2FyZFtqXVtpXSA9PT0gc2hpcCkge1xuICAgICAgICAgIGlmIChqID09PSB5ICYmIGkgPT09IHgpIHtcbiAgICAgICAgICAgIHJldHVybiBjb3VudGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb3VudGVyICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG5cbiAgLy8gdGFrZXMgY29vcmRpbmF0ZXMgYW5kIHJldHVybnMgaWYgaXQgd2FzIGEgaGl0IG9yIG5vdFxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBpZiAoYm9hcmRbeV1beF0gIT09IG51bGwpIHtcbiAgICAgIGF0dGFja3NbeV1beF0gPSBcImhpdFwiO1xuICAgICAgLy8gaWYgdGhlIGJvYXJkIHBvc2l0aW9uIGlzIGFuIG9iamVjdCwgcGFzc2VzIHRoYXQgb2JqZWN0IGFuZCBjb29yZGluYXRlcyBpbnRvIHRoZSBmdW5jdGlvbiB0byBmaW5kIHRoZSBwb3NpdGlvbiBvZiB0aGUgaGl0IG9uIHRoZSBzaGlwIGFuZCB0aGVuIHJlY29yZHMgdGhhdCBoaXRcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gZmluZEhpdFBvc2l0aW9uKHgsIHksIGJvYXJkW3ldW3hdKTtcbiAgICAgIGJvYXJkW3ldW3hdLmhpdChwb3NpdGlvbik7XG4gICAgICAvLyB1cGRhdGVzIHRoZSBzaGlwcyBhcnJheSBpZiBhIHNoaXAgaXMgc3Vua1xuICAgICAgaWYgKGJvYXJkW3ldW3hdLmlzU3VuaygpKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gc2hpcHNBcnJheS5pbmRleE9mKGJvYXJkW3ldW3hdKTtcbiAgICAgICAgc2hpcHNBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGF0dGFja3NbeV1beF0gPSBcIlhcIjtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGlmIChzaGlwc0FycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIHJldHVybiB7IGJvYXJkLCBzaGlwc0FycmF5LCBhdHRhY2tzLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGFsbFNoaXBzU3VuayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiY29uc3QgUGxheWVyID0gKCkgPT4ge1xuICBjb25zdCBhdHRhY2tMb2NhdGlvbnMgPSBbXTtcblxuICBjb25zdCBhbHJlYWR5QXR0YWNrZWQgPSAoeCwgeSkgPT4ge1xuICAgIGlmIChhdHRhY2tMb2NhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRhY2tMb2NhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGF0dGFja0xvY2F0aW9uc1tpXVswXSA9PT0geCAmJiBhdHRhY2tMb2NhdGlvbnNbaV1bMV0gPT09IHkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gKHgsIHksIGdhbWVib2FyZCkgPT4ge1xuICAgIGlmIChhbHJlYWR5QXR0YWNrZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICBhdHRhY2tMb2NhdGlvbnMucHVzaChbeCwgeV0pO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFja1JhbmRvbVNxdWFyZSA9IChnYW1lYm9hcmQpID0+IHtcbiAgICBpZiAoYXR0YWNrTG9jYXRpb25zLmxlbmd0aCA9PT0gMTAwKSByZXR1cm47XG4gICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgd2hpbGUgKGFscmVhZHlBdHRhY2tlZCh4LCB5KSkge1xuICAgICAgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgfVxuICAgIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIGF0dGFja0xvY2F0aW9ucy5wdXNoKFt4LCB5XSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgYXR0YWNrLCBhdHRhY2tSYW5kb21TcXVhcmUsIGFscmVhZHlBdHRhY2tlZCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbiAgY29uc3QgaGl0cyA9IEFycmF5KGxlbmd0aCkuZmlsbChudWxsKTtcblxuICBjb25zdCBoaXQgPSAocG9zaXRpb24pID0+IHtcbiAgICBpZiAocG9zaXRpb24gPCBoaXRzLmxlbmd0aCkge1xuICAgICAgaGl0c1twb3NpdGlvbl0gPSBwb3NpdGlvbjtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZiAoaGl0cy5pbmNsdWRlcyhudWxsKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgcmV0dXJuIHsgbGVuZ3RoLCBoaXQsIGlzU3VuaywgaGl0cyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsImNvbnN0IFVJID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lclwiKTtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWVPdmVyTW9kYWxcIik7XG4gIGNvbnN0IGdhbWVPdmVyQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1vdmVyLWNvbnRlbnRcIik7XG4gIGNvbnN0IHJvdGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm90YXRlXCIpO1xuICBjb25zdCBwbGFjZUZsZWV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlXCIpO1xuXG4gIGNvbnN0IHJlbmRlckJvYXJkID0gKHBsYXllck5hbWUsIGdhbWVib2FyZCwgc2hvdWxkUmVuZGVyKSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJnYW1lYm9hcmRcIik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNxdWFyZVwiKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQocGxheWVyTmFtZSk7XG4gICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXJvd1wiLCBpKTtcbiAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImRhdGEtY29sXCIsIGopO1xuICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW2ldW2pdICE9PSBudWxsICYmIHNob3VsZFJlbmRlcikge1xuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCB1cGRhdGVCb2FyZFJlbmRlciA9IChnYW1lYm9hcmQsIHBsYXllcikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaiArPSAxKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC4ke3BsYXllcn1bZGF0YS1yb3c9XCIke2l9XCJdW2RhdGEtY29sPVwiJHtqfVwiXWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGdhbWVib2FyZC5hdHRhY2tzW2ldW2pdICE9PSBudWxsKSB7XG4gICAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdhbWVib2FyZC5hdHRhY2tzW2ldW2pdID09PSBcImhpdFwiKSB7XG4gICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICAgIGlmIChnYW1lYm9hcmQuYm9hcmRbaV1bal0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVdpbm5lciA9IChodW1hblBsYXllcikgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXktd2lubmVyXCIpO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJzaG93LW1vZGFsXCIpO1xuICAgIGdhbWVPdmVyQ29udGVudC5jbGFzc0xpc3QuYWRkKFwic2hvdy1tb2RhbFwiKTtcbiAgICBpZiAoaHVtYW5QbGF5ZXIpIHtcbiAgICAgIG1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIkNvbmdyYXR1bGF0aW9ucyEgWW91IHdvbiFcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZS50ZXh0Q29udGVudCA9IFwiVGhlIGNvbXB1dGVyIGhhcyB3b24gdGhpcyB0aW1lLi4uXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGF0dGFja0JvYXJkT25DbGljayA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBnYW1lYm9hcmQxLCBnYW1lYm9hcmQyKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5BSVwiKTtcbiAgICBzcXVhcmUuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YVJvdyA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gICAgICAgIGNvbnN0IGRhdGFDb2wgPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5jb2wpO1xuICAgICAgICBpZiAoZ2FtZWJvYXJkMi5hdHRhY2tzW2RhdGFSb3ddW2RhdGFDb2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBsYXllcjEuYXR0YWNrKGRhdGFDb2wsIGRhdGFSb3csIGdhbWVib2FyZDIpO1xuICAgICAgICB1cGRhdGVCb2FyZFJlbmRlcihnYW1lYm9hcmQyLCBcIkFJXCIpO1xuICAgICAgICBpZiAoZ2FtZWJvYXJkMi5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgIGRpc3BsYXlXaW5uZXIodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBsYXllcjIuYXR0YWNrUmFuZG9tU3F1YXJlKGdhbWVib2FyZDEpO1xuICAgICAgICB1cGRhdGVCb2FyZFJlbmRlcihnYW1lYm9hcmQxLCBcIkh1bWFuXCIpO1xuICAgICAgICBpZiAoZ2FtZWJvYXJkMS5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgIGRpc3BsYXlXaW5uZXIoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwbGF5QWdhaW5CdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5LWFnYWluXCIpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9ICgpID0+IHtcbiAgICByb3RhdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByb3RhdGUuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXBzID0gKHNoaXBzQXJyYXksIGdhbWVib2FyZDEsIGdhbWVib2FyZDIsIHBsYXllcjEsIHBsYXllcjIpID0+IHtcbiAgICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVib2FyZFwiKTtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLkh1bWFuXCIpO1xuICAgIHNxdWFyZS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhUm93ID0gTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQucm93KTtcbiAgICAgICAgY29uc3QgZGF0YUNvbCA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmNvbCk7XG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9ICFyb3RhdGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpO1xuICAgICAgICBpZiAoc2hpcHNBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkMS5wbGFjZVNoaXAoZGF0YUNvbCwgZGF0YVJvdywgc2hpcHNBcnJheVswXSwgaXNIb3Jpem9udGFsKTtcbiAgICAgICAgICBpZiAoZ2FtZWJvYXJkMS5ib2FyZFtkYXRhUm93XVtkYXRhQ29sXSA9PT0gc2hpcHNBcnJheVswXSkge1xuICAgICAgICAgICAgYm9hcmRzLmZvckVhY2goKGJvYXJkKSA9PiBib2FyZC5yZW1vdmUoKSk7XG4gICAgICAgICAgICByZW5kZXJCb2FyZChcIkh1bWFuXCIsIGdhbWVib2FyZDEsIHRydWUpO1xuICAgICAgICAgICAgcmVuZGVyQm9hcmQoXCJBSVwiLCBnYW1lYm9hcmQyLCB0cnVlKTtcbiAgICAgICAgICAgIHNoaXBzQXJyYXkuc2hpZnQoKTtcbiAgICAgICAgICAgIHBsYWNlU2hpcHMoc2hpcHNBcnJheSwgZ2FtZWJvYXJkMSwgZ2FtZWJvYXJkMiwgcGxheWVyMSwgcGxheWVyMik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzaGlwc0FycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGF0dGFja0JvYXJkT25DbGljayhwbGF5ZXIxLCBwbGF5ZXIyLCBnYW1lYm9hcmQxLCBnYW1lYm9hcmQyKTtcbiAgICAgICAgICBwbGF5QWdhaW5CdXR0b24oKTtcbiAgICAgICAgICBwbGFjZUZsZWV0LnRleHRDb250ZW50ID0gXCJBdHRhY2sgdGhlIGVuZW15IVwiO1xuICAgICAgICAgIHJvdGF0ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyQm9hcmQsXG4gICAgYXR0YWNrQm9hcmRPbkNsaWNrLFxuICAgIHBsYXlBZ2FpbkJ1dHRvbixcbiAgICBwbGFjZVNoaXBzLFxuICAgIHJvdGF0ZUJ1dHRvbixcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFVJO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9tb2R1bGVzL0dhbWVcIjtcblxuR2FtZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9