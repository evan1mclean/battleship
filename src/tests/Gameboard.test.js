import Gameboard from "../modules/Gameboard";
import Ship from "../modules/Ship";

describe("Gameboard factory function tests", () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = Gameboard();
    ship = Ship(3);
  });

  test("Initializes a 10x10 grid", () => {
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
  });

  describe("placeShip function tests", () => {
    test("Can place a ship horizontally on the board", () => {
      gameboard.placeShip(0, 0, ship, true);
      let testArray = [
        gameboard.board[0][0],
        gameboard.board[0][1],
        gameboard.board[0][2],
      ];
      expect(testArray).toEqual([ship, ship, ship]);
    });

    test("Can place a ship vertically on the board", () => {
      gameboard.placeShip(0, 0, ship, false);
      let testArray = [
        gameboard.board[0][0],
        gameboard.board[1][0],
        gameboard.board[2][0],
      ];
      expect(testArray).toEqual([ship, ship, ship]);
    });

    test("Cannot place ship if it will go off the board horizontally", () => {
      gameboard.placeShip(8, 0, ship, true);
      let testArray = [gameboard.board[0][8], gameboard.board[0][8]];
      expect(testArray).toEqual([null, null]);
    });

    test("Cannot place ship if it will go off the board vertically", () => {
      gameboard.placeShip(0, 8, ship, false);
      let testArray = [gameboard.board[8][0], gameboard.board[8][0]];
      expect(testArray).toEqual([null, null]);
    });

    test("Cannot place ship if it overlaps another ship", () => {
      let ship2 = Ship(3);
      gameboard.placeShip(2, 0, ship, true);
      gameboard.placeShip(0, 0, ship, true);
      let testArray = [
        gameboard.board[0][0],
        gameboard.board[0][1],
        gameboard.board[0][2],
        gameboard.board[0][3],
        gameboard.board[0][4],
        gameboard.board[0][5],
      ];
      expect(testArray[0]).toEqual(null);
      expect(testArray[2]).toEqual(ship);
    });
  });

  describe("receiveAttack function tests", () => {
    beforeEach(() => {
      gameboard.placeShip(0, 4, ship, true);
    });

    test("Missed attack returns false", () => {
      expect(gameboard.receiveAttack(0, 0)).toBe(false);
    });

    test("Successful attack returns true", () => {
      expect(gameboard.receiveAttack(0, 4)).toBe(true);
    });

    test("Successful attack hits the correct position on horizontal ship", () => {
      gameboard.receiveAttack(1, 4);
      expect(ship.hits[1]).toBe(1);
    });

    test("Successful attack hits the correct position on vertical ship", () => {
      const ship2 = Ship(3);
      gameboard.placeShip(4, 2, ship2, false);
      gameboard.receiveAttack(4, 3);
      expect(ship2.hits[1]).toBe(1);
    });

    test("Game board keeps track of missed attack", () => {
      gameboard.receiveAttack(7, 6);
      console.log(gameboard.missedAttacks);
      expect(gameboard.missedAttacks[6][7]).toBe("X");
    });
  });

  describe("allShipsSunk function tests", () => {
    beforeEach(() => {
      const ship2 = Ship(3);
      gameboard.placeShip(0, 0, ship, true);
      gameboard.placeShip(0, 1, ship2, true);
    });

    test("Returns false if ships aren't sunk", () => {
      expect(gameboard.allShipsSunk()).toBe(false);
    });

    test("Returns true if all ships are sunk", () => {
      gameboard.receiveAttack(0, 0);
      gameboard.receiveAttack(1, 0);
      gameboard.receiveAttack(2, 0);
      gameboard.receiveAttack(0, 1);
      gameboard.receiveAttack(1, 1);
      gameboard.receiveAttack(2, 1);
      expect(gameboard.allShipsSunk()).toBe(true);
    });
  });
});
