import { Gameboard } from "./Gameboard";

class Player {
  #name;
  #board;

  constructor(name) {
    this.#name = name;
    this.#board = new Gameboard();
  }

  get name() {
    return this.#name;
  }

  get board() {
    return this.#board;
  }

  sendAttack(board, x, y) {
    board.receiveAttack(x, y);
  }
}

export { Player };
