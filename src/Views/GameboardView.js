class GameboardView {
  #gameboardObj;
  #boardContainer;
  #boardDiv;
  #isCensored;
  #onAttackCallback;
  #makeBoardClickableHandler;

  constructor(gameboardObj, isCensored, onAttackCallback) {
    this.#isCensored = isCensored;
    this.#gameboardObj = gameboardObj;
    this.#onAttackCallback = onAttackCallback;
    this.#makeBoardClickableHandler = (e) => this.#receiveAttack(e);
    this.#setupBoard();
  }

  #setupBoard() {
    this.#boardContainer = document.querySelector(".board-container");
    const squares = this.#initializeBoardSquares();
    const boardDiv = document.createElement("div");
    boardDiv.classList.add(`board`);
    boardDiv.dataset.hidden = this.#isCensored;

    squares.forEach((square) => {
      boardDiv.appendChild(square);
    });
    this.#boardContainer.appendChild(boardDiv);
    this.#boardDiv = boardDiv;
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
        square.dataset.attacked = false;
        boardSquares.push(square);
      }
    }
    return boardSquares;
  }

  #getGameboardSquare(x, y) {
    return this.#boardDiv.querySelector(
      `div > div.board-square[data-x-coord='${x}'][data-y-coord='${y}']`,
    );
  }

  makeBoardClickable() {
    this.#boardDiv.addEventListener("click", this.#makeBoardClickableHandler);
  }

  makeBoardUnclickable() {
    this.#boardDiv.removeEventListener(
      "click",
      this.#makeBoardClickableHandler,
    );
  }

  #receiveAttack(e) {
    const attackedSquare = e.target;
    let hitCoordinate = undefined;
    if (attackedSquare.dataset.attacked == "false") {
      e.target.dataset.attacked = true;
      //Call to the Gameboard obj method
      hitCoordinate = this.#gameboardObj.receiveAttack(
        attackedSquare.dataset.xCoord,
        attackedSquare.dataset.yCoord,
      );
      this.makeBoardUnclickable();
      const isGameOver = this.#gameboardObj.isFleetSunk();
      this.#onAttackCallback(hitCoordinate, isGameOver);
    } else {
      console.log("Coordinate already hit");
    }
  }

  renderGameOver() {
    this.#boardContainer.remove();
    const gameOverTitle = document.createElement("div");
    gameOverTitle.textContent = "Game over";
    document.body.appendChild(gameOverTitle);
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
