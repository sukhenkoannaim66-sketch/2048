import { describe, it, expect } from "vitest";
import { Board, slideRowLeft } from "../js/game.js";

const boardOf = (grid, score = 0) => Board.fromJSON({ grid, score });

describe("slideRowLeft", () => {
  it("зливає пари, кожну плитку лише раз", () => {
    expect(slideRowLeft([2, 2, 2, 2]).row).toEqual([4, 4, 0, 0]);
  });

  it("не зливає вже злиту плитку", () => {
    expect(slideRowLeft([2, 2, 4, 0]).row).toEqual([4, 4, 0, 0]);
  });

  it("зливає плитки через порожні клітинки", () => {
    const result = slideRowLeft([4, 0, 0, 4]);
    expect(result.row).toEqual([8, 0, 0, 0]);
    expect(result.gained).toBe(8);
  });
});

describe("Board.move", () => {
  it("рухає вправо і рахує очки", () => {
    const board = boardOf([
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const result = board.move("right");
    expect(board.grid[0]).toEqual([0, 0, 0, 4]);
    expect(result.moved).toBe(true);
    expect(board.score).toBe(4);
  });

  it("повертає moved: false, якщо нічого не зрушило", () => {
    const board = boardOf([
      [2, 4, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(board.move("left").moved).toBe(false);
  });
});

describe("Board: кінець гри", () => {
  it("canMove = false, коли поле повне і пар немає", () => {
    const board = boardOf([
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ]);
    expect(board.canMove()).toBe(false);
  });

  it("hasWon = true, коли є 2048", () => {
    const board = boardOf([
      [1024, 1024, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    board.move("left");
    expect(board.hasWon()).toBe(true);
  });
});

describe("Board.addRandomTile", () => {
  it("з random = 0 ставить двійку в першу порожню клітинку", () => {
    const board = new Board(4, () => 0);
    expect(board.addRandomTile()).toEqual({ row: 0, col: 0 });
    expect(board.grid[0][0]).toBe(2);
  });
});
