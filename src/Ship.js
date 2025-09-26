const ShipTypes = Object.freeze({
  PTBOAT: 2,
  DESTROYER: 3,
  CRUISER: 4,
  BATTLESHIP: 5,
});

class Ship {
  #length;
  #noHits;
  #sunk;

  constructor(length) {
    this.#length = this.#setLength(length);
    this.#noHits = 0;
    this.#sunk = false;
  }

  #setLength(length) {
    if (Object.values(ShipTypes).includes(length)) {
      return length;
    }
    throw new Error("Invalid length");
  }

  get length() {
    return this.#length;
  }

  get noHits() {
    return this.#noHits;
  }

  isSunk() {
    if (this.#noHits == this.#length) {
      this.#sunk = true;
    } else {
      this.#sunk = false;
    }
    return this.#sunk;
  }

  hit() {
    this.#noHits++;
  }
}

export { Ship };
