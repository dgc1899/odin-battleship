import { Ship } from "./Ship";
class Gameboard {
  #board;

  constructor() {
    this.#fillArray();
  }

  #fillArray() {
    this.#board = [];
    for (let i = 0; i < 10; i++) {
      this.#board[i] = [];
      for (let j = 0; j < 10; j++) {
        this.#board[i][j] = { ship: undefined, attacked: false };
      }
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

  placeShip(shipData, xString, yString) {
    const ship = new Ship(shipData.length);
    const x = parseInt(xString);
    const y = parseInt(yString);
    const boundary = 10;
    let resultCoords = [];
    //TODO vertical implementation
    if (x <= boundary && x >= 0 && y + ship.length <= boundary) {
      for (let i = 0; i < ship.length; i++) {
        resultCoords.push([x, y + i]);
        if (!this.#isCoordinateAlreadyOccupied(resultCoords[i])) {
          this.#board[x][y + i] = { ship: ship, attacked: false };
        } else {
          return [];
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
        attackedCoord["ship"].isSunk();
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
