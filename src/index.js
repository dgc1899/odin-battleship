import "./style.css";
import { GameboardView } from "./Views/GameboardView";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
import { Player } from "./Player";

// driver code
const startButton = document.createElement("button");
startButton.textContent = "Start game";
startButton.addEventListener("click", startGame);

document.body.appendChild(startButton);

// make core state accessible to other functions (attach currentPlayer to window so other modules can read it)
let player1;
let player2;
let gameBoardView1;
let gameBoardView2;
window.currentPlayer = undefined;

function startGame() {
  player1 = new Player("Joe");
  player2 = new Player("Jane");

  // human (player1) starts
  window.currentPlayer = "player1";

  gameBoardView1 = new GameboardView(
    player1.board,
    false,
    (hitCoordinate, isGameOver) => handleTurn(hitCoordinate, isGameOver),
  );
  gameBoardView2 = new GameboardView(
    player2.board,
    true,
    (hitCoordinate, isGameOver) => handleTurn(hitCoordinate, isGameOver),
  );

  let ship1 = new Ship(2);
  let ship2 = new Ship(3);
  let ship3 = new Ship(4);
  let ship4 = new Ship(5);

  let ship5 = new Ship(2);
  let ship6 = new Ship(3);
  let ship7 = new Ship(4);
  let ship8 = new Ship(5);

  // place player1 ships
  player1.board.placeShip(ship1, 0, 0);
  player1.board.placeShip(ship2, 1, 0);
  player1.board.placeShip(ship3, 2, 0);
  player1.board.placeShip(ship4, 3, 0);

  // place player2 ships (valid positions)
  player2.board.placeShip(ship5, 5, 5);
  player2.board.placeShip(ship6, 6, 5);
  player2.board.placeShip(ship7, 7, 5);
  player2.board.placeShip(ship8, 8, 5);

  gameBoardView1.render();
  gameBoardView2.render();

  gameBoardView2.makeBoardClickable();
  document.body.removeChild(startButton);
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
