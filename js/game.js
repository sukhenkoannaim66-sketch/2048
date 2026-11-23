// @ts-check

/** @typedef {"up" | "down" | "left" | "right"} Direction */
/** @typedef {number[][]} Grid */
/** @typedef {{ row: number, col: number }} Cell */
/** @typedef {{ moved: boolean, gained: number, merged: Cell[] }} MoveResult */

/**
 * @param {number[]} row
 * @returns {{ row: number[], gained: number, mergedAt: number[] }}
 */
export function slideRowLeft(row) {
  const tiles = row.filter((v) => v !== 0);
  const result = [];
  const mergedAt = [];
  let gained = 0;

  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === tiles[i + 1]) {
      const value = tiles[i] * 2;
      mergedAt.push(result.length);
      result.push(value);
      gained += value;
      i++; // пропускаємо злиту плитку: [2,2,2,2] → [4,4], а не [8]
    } else {
      result.push(tiles[i]);
    }
  }

  while (result.length < row.length) result.push(0);
  return { row: result, gained, mergedAt };
}

export class Board {
  /** @type {number} */ #size;
  /** @type {Grid} */ #grid;
  /** @type {number} */ #score = 0;
  /** @type {() => number} */ #random;

  /**
   * @param {number} [size]
   * @param {() => number} [random] у тестах передаємо передбачувану функцію
   */
  constructor(size = 4, random = Math.random) {
    this.#size = size;
    this.#random = random;
    this.#grid = Array.from({ length: size }, () => Array(size).fill(0));
  }

  get size() {
    return this.#size;
  }

  get grid() {
    return this.#grid.map((row) => [...row]);
  }

  get score() {
    return this.#score;
  }

  /** @returns {Cell | null} */
  addRandomTile() {
    /** @type {Cell[]} */
    const empty = [];
    this.#grid.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v === 0) empty.push({ row: r, col: c });
      })
    );
    if (empty.length === 0) return null;

    const cell = empty[Math.floor(this.#random() * empty.length)];
    this.#grid[cell.row][cell.col] = this.#random() < 0.9 ? 2 : 4;
    return cell;
  }

  /**
   * @param {Direction} direction
   * @returns {MoveResult}
   */
  move(direction) {
    const n = this.#size;
    let moved = false;
    let gained = 0;
    /** @type {Cell[]} */
    const merged = [];

    // Кожен напрямок зводимо до «зсуву вліво»: pos(line, i) — клітинка на i-му місці лінії
    /** @type {(line: number, i: number) => Cell} */
    const pos = {
      left: (line, i) => ({ row: line, col: i }),
      right: (line, i) => ({ row: line, col: n - 1 - i }),
      up: (line, i) => ({ row: i, col: line }),
      down: (line, i) => ({ row: n - 1 - i, col: line }),
    }[direction];

    for (let line = 0; line < n; line++) {
      const cells = Array.from({ length: n }, (_, i) => pos(line, i));
      const before = cells.map(({ row, col }) => this.#grid[row][col]);
      const { row: after, gained: g, mergedAt } = slideRowLeft(before);

      cells.forEach(({ row, col }, i) => {
        if (this.#grid[row][col] !== after[i]) moved = true;
        this.#grid[row][col] = after[i];
      });
      gained += g;
      mergedAt.forEach((i) => merged.push(cells[i]));
    }

    this.#score += gained;
    return { moved, gained, merged };
  }

  canMove() {
    const g = this.#grid;
    const n = this.#size;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (g[r][c] === 0) return true;
        if (c + 1 < n && g[r][c] === g[r][c + 1]) return true;
        if (r + 1 < n && g[r][c] === g[r + 1][c]) return true;
      }
    }
    return false;
  }

  hasWon() {
    return this.#grid.some((row) => row.some((v) => v >= 2048));
  }

  /** @returns {{ grid: Grid, score: number }} */
  toJSON() {
    return { grid: this.grid, score: this.#score };
  }

  /**
   * @param {{ grid: Grid, score: number }} data
   * @param {() => number} [random]
   */
  static fromJSON(data, random = Math.random) {
    const board = new Board(data.grid.length, random);
    board.#grid = data.grid.map((row) => [...row]);
    board.#score = data.score ?? 0;
    return board;
  }
}

