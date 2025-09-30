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

it("Reports if all ships are sunk", () => {
  const board = new Gameboard();
  Ship.mockImplementation((length) => ({
    length,
    hit: jest.fn(),
    isSunk: jest.fn(() => true),
  }));
  const mockShip = new Ship(2);
  const mockShip2 = new Ship(4);

  board.placeShip(mockShip, 0, 0);
  board.placeShip(mockShip2, 4, 2);

  board.receiveAttack(0, 0);
  board.receiveAttack(0, 0);
  board.receiveAttack(4, 2);
  board.receiveAttack(4, 3);
  board.receiveAttack(4, 4);
  board.receiveAttack(4, 5);

  const actual = board.isFleetSunk();
  expect(actual).toBeTruthy();
});

it("Reports that not all ships are sunk with no attacks received", () => {
  const board = new Gameboard();
  Ship.mockImplementation((length) => ({
    length,
    hit: jest.fn(),
    isSunk: jest.fn(() => false),
  }));
  const mockShip = new Ship(2);
  const mockShip2 = new Ship(4);
  const mockShip3 = new Ship(5);
  const mockShip4 = new Ship(3);
  const mockShip5 = new Ship(2);

  board.placeShip(mockShip, 0, 0);
  board.placeShip(mockShip2, 4, 2);
  board.placeShip(mockShip3, 5, 5);
  board.placeShip(mockShip4, 6, 0);
  board.placeShip(mockShip5, 0, 2);

  const actual = board.isFleetSunk();
  expect(actual).toBeFalsy();
});

it("Reports that not all ships are sunk if a ship is damaged", () => {
  const board = new Gameboard();
  Ship.mockImplementation((length) => ({
    length,
    hit: jest.fn(),
    isSunk: jest.fn(() => false),
  }));
  const mockShip = new Ship(2);
  const mockShip2 = new Ship(4);
  const mockShip3 = new Ship(5);
  const mockShip4 = new Ship(3);
  const mockShip5 = new Ship(2);

  board.placeShip(mockShip, 0, 0);
  board.placeShip(mockShip2, 4, 2);
  board.placeShip(mockShip3, 5, 5);
  board.placeShip(mockShip4, 6, 0);
  board.placeShip(mockShip5, 0, 2);

  board.receiveAttack(5, 6);

  const actual = board.isFleetSunk();
  expect(actual).toBeFalsy();
});

it("Reports that not all ships are sunk if all but one ship has been sunk", () => {
  const board = new Gameboard();
  Ship.mockImplementation((length) => ({
    length,
    hit: jest.fn(),
    isSunk: jest.fn(() => false),
  }));
  const mockShip = new Ship(2);
  const mockShip2 = new Ship(4);
  const mockShip3 = new Ship(5);
  const mockShip4 = new Ship(3);
  const mockShip5 = new Ship(2);

  const ships = [
    { ship: mockShip, coords: board.placeShip(mockShip, 0, 0) },
    { ship: mockShip2, coords: board.placeShip(mockShip2, 4, 2) },
    { ship: mockShip3, coords: board.placeShip(mockShip3, 5, 5) },
    { ship: mockShip4, coords: board.placeShip(mockShip4, 6, 0) },
    { ship: mockShip5, coords: board.placeShip(mockShip5, 0, 2) },
  ];

  // Call receiveAttack on every coordinate of every ship except one (leave one unsunk)
  ships.slice(0, -1).forEach(({ coords }) => {
    coords.forEach(([x, y]) => board.receiveAttack(x, y));
  });

  // Now test isFleetSunk
  const actual = board.isFleetSunk();
  expect(actual).toBeFalsy();
});
