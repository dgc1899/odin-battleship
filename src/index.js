import "./style.css";
import { GameboardView } from "./Views/GameboardView";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
import { Player } from "./Player";

// driver code
// make core state accessible to other functions (attach currentPlayer to window so other modules can read it)
let player1;
let player2;
let gameBoardView1;
let gameBoardView2;
window.currentPlayer = undefined;

const callbackShipZone = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type == "childList") {
      if (mutation.nextSibling == null) {
        const startGameButton = document.querySelector("button");
        startGameButton.disabled = false;
      }
    }
  }
};

function generateRandomCoords() {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

function setUpShipZoneDivObserver(shipZoneDiv) {
  const config = { attributes: false, childList: true, subtree: true };
  const observer = new MutationObserver(callbackShipZone);
  observer.observe(shipZoneDiv, config);
}

function initializeShipZone() {
  const shipZoneDiv = document.createElement("div");
  shipZoneDiv.classList.add("shipzone");
  let ships = [new Ship(2), new Ship(3), new Ship(4), new Ship(5)];

  ships.forEach((ship) => {
    let shipSquare = undefined;
    shipSquare = document.createElement("div");
    shipSquare.classList.add("ship");
    shipSquare.classList.add(ship.length);
    shipSquare.style.height = "32px";
    shipSquare.style.width = `${32 * ship.length}px`;
    shipSquare.draggable = true;
    shipSquare.addEventListener("dragstart", (e) => {
      shipSquare.id = "dragged-ship";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("application/json", JSON.stringify(ship));
    });
    shipSquare.addEventListener("dragend", (e) => {
      shipSquare.removeAttribute("id");
    });
    shipZoneDiv.appendChild(shipSquare);
  });
  setUpShipZoneDivObserver(shipZoneDiv);
  document.body.appendChild(shipZoneDiv);
}

function setUpEnemyBoard() {
  let ships = [new Ship(2), new Ship(3), new Ship(4), new Ship(5)];

  ships.forEach((ship) => {
    let randomCoords = generateRandomCoords();
    let result = player2.board.placeShip(
      ship,
      randomCoords[0],
      randomCoords[1],
    );

    while (result.length == 0) {
      randomCoords = generateRandomCoords();
      result = player2.board.placeShip(ship, randomCoords[0], randomCoords[1]);
    }
  });
}

player1 = new Player("Joe");
player2 = new Player("Jane");

function setupGame() {
  gameBoardView1 = new GameboardView(
    player1.board,
    false,
    (hitCoordinate, isGameOver) => handleTurn(hitCoordinate, isGameOver),
  );
  gameBoardView2 = new GameboardView(
    player2.board,
    false,
    (hitCoordinate, isGameOver) => handleTurn(hitCoordinate, isGameOver),
  );
  gameBoardView1.render();
  gameBoardView2.render();

  const startButton = document.createElement("button");
  startButton.textContent = "Start game";
  startButton.addEventListener("click", startGame);
  initializeShipZone();

  document.body.appendChild(startButton);
  startButton.disabled = true;
}

function startGame() {
  // human (player1) starts
  window.currentPlayer = "player1";

  setUpEnemyBoard();
  gameBoardView1.render();
  gameBoardView2.render();

  gameBoardView2.makeBoardClickable();
  document.body.removeChild(document.querySelector("button"));
}

function handleTurn(hitCoordinate, isGameOver) {
  if (isGameOver) {
    gameBoardView1.renderGameOver();
  } else {
    if (window.currentPlayer == "player1") {
      gameBoardView2.makeBoardUnclickable();
      gameBoardView1.makeBoardClickable();
      window.currentPlayer = "player2";
      player2.sendAttack(player1.board);
      gameBoardView1.render();
      window.currentPlayer = "player1";
      gameBoardView1.makeBoardUnclickable();
      gameBoardView2.makeBoardClickable();
    }
  }
}

setupGame();
