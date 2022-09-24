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
        return;
      }
    }

    // if ship is horizontal, place it starting from x, y, for as long as the ship
    // else, do the same thing vertically
    if (isHorizontal) {
      for (let i = 0; i < ship.length; i += 1) board[y][x + i] = ship;
    } else {
      for (let i = 0; i < ship.length; i += 1) board[y + i][x] = ship;
    }
  };

  // function that takes the attack coordinates and ship object and loops through the gameboard from left to right and then down and increments a counter until it hits the attack coordinate and then returns the counter which will be the position used to record a hit on the ship.
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
      // if the board position is an object, passes that object and coordinates into the function to find the position of the hit on the ship and then records that hit
      const position = findHitPosition(x, y, board[y][x]);
      board[y][x].hit(position);
      return true;
    }
    return false;
  };
  return { board, placeShip, receiveAttack };
};

export default Gameboard;
