import { Gameboard } from "../src/Gameboard.js";
import { Ship } from "../src/Ship.js";

jest.mock("../src/Ship.js");

beforeEach(() => {
  Ship.mockClear();
});

it("Test that the gameboard is initialized empty", () => {
  const board = new Gameboard();
  const isEmpty = board.board.every((row) =>
    row.every((element) => element === 0),
  );
  expect(isEmpty).toBe(true);
});

it("Test place ship in board in valid position", () => {
  const board = new Gameboard();
  Ship.mockImplementation((length) => ({ length }));
  const mockShip = new Ship(2);
  const expected = [
    [0, 0],
    [0, 1],
  ];

  expect(board.placeShip(mockShip, 0, 0)).toEqual(expected);
});

it("Test place ship in board in valid position", () => {
  const board = new Gameboard();
  Ship.mockImplementation((length) => ({ length }));
  const mockShip = new Ship(5);
  const expected = [
    [5, 5],
    [5, 6],
    [5, 7],
    [5, 8],
    [5, 9],
  ];
  expect(board.placeShip(mockShip, 5, 5)).toEqual(expected);
});

it("Test place ship in board in invalid position", () => {
  const board = new Gameboard();
  Ship.mockImplementation((length) => ({ length }));
  const mockShip = new Ship(5);
  const expected = [];
  expect(board.placeShip(mockShip, 5, 6)).toEqual(expected);
});

it("Test place ship in board in an occupied position", () => {
  const board = new Gameboard();
  Ship.mockImplementation((length) => ({ length }));

  const mockShip = new Ship(5);
  const mockShip2 = new Ship(3);

  board.placeShip(mockShip, 5, 5);

  expect(() => board.placeShip(mockShip2, 5, 5)).toThrow();
});
