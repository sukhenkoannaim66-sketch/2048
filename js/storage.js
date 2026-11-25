const BEST_KEY = "2048:best";
const GAME_KEY = "2048:game";

function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null; 
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {} //якщо сховище переповнене гра працює далі, просто без збереження
}

export function loadBest() {
  const value = read(BEST_KEY);
  return typeof value === "number" ? value : 0;
}

export function saveBest(value) {
  write(BEST_KEY, value);
}

export function loadGame() {
  const data = read(GAME_KEY);
  if (data && Array.isArray(data.grid) && typeof data.score === "number") {
    return data;
  }
  return null;
}

export function saveGame(data) {
  write(GAME_KEY, data);
}

export function clearGame() {
  try {
    localStorage.removeItem(GAME_KEY);
  } catch {}
}
