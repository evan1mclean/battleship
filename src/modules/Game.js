import Player from "./Player";
import Gameboard from "./Gameboard";
import Ship from "./Ship";
import UI from "./UI";

const Game = () => {
  // carrier (5), battleship (4), destroyer (3), submarine (3), patrol boat (2)
  const p1 = Player();
  const p1Ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)]; // array.shift();
  const p1Board = Gameboard();
  const p2 = Player();
  const p2Ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
  const p2Board = Gameboard();

  const ui = UI();

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
  p1Board.placeShip(0, 0, Ship(5), true);

  ui.renderBoard("Human", p1Board, true);
  ui.renderBoard("AI", p2Board, true);
  ui.attackBoardOnClick(p1, p2, p1Board, p2Board);
  ui.playAgainButton();
};
export default Game;
