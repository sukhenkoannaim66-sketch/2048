const KEY_TO_DIRECTION = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

const SWIPE_THRESHOLD = 30; // мінімальна довжина свайпу, px

export function onMove(callback) {
  bindKeyboard(callback);
  bindSwipe(callback);
}

function bindKeyboard(callback) {
  document.addEventListener("keydown", (event) => {
    const direction = KEY_TO_DIRECTION[event.key];
    if (!direction) return;
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;

    event.preventDefault();
    callback(direction);
  });
}

function bindSwipe(callback) {
  const boardEl = document.getElementById("board");
  let startX = 0;
  let startY = 0;
  let tracking = false;

  boardEl.addEventListener("pointerdown", (event) => {
    boardEl.setPointerCapture(event.pointerId);
    startX = event.clientX;
    startY = event.clientY;
    tracking = true;
  });

  boardEl.addEventListener("pointerup", (event) => {
    if (!tracking) return;
    tracking = false;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_THRESHOLD) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      callback(dx > 0 ? "right" : "left");
    } else {
      callback(dy > 0 ? "down" : "up");
    }
  });

  boardEl.addEventListener("pointercancel", () => {
    tracking = false;
  });
}