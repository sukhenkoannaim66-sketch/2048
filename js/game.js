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
 
