const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas settings
ctx.lineCap = "round";
ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;

// fractal settings
let single = false;
let left = true;
let basic = false;
let odd = true;
const maxLevel = 4;
const branches = 2;

let spread = 0.7;
let sides = 9;
let scale = 0.5;
let lineWidth = 12;
let size =
  canvas.height < canvas.width
    ? Math.floor(canvas.height * 0.24)
    : Math.floor(canvas.width * 0.24);
let color = "hsl(152, 100%, 50%)";

// controls
const randomButton = document.getElementById("random-button");
const sliderSpread = document.getElementById("spread");
const labelSpread = document.querySelector('[for="spread"]');
const sliderSides = document.getElementById("sides");
const labelSides = document.querySelector('[for="sides"]');
const sliderScale = document.getElementById("scale");
const labelScale = document.querySelector('[for="scale"]');
const sliderLineWidth = document.getElementById("line-width");
const labelLineWidth = document.querySelector('[for="line-width"]');
const sliderSize = document.getElementById("size");
const labelSize = document.querySelector('[for="size"]');
const radioSingle = document.getElementById("single");
const radioDoubled = document.getElementById("doubled");
const radioLeft = document.getElementById("left");
const radioRight = document.getElementById("right");
const radioBasic = document.getElementById("basic");
const radioDotted = document.getElementById("dotted");
const radioOdd = document.getElementById("odd");
const radioEven = document.getElementById("even");
const resetButton = document.getElementById("reset-button");

radioSingle.checked = false;
radioDoubled.checked = true;
radioLeft.checked = true;
radioRight.checked = false;
radioBasic.checked = true;
radioDotted.checked = false;
radioOdd.checked = false;
radioEven.checked = true;

// functions
function drawBranch(level) {
  if (level > maxLevel) return;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();

  if (single && left) {
    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, spread);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(-spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
  } else if (single && !left) {
    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, spread);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
  } else if (!single) {
    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, spread);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.save();
      ctx.rotate(-spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
  }

  if (!basic && odd && left) {
    ctx.beginPath();
    ctx.arc(0, -size, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
  } else if (!basic && odd && !left) {
    ctx.beginPath();
    ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
  } else if (!basic && !odd) {
    ctx.beginPath();
    ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, -size, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFractal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  for (let i = 0; i < sides; i++) {
    ctx.rotate((Math.PI * 2) / sides);
    drawBranch(0);
  }
  ctx.restore();
}

function randomizeFractal() {
  spread = Math.floor(Math.random() * 16) * 0.1;
  sides = Math.floor(Math.random() * 14 + 2);
  scale = Math.floor(Math.random() * 4 + 4) * 0.1;
  color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  lineWidth = Math.floor(Math.random() * 32 + 4);
  size =
    canvas.height < canvas.width
      ? Math.floor(canvas.height * 0.24) + Math.floor(Math.random() * 56) - 24
      : Math.floor(canvas.width * 0.24) + Math.floor(Math.random() * 56) - 24;
  left = Math.random() < 0.5;
  basic = Math.random() < 0.5;
  single = Math.random() < 0.5;
  odd = Math.random() < 0.5;
}

function updateControls() {
  sliderSpread.value = spread;
  labelSpread.innerText = Number(spread).toFixed(2) + " rads";
  sliderSides.value = sides;
  labelSides.innerText = Number(sides);
  sliderScale.value = scale;
  labelScale.innerText = Number(scale).toFixed(2);
  sliderLineWidth.value = lineWidth;
  labelLineWidth.innerText = Number(lineWidth) + " px";
  sliderSize.value = size;
  labelSize.innerText = Number(size) + " px";
  radioSingle.checked = single;
  radioDoubled.checked = !single;
  radioLeft.checked = left;
  radioRight.checked = !left;
  radioBasic.checked = basic;
  radioDotted.checked = !basic;
  radioOdd.checked = odd;
  radioEven.checked = !odd;
}

drawFractal();
updateControls();

// eventListeners
randomButton.addEventListener("click", function () {
  randomizeFractal();
  updateControls();
  drawFractal();
});

resetButton.addEventListener("click", function () {
  sides = 9;
  scale = 0.5;
  spread = 0.7;
  color = "hsl(152, 100%, 50%)";
  lineWidth = 12;
  size =
    canvas.height < canvas.width
      ? Math.floor(canvas.height * 0.24)
      : Math.floor(canvas.width * 0.24);
  single = false;
  radioSingle.checked = single;
  radioDoubled.checked = !single;
  left = true;
  radioLeft.checked = left;
  radioRight.checked = !left;
  basic = false;
  radioBasic.checked = basic;
  radioDotted.checked = !basic;
  odd = true;
  radioOdd.checked = odd;
  radioEven.checked = !odd;
  updateControls();
  drawFractal();
});

sliderSpread.addEventListener("change", function (event) {
  spread = event.target.value;
  updateControls();
  drawFractal();
});

sliderSides.addEventListener("change", function (event) {
  sides = event.target.value;
  updateControls();
  drawFractal();
});

sliderScale.addEventListener("change", function (event) {
  scale = event.target.value;
  updateControls();
  drawFractal();
});

sliderLineWidth.addEventListener("change", function (event) {
  lineWidth = event.target.value;
  updateControls();
  drawFractal();
});

sliderSize.addEventListener("change", function (event) {
  size = event.target.value;
  updateControls();
  drawFractal();
});

radioSingle.addEventListener("click", function () {
  single = true;
  radioSingle.checked = single;
  radioDoubled.checked = !single;
  drawFractal();
});

radioDoubled.addEventListener("click", function () {
  single = false;
  radioSingle.checked = single;
  radioDoubled.checked = !single;
  drawFractal();
});

radioLeft.addEventListener("click", function () {
  left = true;
  radioLeft.checked = left;
  radioRight.checked = !left;
  drawFractal();
});

radioRight.addEventListener("click", function () {
  left = false;
  radioLeft.checked = left;
  radioRight.checked = !left;
  drawFractal();
});

radioBasic.addEventListener("click", function () {
  basic = true;
  radioBasic.checked = basic;
  radioDotted.checked = !basic;
  drawFractal();
});

radioDotted.addEventListener("click", function () {
  basic = false;
  radioBasic.checked = basic;
  radioDotted.checked = !basic;
  drawFractal();
});

radioOdd.addEventListener("click", function () {
  odd = true;
  radioOdd.checked = odd;
  radioEven.checked = !odd;
  drawFractal();
});

radioEven.addEventListener("click", function () {
  odd = false;
  radioOdd.checked = odd;
  radioEven.checked = !odd;
  drawFractal();
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  size =
    canvas.height < canvas.width
      ? Math.floor(canvas.height * 0.24)
      : Math.floor(canvas.width * 0.24);
  updateControls();
  drawFractal();
});
