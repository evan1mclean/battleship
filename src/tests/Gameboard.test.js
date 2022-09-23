import Gameboard from "../modules/Gameboard";
import Ship from "../modules/Ship";

describe("Gameboard factory function tests", () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = Gameboard();
    
  });

  test("Initializes a 10x10 grid", () => {
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
  });

  describe('placeShip function tests', () => {
    beforeEach(() => {
      ship = Ship(3);
    });

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
  })
});
