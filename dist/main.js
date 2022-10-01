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
  // carrier (5), battleship (4), destroyer (3), submarine (3), patrol boat (2)
  const p1 = (0,_Player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const p1Ships = [(0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(5), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(4), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(2)]; // array.shift();
  const p1Board = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const p2 = (0,_Player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const p2Ships = [(0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(5), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(4), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3), (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(2)];
  const p2Board = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();

  const ui = (0,_UI__WEBPACK_IMPORTED_MODULE_3__["default"])();

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
  p1Board.placeShip(0, 0, (0,_Ship__WEBPACK_IMPORTED_MODULE_2__["default"])(5), true);

  ui.renderBoard("Human", p1Board, true);
  ui.renderBoard("AI", p2Board, true);
  ui.attackBoardOnClick(p1, p2, p1Board, p2Board);
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
    if (x + ship.length - 1 > 9 || y + ship.length - 1 > 9) {
      return;
    }

    // makes sure that the ship will not overlap with another ship
    for (let i = 0; i < ship.length; i += 1) {
      if (board[y][x + i] !== null || board[y + i][x] !== null) {
        return;
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
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/modules/Game.js");


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
      (0,_Game__WEBPACK_IMPORTED_MODULE_0__["default"])();
    })
  }

  const placeShips = () => {
    //carrier (5), battleship (4), destroyer (3), submarine (3), patrol boat (2)
  }

  return { renderBoard, attackBoardOnClick, playAgainButton, placeShips };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLE1BQU0saURBQUk7QUFDVixLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFQSxpRUFBZSxFQUFFLEVBQUM7Ozs7Ozs7VUNwR2xCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0M7O0FBRWxDLHlEQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9HYW1lYm9hcmRcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCBVSSBmcm9tIFwiLi9VSVwiO1xuXG5jb25zdCBHYW1lID0gKCkgPT4ge1xuICAvLyBjYXJyaWVyICg1KSwgYmF0dGxlc2hpcCAoNCksIGRlc3Ryb3llciAoMyksIHN1Ym1hcmluZSAoMyksIHBhdHJvbCBib2F0ICgyKVxuICBjb25zdCBwMSA9IFBsYXllcigpO1xuICBjb25zdCBwMVNoaXBzID0gW1NoaXAoNSksIFNoaXAoNCksIFNoaXAoMyksIFNoaXAoMyksIFNoaXAoMildOyAvLyBhcnJheS5zaGlmdCgpO1xuICBjb25zdCBwMUJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IHAyID0gUGxheWVyKCk7XG4gIGNvbnN0IHAyU2hpcHMgPSBbU2hpcCg1KSwgU2hpcCg0KSwgU2hpcCgzKSwgU2hpcCgzKSwgU2hpcCgyKV07XG4gIGNvbnN0IHAyQm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBjb25zdCB1aSA9IFVJKCk7XG5cbiAgd2hpbGUgKHAyU2hpcHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBjb2luRmxpcCA9IE1hdGgucmFuZG9tKCkgPiAwLjU7XG4gICAgY29uc3Qgc2hpcCA9IHAyU2hpcHNbMF07XG4gICAgcDJCb2FyZC5wbGFjZVNoaXAoeCwgeSwgc2hpcCwgY29pbkZsaXApO1xuICAgIGlmIChwMkJvYXJkLmJvYXJkW3ldW3hdID09PSBzaGlwKSB7XG4gICAgICBwMlNoaXBzLnNoaWZ0KCk7XG4gICAgfVxuICB9XG4gIHAxQm9hcmQucGxhY2VTaGlwKDAsIDAsIFNoaXAoNSksIHRydWUpO1xuXG4gIHVpLnJlbmRlckJvYXJkKFwiSHVtYW5cIiwgcDFCb2FyZCwgdHJ1ZSk7XG4gIHVpLnJlbmRlckJvYXJkKFwiQUlcIiwgcDJCb2FyZCwgdHJ1ZSk7XG4gIHVpLmF0dGFja0JvYXJkT25DbGljayhwMSwgcDIsIHAxQm9hcmQsIHAyQm9hcmQpO1xuICB1aS5wbGF5QWdhaW5CdXR0b24oKTtcbn07XG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICAvLyBjcmVhdGVzIGEgMTB4MTAgYXJyYXkgb2YgbnVsbCB2YWx1ZXNcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgYm9hcmRbaV0gPSBBcnJheSgxMCkuZmlsbChudWxsKTtcbiAgfVxuICBjb25zdCBhdHRhY2tzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShib2FyZCkpO1xuICBjb25zdCBzaGlwc0FycmF5ID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHgsIHksIHNoaXAsIGlzSG9yaXpvbnRhbCkgPT4ge1xuICAgIC8vIG1ha2VzIHN1cmUgc2hpcCBjYW5ub3QgZ28gb2ZmIHRoZSBib2FyZFxuICAgIGlmICh4ICsgc2hpcC5sZW5ndGggLSAxID4gOSB8fCB5ICsgc2hpcC5sZW5ndGggLSAxID4gOSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG1ha2VzIHN1cmUgdGhhdCB0aGUgc2hpcCB3aWxsIG5vdCBvdmVybGFwIHdpdGggYW5vdGhlciBzaGlwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYm9hcmRbeV1beCArIGldICE9PSBudWxsIHx8IGJvYXJkW3kgKyBpXVt4XSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgc2hpcCBpcyBob3Jpem9udGFsLCBwbGFjZSBpdCBzdGFydGluZyBmcm9tIHgsIHksIGZvciBhcyBsb25nIGFzIHRoZSBzaGlwXG4gICAgLy8gZWxzZSwgZG8gdGhlIHNhbWUgdGhpbmcgdmVydGljYWxseVxuICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBib2FyZFt5XVt4ICsgaV0gPSBzaGlwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYm9hcmRbeSArIGldW3hdID0gc2hpcDtcbiAgICAgIH1cbiAgICB9XG4gICAgc2hpcHNBcnJheS5wdXNoKHNoaXApO1xuICB9O1xuXG4gIC8vIGxvb3BzIHRocm91Z2ggdGhlIGdhbWVib2FyZCB0byBmaW5kIGFsbCBwb3NpdGlvbnMgdGhlIHNoaXAgb2NjdXBpZXMgYW5kIHJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBoaXRcbiAgY29uc3QgZmluZEhpdFBvc2l0aW9uID0gKHgsIHksIHNoaXApID0+IHtcbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKGJvYXJkW2pdW2ldID09PSBzaGlwKSB7XG4gICAgICAgICAgaWYgKGogPT09IHkgJiYgaSA9PT0geCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvdW50ZXI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvdW50ZXIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcblxuICAvLyB0YWtlcyBjb29yZGluYXRlcyBhbmQgcmV0dXJucyBpZiBpdCB3YXMgYSBoaXQgb3Igbm90XG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmIChib2FyZFt5XVt4XSAhPT0gbnVsbCkge1xuICAgICAgYXR0YWNrc1t5XVt4XSA9IFwiaGl0XCI7XG4gICAgICAvLyBpZiB0aGUgYm9hcmQgcG9zaXRpb24gaXMgYW4gb2JqZWN0LCBwYXNzZXMgdGhhdCBvYmplY3QgYW5kIGNvb3JkaW5hdGVzIGludG8gdGhlIGZ1bmN0aW9uIHRvIGZpbmQgdGhlIHBvc2l0aW9uIG9mIHRoZSBoaXQgb24gdGhlIHNoaXAgYW5kIHRoZW4gcmVjb3JkcyB0aGF0IGhpdFxuICAgICAgY29uc3QgcG9zaXRpb24gPSBmaW5kSGl0UG9zaXRpb24oeCwgeSwgYm9hcmRbeV1beF0pO1xuICAgICAgYm9hcmRbeV1beF0uaGl0KHBvc2l0aW9uKTtcbiAgICAgIC8vIHVwZGF0ZXMgdGhlIHNoaXBzIGFycmF5IGlmIGEgc2hpcCBpcyBzdW5rXG4gICAgICBpZiAoYm9hcmRbeV1beF0uaXNTdW5rKCkpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBzaGlwc0FycmF5LmluZGV4T2YoYm9hcmRbeV1beF0pO1xuICAgICAgICBzaGlwc0FycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgYXR0YWNrc1t5XVt4XSA9IFwiWFwiO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKHNoaXBzQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgcmV0dXJuIHsgYm9hcmQsIHNoaXBzQXJyYXksIGF0dGFja3MsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYWxsU2hpcHNTdW5rIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJjb25zdCBQbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGF0dGFja0xvY2F0aW9ucyA9IFtdO1xuXG4gIGNvbnN0IGFscmVhZHlBdHRhY2tlZCA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKGF0dGFja0xvY2F0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dGFja0xvY2F0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoYXR0YWNrTG9jYXRpb25zW2ldWzBdID09PSB4ICYmIGF0dGFja0xvY2F0aW9uc1tpXVsxXSA9PT0geSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoeCwgeSwgZ2FtZWJvYXJkKSA9PiB7XG4gICAgaWYgKGFscmVhZHlBdHRhY2tlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIGF0dGFja0xvY2F0aW9ucy5wdXNoKFt4LCB5XSk7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrUmFuZG9tU3F1YXJlID0gKGdhbWVib2FyZCkgPT4ge1xuICAgIGlmIChhdHRhY2tMb2NhdGlvbnMubGVuZ3RoID09PSAxMDApIHJldHVybjtcbiAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB3aGlsZSAoYWxyZWFkeUF0dGFja2VkKHgsIHkpKSB7XG4gICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG4gICAgZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgYXR0YWNrTG9jYXRpb25zLnB1c2goW3gsIHldKTtcbiAgfTtcblxuICByZXR1cm4geyBhdHRhY2ssIGF0dGFja1JhbmRvbVNxdWFyZSwgYWxyZWFkeUF0dGFja2VkIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCBoaXRzID0gQXJyYXkobGVuZ3RoKS5maWxsKG51bGwpO1xuXG4gIGNvbnN0IGhpdCA9IChwb3NpdGlvbikgPT4ge1xuICAgIGlmIChwb3NpdGlvbiA8IGhpdHMubGVuZ3RoKSB7XG4gICAgICBoaXRzW3Bvc2l0aW9uXSA9IHBvc2l0aW9uO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGlmIChoaXRzLmluY2x1ZGVzKG51bGwpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICByZXR1cm4geyBsZW5ndGgsIGhpdCwgaXNTdW5rLCBoaXRzIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuY29uc3QgVUkgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpO1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZU92ZXJNb2RhbFwiKTtcbiAgY29uc3QgZ2FtZU92ZXJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLW92ZXItY29udGVudFwiKTtcblxuICBjb25zdCByZW5kZXJCb2FyZCA9IChwbGF5ZXJOYW1lLCBnYW1lYm9hcmQsIHNob3VsZFJlbmRlcikgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKFwiZ2FtZWJvYXJkXCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzcXVhcmVcIik7XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKHBsYXllck5hbWUpO1xuICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiZGF0YS1yb3dcIiwgaSk7XG4gICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbFwiLCBqKTtcbiAgICAgICAgaWYgKGdhbWVib2FyZC5ib2FyZFtpXVtqXSAhPT0gbnVsbCAmJiBzaG91bGRSZW5kZXIpIHtcbiAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlQm9hcmRSZW5kZXIgPSAoZ2FtZWJvYXJkLCBwbGF5ZXIpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuJHtwbGF5ZXJ9W2RhdGEtcm93PVwiJHtpfVwiXVtkYXRhLWNvbD1cIiR7an1cIl1gXG4gICAgICAgICk7XG4gICAgICAgIGlmIChnYW1lYm9hcmQuYXR0YWNrc1tpXVtqXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnYW1lYm9hcmQuYXR0YWNrc1tpXVtqXSA9PT0gXCJoaXRcIikge1xuICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgICBpZiAoZ2FtZWJvYXJkLmJvYXJkW2ldW2pdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlXaW5uZXIgPSAoaHVtYW5QbGF5ZXIpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5LXdpbm5lclwiKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwic2hvdy1tb2RhbFwiKTtcbiAgICBnYW1lT3ZlckNvbnRlbnQuY2xhc3NMaXN0LmFkZChcInNob3ctbW9kYWxcIik7XG4gICAgaWYgKGh1bWFuUGxheWVyKSB7XG4gICAgICBtZXNzYWdlLnRleHRDb250ZW50ID0gXCJDb25ncmF0dWxhdGlvbnMhIFlvdSB3b24hXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGF0dGFja0JvYXJkT25DbGljayA9IChwbGF5ZXIxLCBwbGF5ZXIyLCBnYW1lYm9hcmQxLCBnYW1lYm9hcmQyKSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5BSVwiKTtcbiAgICBzcXVhcmUuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YVJvdyA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gICAgICAgIGNvbnN0IGRhdGFDb2wgPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5jb2wpO1xuICAgICAgICBpZiAoZ2FtZWJvYXJkMi5hdHRhY2tzW2RhdGFSb3ddW2RhdGFDb2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBsYXllcjEuYXR0YWNrKGRhdGFDb2wsIGRhdGFSb3csIGdhbWVib2FyZDIpO1xuICAgICAgICB1cGRhdGVCb2FyZFJlbmRlcihnYW1lYm9hcmQyLCBcIkFJXCIpO1xuICAgICAgICBpZiAoZ2FtZWJvYXJkMi5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgIGRpc3BsYXlXaW5uZXIodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBsYXllcjIuYXR0YWNrUmFuZG9tU3F1YXJlKGdhbWVib2FyZDEpO1xuICAgICAgICB1cGRhdGVCb2FyZFJlbmRlcihnYW1lYm9hcmQxLCBcIkh1bWFuXCIpO1xuICAgICAgICBpZiAoZ2FtZWJvYXJkMS5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgIGRpc3BsYXlXaW5uZXIoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBwbGF5QWdhaW5CdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYWdhaW4nKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbWVib2FyZCcpO1xuICAgICAgYm9hcmRzLmZvckVhY2goYm9hcmQgPT4ge1xuICAgICAgICBib2FyZC5yZW1vdmUoKTtcbiAgICAgIH0pXG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93LW1vZGFsJyk7XG4gICAgICBnYW1lT3ZlckNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1tb2RhbCcpO1xuICAgICAgR2FtZSgpO1xuICAgIH0pXG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXBzID0gKCkgPT4ge1xuICAgIC8vY2FycmllciAoNSksIGJhdHRsZXNoaXAgKDQpLCBkZXN0cm95ZXIgKDMpLCBzdWJtYXJpbmUgKDMpLCBwYXRyb2wgYm9hdCAoMilcbiAgfVxuXG4gIHJldHVybiB7IHJlbmRlckJvYXJkLCBhdHRhY2tCb2FyZE9uQ2xpY2ssIHBsYXlBZ2FpbkJ1dHRvbiwgcGxhY2VTaGlwcyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVUk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lIGZyb20gXCIuL21vZHVsZXMvR2FtZVwiO1xuXG5HYW1lKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=