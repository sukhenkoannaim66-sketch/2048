export const TILES = {
  2:    { src: "assets/tiles/Знімок екрана 2026-11-25 154456.png",    name: "Зелений ківі-зародиш" },
  4:    { src: "assets/tiles/Знімок екрана 2026-11-25 154938.png",    name: "Червоний ківі-зародиш" },
  8:    { src: "assets/tiles/Знімок екрана 2026-11-25 155403.png",    name: "Зелений ківі" },
  16:   { src: "assets/tiles/Знімок екрана 2026-11-25 155954.png",    name: "Червоний ківі" },
  32:   { src: "assets/tiles/Знімок екрана 2026-11-25 160353.png",    name: "Просто ківі" },
  64:   { src: "assets/tiles/Знімок екрана 2026-11-25 161635.png",    name: "Ківі малий" },
  128:  { src: "assets/tiles/Знімок екрана 2026-11-25 162135.png",    name: "Ківі окаритський" },
  256:  { src: "assets/tiles/Знімок екрана 2026-11-25 161915.png",    name: "Ківі бурий" },
  512:  { src: "assets/tiles/Знімок екрана 2026-11-25 161946.png",    name: "Ківі сірий" },
  1024: { src: "assets/tiles/Знімок екрана 2026-11-25 162026.png",    name: "Ківі лейкіміст" },
  2048: { src: "assets/tiles/Знімок екрана 2026-11-25 162233.png",    name: "Піпі-Ківі!!!" },
};

export function createCell() {
  const cell = document.createElement("div");
  cell.className = "cell";
  return cell;
}

export function createTile(value, { isNew = false, isMerged = false } = {}) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.dataset.value = value;
  tile.dataset.digits = String(value).length;

  const art = TILES[value] ?? TILES[2048];
  tile.style.setProperty("--tile-img", `url("${art.src}")`);

  if (isNew) tile.classList.add("tile--new");
  if (isMerged) tile.classList.add("tile--merged");

  return tile;
}