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
  ui.renderBoard("AI", p2Board, false);
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
            renderBoard("AI", gameboard2, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLEVBQUUsRUFBQzs7Ozs7OztVQ25JbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05rQzs7QUFFbEMseURBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvR2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL1VJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL0dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcFwiO1xuaW1wb3J0IFVJIGZyb20gXCIuL1VJXCI7XG5cbmNvbnN0IEdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IHAxID0gUGxheWVyKCk7XG4gIGNvbnN0IHAxU2hpcHMgPSBbU2hpcCg1KSwgU2hpcCg0KSwgU2hpcCgzKSwgU2hpcCgzKSwgU2hpcCgyKV07XG4gIGNvbnN0IHAxQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgcDIgPSBQbGF5ZXIoKTtcbiAgY29uc3QgcDJTaGlwcyA9IFtTaGlwKDUpLCBTaGlwKDQpLCBTaGlwKDMpLCBTaGlwKDMpLCBTaGlwKDIpXTtcbiAgY29uc3QgcDJCb2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0IHVpID0gVUkoKTtcbiAgdWkucm90YXRlQnV0dG9uKCk7XG5cbiAgd2hpbGUgKHAyU2hpcHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBjb2luRmxpcCA9IE1hdGgucmFuZG9tKCkgPiAwLjU7XG4gICAgY29uc3Qgc2hpcCA9IHAyU2hpcHNbMF07XG4gICAgcDJCb2FyZC5wbGFjZVNoaXAoeCwgeSwgc2hpcCwgY29pbkZsaXApO1xuICAgIGlmIChwMkJvYXJkLmJvYXJkW3ldW3hdID09PSBzaGlwKSB7XG4gICAgICBwMlNoaXBzLnNoaWZ0KCk7XG4gICAgfVxuICB9XG5cbiAgdWkucmVuZGVyQm9hcmQoXCJIdW1hblwiLCBwMUJvYXJkLCB0cnVlKTtcbiAgdWkucmVuZGVyQm9hcmQoXCJBSVwiLCBwMkJvYXJkLCBmYWxzZSk7XG4gIHVpLnBsYWNlU2hpcHMocDFTaGlwcywgcDFCb2FyZCwgcDJCb2FyZCwgcDEsIHAyKTtcbiAgdWkucGxheUFnYWluQnV0dG9uKCk7XG59O1xuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgLy8gY3JlYXRlcyBhIDEweDEwIGFycmF5IG9mIG51bGwgdmFsdWVzXG4gIGNvbnN0IGJvYXJkID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgIGJvYXJkW2ldID0gQXJyYXkoMTApLmZpbGwobnVsbCk7XG4gIH1cbiAgY29uc3QgYXR0YWNrcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYm9hcmQpKTtcbiAgY29uc3Qgc2hpcHNBcnJheSA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5LCBzaGlwLCBpc0hvcml6b250YWwpID0+IHtcbiAgICAvLyBtYWtlcyBzdXJlIHNoaXAgY2Fubm90IGdvIG9mZiB0aGUgYm9hcmRcbiAgICAvKiBpZiAoeCArIHNoaXAubGVuZ3RoIC0gMSA+IDkgfHwgeSArIHNoaXAubGVuZ3RoIC0gMSA+IDkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9ICovXG5cbiAgICBpZiAoeCArIHNoaXAubGVuZ3RoIC0gMSA+IDkgJiYgaXNIb3Jpem9udGFsID09PSB0cnVlKSAge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoeSArIHNoaXAubGVuZ3RoIC0gMSA+IDkgJiYgaXNIb3Jpem9udGFsID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG1ha2VzIHN1cmUgdGhhdCB0aGUgc2hpcCB3aWxsIG5vdCBvdmVybGFwIHdpdGggYW5vdGhlciBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoaXNIb3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChib2FyZFt5XVt4ICsgaV0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc0hvcml6b250YWwgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChib2FyZFt5ICsgaV1beF0gIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiBzaGlwIGlzIGhvcml6b250YWwsIHBsYWNlIGl0IHN0YXJ0aW5nIGZyb20geCwgeSwgZm9yIGFzIGxvbmcgYXMgdGhlIHNoaXBcbiAgICAvLyBlbHNlLCBkbyB0aGUgc2FtZSB0aGluZyB2ZXJ0aWNhbGx5XG4gICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGJvYXJkW3ldW3ggKyBpXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBib2FyZFt5ICsgaV1beF0gPSBzaGlwO1xuICAgICAgfVxuICAgIH1cbiAgICBzaGlwc0FycmF5LnB1c2goc2hpcCk7XG4gIH07XG5cbiAgLy8gbG9vcHMgdGhyb3VnaCB0aGUgZ2FtZWJvYXJkIHRvIGZpbmQgYWxsIHBvc2l0aW9ucyB0aGUgc2hpcCBvY2N1cGllcyBhbmQgcmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGhpdFxuICBjb25zdCBmaW5kSGl0UG9zaXRpb24gPSAoeCwgeSwgc2hpcCkgPT4ge1xuICAgIGxldCBjb3VudGVyID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBpZiAoYm9hcmRbal1baV0gPT09IHNoaXApIHtcbiAgICAgICAgICBpZiAoaiA9PT0geSAmJiBpID09PSB4KSB7XG4gICAgICAgICAgICByZXR1cm4gY291bnRlcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY291bnRlciArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuXG4gIC8vIHRha2VzIGNvb3JkaW5hdGVzIGFuZCByZXR1cm5zIGlmIGl0IHdhcyBhIGhpdCBvciBub3RcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKGJvYXJkW3ldW3hdICE9PSBudWxsKSB7XG4gICAgICBhdHRhY2tzW3ldW3hdID0gXCJoaXRcIjtcbiAgICAgIC8vIGlmIHRoZSBib2FyZCBwb3NpdGlvbiBpcyBhbiBvYmplY3QsIHBhc3NlcyB0aGF0IG9iamVjdCBhbmQgY29vcmRpbmF0ZXMgaW50byB0aGUgZnVuY3Rpb24gdG8gZmluZCB0aGUgcG9zaXRpb24gb2YgdGhlIGhpdCBvbiB0aGUgc2hpcCBhbmQgdGhlbiByZWNvcmRzIHRoYXQgaGl0XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGZpbmRIaXRQb3NpdGlvbih4LCB5LCBib2FyZFt5XVt4XSk7XG4gICAgICBib2FyZFt5XVt4XS5oaXQocG9zaXRpb24pO1xuICAgICAgLy8gdXBkYXRlcyB0aGUgc2hpcHMgYXJyYXkgaWYgYSBzaGlwIGlzIHN1bmtcbiAgICAgIGlmIChib2FyZFt5XVt4XS5pc1N1bmsoKSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHNoaXBzQXJyYXkuaW5kZXhPZihib2FyZFt5XVt4XSk7XG4gICAgICAgIHNoaXBzQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBhdHRhY2tzW3ldW3hdID0gXCJYXCI7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBpZiAoc2hpcHNBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICByZXR1cm4geyBib2FyZCwgc2hpcHNBcnJheSwgYXR0YWNrcywgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhbGxTaGlwc1N1bmsgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IFBsYXllciA9ICgpID0+IHtcbiAgY29uc3QgYXR0YWNrTG9jYXRpb25zID0gW107XG5cbiAgY29uc3QgYWxyZWFkeUF0dGFja2VkID0gKHgsIHkpID0+IHtcbiAgICBpZiAoYXR0YWNrTG9jYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0YWNrTG9jYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChhdHRhY2tMb2NhdGlvbnNbaV1bMF0gPT09IHggJiYgYXR0YWNrTG9jYXRpb25zW2ldWzFdID09PSB5KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9ICh4LCB5LCBnYW1lYm9hcmQpID0+IHtcbiAgICBpZiAoYWxyZWFkeUF0dGFja2VkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgYXR0YWNrTG9jYXRpb25zLnB1c2goW3gsIHldKTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2tSYW5kb21TcXVhcmUgPSAoZ2FtZWJvYXJkKSA9PiB7XG4gICAgaWYgKGF0dGFja0xvY2F0aW9ucy5sZW5ndGggPT09IDEwMCkgcmV0dXJuO1xuICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIHdoaWxlIChhbHJlYWR5QXR0YWNrZWQoeCwgeSkpIHtcbiAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cbiAgICBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICBhdHRhY2tMb2NhdGlvbnMucHVzaChbeCwgeV0pO1xuICB9O1xuXG4gIHJldHVybiB7IGF0dGFjaywgYXR0YWNrUmFuZG9tU3F1YXJlLCBhbHJlYWR5QXR0YWNrZWQgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IGhpdHMgPSBBcnJheShsZW5ndGgpLmZpbGwobnVsbCk7XG5cbiAgY29uc3QgaGl0ID0gKHBvc2l0aW9uKSA9PiB7XG4gICAgaWYgKHBvc2l0aW9uIDwgaGl0cy5sZW5ndGgpIHtcbiAgICAgIGhpdHNbcG9zaXRpb25dID0gcG9zaXRpb247XG4gICAgfVxuICB9O1xuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGhpdHMuaW5jbHVkZXMobnVsbCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIHJldHVybiB7IGxlbmd0aCwgaGl0LCBpc1N1bmssIGhpdHMgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCJjb25zdCBVSSA9ICgpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJcIik7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lT3Zlck1vZGFsXCIpO1xuICBjb25zdCBnYW1lT3ZlckNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtb3Zlci1jb250ZW50XCIpO1xuICBjb25zdCByb3RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvdGF0ZVwiKTtcbiAgY29uc3QgcGxhY2VGbGVldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZVwiKTtcblxuICBjb25zdCByZW5kZXJCb2FyZCA9IChwbGF5ZXJOYW1lLCBnYW1lYm9hcmQsIHNob3VsZFJlbmRlcikgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKFwiZ2FtZWJvYXJkXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKHBsYXllck5hbWUpO1xuICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS1yb3dcIiwgaSk7XG4gICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbFwiLCBqKTtcbiAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtpXVtqXSAhPT0gbnVsbCAmJiBzaG91bGRSZW5kZXIpIHtcbiAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlQm9hcmRSZW5kZXIgPSAoZ2FtZWJvYXJkLCBwbGF5ZXIpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuJHtwbGF5ZXJ9W2RhdGEtcm93PVwiJHtpfVwiXVtkYXRhLWNvbD1cIiR7an1cIl1gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChnYW1lYm9hcmQuYXR0YWNrc1tpXVtqXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnYW1lYm9hcmQuYXR0YWNrc1tpXVtqXSA9PT0gXCJoaXRcIikge1xuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW2ldW2pdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlXaW5uZXIgPSAoaHVtYW5QbGF5ZXIpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5LXdpbm5lclwiKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwic2hvdy1tb2RhbFwiKTtcbiAgICBnYW1lT3ZlckNvbnRlbnQuY2xhc3NMaXN0LmFkZChcInNob3ctbW9kYWxcIik7XG4gICAgaWYgKGh1bWFuUGxheWVyKSB7XG4gICAgICBtZXNzYWdlLnRleHRDb250ZW50ID0gXCJDb25ncmF0dWxhdGlvbnMhIFlvdSB3b24hXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlRoZSBjb21wdXRlciBoYXMgd29uIHRoaXMgdGltZS4uLlwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhdHRhY2tCb2FyZE9uQ2xpY2sgPSAocGxheWVyMSwgcGxheWVyMiwgZ2FtZWJvYXJkMSwgZ2FtZWJvYXJkMikgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuQUlcIik7XG4gICAgc3F1YXJlLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGFSb3cgPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5yb3cpO1xuICAgICAgICBjb25zdCBkYXRhQ29sID0gTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuY29sKTtcbiAgICAgICAgaWYgKGdhbWVib2FyZDIuYXR0YWNrc1tkYXRhUm93XVtkYXRhQ29sXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwbGF5ZXIxLmF0dGFjayhkYXRhQ29sLCBkYXRhUm93LCBnYW1lYm9hcmQyKTtcbiAgICAgICAgdXBkYXRlQm9hcmRSZW5kZXIoZ2FtZWJvYXJkMiwgXCJBSVwiKTtcbiAgICAgICAgaWYgKGdhbWVib2FyZDIuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICBkaXNwbGF5V2lubmVyKHRydWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwbGF5ZXIyLmF0dGFja1JhbmRvbVNxdWFyZShnYW1lYm9hcmQxKTtcbiAgICAgICAgdXBkYXRlQm9hcmRSZW5kZXIoZ2FtZWJvYXJkMSwgXCJIdW1hblwiKTtcbiAgICAgICAgaWYgKGdhbWVib2FyZDEuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICBkaXNwbGF5V2lubmVyKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcGxheUFnYWluQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheS1hZ2FpblwiKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByb3RhdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgcm90YXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcm90YXRlLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwcyA9IChzaGlwc0FycmF5LCBnYW1lYm9hcmQxLCBnYW1lYm9hcmQyLCBwbGF5ZXIxLCBwbGF5ZXIyKSA9PiB7XG4gICAgY29uc3QgYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lYm9hcmRcIik7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5IdW1hblwiKTtcbiAgICBzcXVhcmUuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YVJvdyA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gICAgICAgIGNvbnN0IGRhdGFDb2wgPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5jb2wpO1xuICAgICAgICBjb25zdCBpc0hvcml6b250YWwgPSAhcm90YXRlLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKTtcbiAgICAgICAgaWYgKHNoaXBzQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGdhbWVib2FyZDEucGxhY2VTaGlwKGRhdGFDb2wsIGRhdGFSb3csIHNoaXBzQXJyYXlbMF0sIGlzSG9yaXpvbnRhbCk7XG4gICAgICAgICAgaWYgKGdhbWVib2FyZDEuYm9hcmRbZGF0YVJvd11bZGF0YUNvbF0gPT09IHNoaXBzQXJyYXlbMF0pIHtcbiAgICAgICAgICAgIGJvYXJkcy5mb3JFYWNoKChib2FyZCkgPT4gYm9hcmQucmVtb3ZlKCkpO1xuICAgICAgICAgICAgcmVuZGVyQm9hcmQoXCJIdW1hblwiLCBnYW1lYm9hcmQxLCB0cnVlKTtcbiAgICAgICAgICAgIHJlbmRlckJvYXJkKFwiQUlcIiwgZ2FtZWJvYXJkMiwgZmFsc2UpO1xuICAgICAgICAgICAgc2hpcHNBcnJheS5zaGlmdCgpO1xuICAgICAgICAgICAgcGxhY2VTaGlwcyhzaGlwc0FycmF5LCBnYW1lYm9hcmQxLCBnYW1lYm9hcmQyLCBwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNoaXBzQXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgYXR0YWNrQm9hcmRPbkNsaWNrKHBsYXllcjEsIHBsYXllcjIsIGdhbWVib2FyZDEsIGdhbWVib2FyZDIpO1xuICAgICAgICAgIHBsYXlBZ2FpbkJ1dHRvbigpO1xuICAgICAgICAgIHBsYWNlRmxlZXQudGV4dENvbnRlbnQgPSBcIkF0dGFjayB0aGUgZW5lbXkhXCI7XG4gICAgICAgICAgcm90YXRlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJCb2FyZCxcbiAgICBhdHRhY2tCb2FyZE9uQ2xpY2ssXG4gICAgcGxheUFnYWluQnV0dG9uLFxuICAgIHBsYWNlU2hpcHMsXG4gICAgcm90YXRlQnV0dG9uLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVUk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lIGZyb20gXCIuL21vZHVsZXMvR2FtZVwiO1xuXG5HYW1lKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=