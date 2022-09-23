const Gameboard = () => {
  // creates a 10x10 array of null values
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    board[i] = Array(10).fill(null);
  }

  const placeShip = (x, y, ship, isHorizontal) => {
    // makes sure ship cannot go off the board
    if (x + ship.length - 1 > 9 || y + ship.length - 1 > 9) {
      return;
    }

    // makes sure that the ship will not overlap with another ship
    for (let i = 0; i < ship.length; i += 1) {
      if (board[y][x + i] !== null || board[y + i][x] !== null) {
        return
      }
    }

    // if ship is horizontal, place it starting from x, y, for as long as the ship
    // else, do the same thing vertically
    if (isHorizontal) {
      for (let i = 0; i < ship.length; i += 1)
        board[y][x + i] = ship;
    } else {
      for (let i = 0; i < ship.length; i += 1)
        board[y + i][x] = ship;
    }
  }
  return { board, placeShip };
};

export default Gameboard;
