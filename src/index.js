import "./style.css";
import { GameboardView } from "./Views/GameboardView";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
import { Player } from "./Player";

// driver code

let player1 = new Player("Joe");
let player2 = new Player("Jane");

let gameBoardView1 = new GameboardView(player1.board, "player1");
let gameBoardView2 = new GameboardView(player2.board, "player2");

let ship1 = new Ship(2);
let ship2 = new Ship(2);
let ship3 = new Ship(3);
let ship4 = new Ship(4);
let ship5 = new Ship(5);

let ship6 = new Ship(2);
let ship7 = new Ship(2);
let ship8 = new Ship(2);
let ship9 = new Ship(2);
let ship10 = new Ship(2);

player1.board.placeShip(ship1, 0, 0);
player1.board.placeShip(ship2, 1, 0);
player1.board.placeShip(ship3, 2, 0);
player1.board.placeShip(ship4, 3, 0);
player1.board.placeShip(ship5, 4, 0);

player2.board.placeShip(ship6, 5, 5);
player2.board.placeShip(ship6, -1, 0);

gameBoardView1.render();
gameBoardView2.render();
