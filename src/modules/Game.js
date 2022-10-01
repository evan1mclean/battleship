import Player from "./Player";
import Gameboard from "./Gameboard";
import Ship from "./Ship";
import UI from "./UI";

const Game = () => {
  const p1 = Player();
  const p1Ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
  const p1Board = Gameboard();
  const p2 = Player();
  const p2Ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
  const p2Board = Gameboard();

  const ui = UI();
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
export default Game;
