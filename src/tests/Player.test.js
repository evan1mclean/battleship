import Player from "../modules/Player";
import Gameboard from "../modules/Gameboard";
import Ship from "../modules/Ship";

describe("Player function tests", () => {
  let gameboard;
  let ship;
  let player;

  beforeEach(() => {
    player = Player();
    gameboard = Gameboard();
    ship = Ship(3);
    gameboard.placeShip(0, 0, ship, true);
  });

  test("Player attack is registered", () => {
    player.attack(0, 0, gameboard);
    expect(ship.hits[0]).toBe(0);
  });

  test("Player can attack random square", () => {
    for (let i = 0; i <= 100; i++) {
      player.attackRandomSquare(gameboard);
    }
    expect(gameboard.allShipsSunk()).toBe(true);
  })
});
