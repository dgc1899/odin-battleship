import { Ship } from "../src/Ship.js";

class Gameboard {
  #board;

  constructor() {
    this.#fillArray();
  }

  #fillArray() {
    this.#board = [];
    for (let i = 0; i < 10; i++) {
      this.#board[i] = new Array(10);
      this.#board[i].fill({ ship: undefined, attacked: false });
    }
  }

  get board() {
    return this.#board;
  }

  #isCoordinateAlreadyOccupied(coord) {
    if (!Object.values(this.#board[coord[0]][coord[1]]).includes(undefined)) {
      return true;
    }
    return false;
  }

  placeShip(ship, x, y) {
    const boundary = 10;
    let resultCoords = [];
    //TODO vertical implementation
    if (x < boundary && y + ship.length <= boundary) {
      for (let i = 0; i < ship.length; i++) {
        resultCoords.push([x, y + i]);
        if (!this.#isCoordinateAlreadyOccupied(resultCoords[i])) {
          this.#board[x][y + i] = { ship: ship, attacked: false };
        } else {
          throw new Error("Space is already occupied!");
        }
      }
    }
    return resultCoords;
  }

  #areCoordinatesValid(x, y) {
    const boundary = 10;
    if (x >= 0 && x < boundary && y >= 0 && y < boundary) {
      return true;
    }
    return false;
  }

  receiveAttack(x, y) {
    if (!this.#areCoordinatesValid(x, y)) {
      throw new Error("Coordinates are not valid");
    }
    const attackedCoord = this.#board[x][y];
    let result = {};
    if (attackedCoord["attacked"] == true) {
      result = {
        shipHit: undefined,
        xCoord: undefined,
        yCoord: undefined,
      };
    } else {
      this.#board[x][y]["attacked"] = true;
      if (attackedCoord["ship"] !== undefined) {
        attackedCoord["ship"].hit(); //Hit the ship
        result = {
          shipHit: this.board[x][y]["ship"],
          xCoord: x,
          yCoord: y,
        };
      } else {
        result = {
          shipHit: undefined,
          xCoord: x,
          yCoord: y,
        };
      }
    }
    return result;
  }

  #getShips() {
    let ships = new Set();
    for (let row of this.#board) {
      for (let cell of row) {
        if (cell.ship) ships.add(cell.ship);
      }
    }
    return Array.from(ships);
  }

  isFleetSunk() {
    let uniqueShips = this.#getShips();
    for (let ship of uniqueShips) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}

export { Gameboard };
