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

  sendAttack(board) {
    //This method is to be used for a computer player
    let invalidAttack = true;
    while (invalidAttack) {
      const randX = Math.floor(Math.random() * 10);
      const randY = Math.floor(Math.random() * 10);
      const result = board.receiveAttack(randX, randY);
      invalidAttack = this.#attackedRepeatedSquare(result);
    }
  }

  #attackedRepeatedSquare(obj) {
    return (
      obj.shipHit === undefined &&
      obj.xCoord === undefined &&
      obj.yCoord === undefined
    );
  }
}

export { Player };
