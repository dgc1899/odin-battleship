class Gameboard {
  #board;

  constructor() {
    this.#fillArray();
  }

  #fillArray() {
    this.#board = [];
    for (let i = 0; i < 10; i++) {
      this.#board[i] = new Array(10);
      this.#board[i].fill(0);
    }
  }

  get board() {
    return this.#board;
  }

  #isCoordinateAlreadyOccupied(coord) {
    if (this.#board[coord[0]][coord[1]] != 0) return true;
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
          this.#board[x][y + i] = ship.length;
        } else {
          throw new Error("Space is already occupied!");
        }
      }
    }
    return resultCoords;
  }
}

export { Gameboard };
