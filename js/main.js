import { Board } from "./game.js";
import { loadBest, saveBest, loadGame, saveGame, clearGame } from "./storage.js";
import { render, renderBoard, renderScore, showOverlay, hideOverlay } from "./ui/render.js";
import { bindControls } from "./ui/input.js";
import { onMove } from "./input.js";
import { TILES } from "./ui/tiles.js";

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
  renderBoard(board.grid);
  renderScore(board.score, best);
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
    endGame("Перемога (буде 15 травня)");
  } else if (!board.canMove()) {
    endGame("Гру закінчено (сюююююшеп)");
  }
}

function endGame(text) {
  isOver = true;
  clearGame(); // щоб після перезавантаження почалась нова гра
  showOverlay(text);
}

onMove(handleMove);
bindControls({ onNewGame: startNewGame });

loadOrStart();

Object.values(TILES).forEach(({ src }) => { new Image().src = src; });
