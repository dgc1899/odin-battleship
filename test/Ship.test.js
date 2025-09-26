/* eslint-env jest */

import { Ship } from "../src/Ship.js";

it("Tests if ship is sunk", () => {
  let ship = new Ship(5);
  for (let i = 0; i < 5; i++) {
    ship.hit();
  }
  expect(ship.isSunk()).toBeTruthy();
});

it("Test that a ship is not sunk", () => {
  let ship = new Ship(5);
  ship.hit();
  expect(ship.isSunk()).toBeFalsy();
});

it("Test that the hit counter is incremented", () => {
  let ship = new Ship(3);
  ship.hit();
  expect(ship.noHits).toBe(1);
});

it("Test that the hit counter is incremented (negative)", () => {
  let ship = new Ship(3);
  ship.hit();
  expect(ship.noHits).not.toBe(2);
});
