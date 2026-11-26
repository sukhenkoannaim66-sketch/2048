import { createCell, createTile } from "./tiles.js";

const boardEl = document.getElementById("board");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const overlayEl = document.getElementById("overlay");
const overlayTextEl = document.getElementById("overlay-text");

const keyOf = ({ row, col }) => `${row},${col}`;

export function renderBoard(grid, { newTile = null, merged = [] } = {}) {
  const newKey = newTile ? keyOf(newTile) : null;
  const mergedKeys = new Set(merged.map(keyOf));
  const fragment = document.createDocumentFragment();

  grid.forEach((line, row) => {
    line.forEach((value, col) => {
      if (value === 0) {
        fragment.append(createCell());
        return;
      }
      const key = keyOf({ row, col });
      fragment.append(
        createTile(value, {
          isNew: key === newKey,
          isMerged: mergedKeys.has(key),
        })
      );
    });
  });

  boardEl.replaceChildren(fragment);
}

export function renderScore(score, best) {
  scoreEl.textContent = score;
  bestEl.textContent = best;
}

export function render(grid, score, best, effects) {
  renderBoard(grid, effects);
  renderScore(score, best);
}

export function showOverlay(text) {
  overlayTextEl.textContent = text;
  overlayEl.hidden = false;
}

export function hideOverlay() {
  overlayEl.hidden = true;
}