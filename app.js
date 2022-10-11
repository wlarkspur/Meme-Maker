const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("eraser-btn");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const LineWidth = document.getElementById("Line-width");
const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVSD_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVSD_HEIGHT;
ctx.lineWidth = LineWidth.value;
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }

  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVSD_HEIGHT);
    beginPath();
  }
}

function destroyButton() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVSD_HEIGHT);
  beginPath();
}

function eraseButton() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
  beginPath();
}

canvas.addEventListener("mousemove", onMove);
document.addEventListener("mousedown", startPainting);
document.addEventListener("mouseup", cancelPainting);
document.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

LineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOption.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", destroyButton);
eraseBtn.addEventListener("click", eraseButton);
