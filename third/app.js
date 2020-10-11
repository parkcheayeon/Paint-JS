const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const colors = document.getElementById("jsColors");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";

let isPainting = false;
let isFilling = false;

canvas.width = INITIAL_SIZE;
canvas.height = INITIAL_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
ctx.storkeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

function startPainting() {
    isPainting = true;
}

function stopPainting() {
    isPainting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (isPainting && !isFilling) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleColorChange(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModeChange() {
    if (!isFilling) {
        isFilling = true;
        mode.textContent = "Paint";
    } else {
        isFilling = false;
        mode.textContent = "Fill";
    }
}

function handleCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0, 0, INITIAL_SIZE, INITIAL_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (colors) {
    colors.addEventListener("click", handleColorChange);
}

if (mode) {
    mode.addEventListener("click", handleModeChange);
}

if(save) {
    save.addEventListener("click", handleSaveClick);
}