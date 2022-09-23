import Ship from "../modules/ship";

describe("Ship factory function tests", () => {
  let ship;

  beforeEach(() => {
    ship = Ship(3);
  });

  test("Ship has length property", () => {
    expect(ship.length).toBe(3);
  });

  test("Ship takes a hit", () => {
    ship.hit(1);
    expect(ship.hits).toContain(1);
  });

  test("Ship cannot take hit from position outside of the hits array", () => {
    ship.hit(3);
    expect(ship.hits).not.toContain(4);
  });

  test("Ship sinks when all positions of it are hit", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBe(true);
  });

  test("isSunk returns false if not all positions are hit", () => {
    ship.hit(1);
    expect(ship.isSunk()).toBe(false);
  })
});