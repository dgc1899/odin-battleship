import { Gameboard } from "../src/Gameboard.js";
import { Ship } from "../src/Ship.js";

jest.mock("../src/Ship.js");

beforeEach(() => {
  Ship.mockClear();
});

it("Test that the gameboard is initialized empty", () => {
  const board = new Gameboard();
  const isEmpty = board.board.every((row) =>
    row.every(() => ({ ship: undefined, isSunk: 0 })),
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

it("Receive an attack in an empty cell", () => {
  const board = new Gameboard();
  const coords = [0, 0];
  const expected = {
    shipHit: undefined,
    xCoord: 0,
    yCoord: 0,
  };

  expect(board.receiveAttack(coords[0], coords[1])).toEqual(expected);
});

it("Receive an attack in an empty cell", () => {
  const board = new Gameboard();
  const coords = [9, 9];
  const expected = {
    shipHit: undefined,
    xCoord: 9,
    yCoord: 9,
  };

  expect(board.receiveAttack(coords[0], coords[1])).toEqual(expected);
});

it("Receive an attack in an empty cell", () => {
  const board = new Gameboard();
  const coords = [5, 4];
  const expected = {
    shipHit: undefined,
    xCoord: 5,
    yCoord: 4,
  };

  expect(board.receiveAttack(coords[0], coords[1])).toEqual(expected);
});

it("Receive an attack in an invalid cell", () => {
  const board = new Gameboard();
  const coords = [-1, 10];
  expect(() => board.receiveAttack(coords[0], coords[1])).toThrow();
});

it("Receive an attack in a cell occupied by a ship", () => {
  const board = new Gameboard();
  Ship.mockImplementation((length) => ({ length, hit: jest.fn() }));
  const ship = new Ship(3);
  const expected = {
    shipHit: ship,
    xCoord: 0,
    yCoord: 0,
  };

  board.placeShip(ship, 0, 0);
  const actual = board.receiveAttack(0, 0);

  expect(actual).toEqual(expected);
});

it("Receive an attack in a cell that was already attacked before", () => {
  const board = new Gameboard();
  const expected = {
    shipHit: undefined,
    xCoord: undefined,
    yCoord: undefined,
  };
  board.receiveAttack(5, 5);

  expect(board.receiveAttack(5, 5)).toEqual(expected);
});

it("Receive an attack in a cell occupied by a ship AND that has been attacked before", () => {
  const board = new Gameboard();
  Ship.mockImplementation((length) => ({ length, hit: jest.fn() }));
  const mockShip = new Ship(5);
  board.placeShip(mockShip, 2, 3);
  board.receiveAttack(2, 5);

  const actual = board.receiveAttack(2, 5);
  const expected = {
    shipHit: undefined,
    xCoord: undefined,
    yCoord: undefined,
  };

  expect(actual).toEqual(expected);
});
