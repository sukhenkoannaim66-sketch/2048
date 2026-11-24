import { Board } from "./game.js";
import { loadBest, saveBest, loadGame, saveGame, clearGame } from "./storage/storage.js";
import { render, showOverlay, hideOverlay } from "./ui/render.js";
import { onMove } from "./ui/input.js";

let board;
let best = loadBest();
let isOver = false;

function startNewGame() {
  board = new Board();
  board.addRandomTile();
  board.addRandomTile();
  isOver = false;
  saveGame(board.toJSON());
  hideOverlay();
  render(board.grid, board.score, best);
}

function loadOrStart() {
  const saved = loadGame();
  if (saved) {
    board = Board.fromJSON(saved);
    isOver = false;
    hideOverlay();
    render(board.grid, board.score, best);
  } else {
    startNewGame();
  }
}

function handleMove(direction) {
  if (isOver) return;

  const result = board.move(direction);
  if (!result.moved) return;

  const newTile = board.addRandomTile();

  if (board.score > best) {
    best = board.score;
    saveBest(best);
  }
  saveGame(board.toJSON());

  render(board.grid, board.score, best, { newTile, merged: result.merged });

  if (board.hasWon()) {
    endGame("Перемога!");
  } else if (!board.canMove()) {
    endGame("Гру закінчено");
  }
}

function endGame(text) {
  isOver = true;
  clearGame(); // щоб після перезавантаження почалась нова гра
  showOverlay(text);
}

onMove(handleMove);
document.querySelector("#new-game").addEventListener("click", startNewGame);
document.querySelector("#overlay-btn").addEventListener("click", startNewGame);

loadOrStart();

