export const TILES = {
  2:    { src: new URL("../../assets/tiles/2.webp", import.meta.url).href },
  4:    { src: new URL("../../assets/tiles/4.webp", import.meta.url).href },
  8:    { src: new URL("../../assets/tiles/8.webp", import.meta.url).href },
  16:   { src: new URL("../../assets/tiles/16.webp", import.meta.url).href },
  32:   { src: new URL("../../assets/tiles/32.webp", import.meta.url).href },
  64:   { src: new URL("../../assets/tiles/64.webp", import.meta.url).href },
  128:  { src: new URL("../../assets/tiles/128.webp", import.meta.url).href },
  256:  { src: new URL("../../assets/tiles/256.webp", import.meta.url).href },
  512:  { src: new URL("../../assets/tiles/512.webp", import.meta.url).href },
  1024: { src: new URL("../../assets/tiles/1024.webp", import.meta.url).href },
  2048: { src: new URL("../../assets/tiles/2048.webp", import.meta.url).href },
};

export function createCell() {
  const cell = document.createElement("div");
  cell.className = "cell";
  return cell;
}

export function createTile(value, { isNew = false, isMerged = false } = {}) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.textContent = value;
  tile.dataset.value = value;
  tile.dataset.digits = String(value).length;

  const art = TILES[value] ?? TILES[2048];
  tile.style.setProperty("--tile-img", `url("${art.src}")`);

  if (isNew) tile.classList.add("tile--new");
  if (isMerged) tile.classList.add("tile--merged");

  return tile;
}