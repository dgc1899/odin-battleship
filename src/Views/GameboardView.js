class GameboardView {
  #playerId;
  #gameboardObj;
  #boardContainer;

  constructor(gameboardObj, playerId) {
    this.#playerId = playerId;
    this.#gameboardObj = gameboardObj;
    this.#setupBoard();
  }

  #setupBoard() {
    this.#boardContainer = document.querySelector(".board-container");
    const squares = this.#initializeBoardSquares();
    const boardDiv = document.createElement("div");
    boardDiv.classList.add(`board`);
    boardDiv.classList.add(`${this.#playerId}`);

    squares.forEach((square) => {
      boardDiv.appendChild(square);
    });
    this.#boardContainer.appendChild(boardDiv);
  }

  #initializeBoardSquares() {
    let boardSquares = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement("div");
        square.classList.add("board-square");
        square.textContent = `${j},${i}`;
        square.dataset.xCoord = j;
        square.dataset.yCoord = i;
        square.dataset.ship = "undefined";
        square.dataset.attacked = "undefined";
        boardSquares.push(square);
      }
    }
    return boardSquares;
  }

  #getGameboardSquare(x, y) {
    return document.querySelector(
      `div.${this.#playerId} > div.board-square[data-x-coord='${x}'][data-y-coord='${y}']`,
    );
  }

  render() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const currentSquareStatus = this.#gameboardObj.board[i][j];
        const boardSquareView = this.#getGameboardSquare(i, j);
        boardSquareView.dataset.ship = currentSquareStatus.ship
          ? currentSquareStatus.ship.length
          : "undefined";
        boardSquareView.dataset.attacked = currentSquareStatus.attacked;
      }
    }
  }
}

export { GameboardView };
