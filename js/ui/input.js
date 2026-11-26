export function bindControls({ onNewGame }) {
  const handle = (event) => {
    event.currentTarget.blur();
    onNewGame();
  };

  document.getElementById("new-game").addEventListener("click", handle);
  document.getElementById("overlay-btn").addEventListener("click", handle);
}