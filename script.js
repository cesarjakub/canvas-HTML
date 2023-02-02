const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let barva = document.querySelector(".color");
let tuzka = document.querySelector(".tenkaTuzka");
let stetec = document.querySelector(".tlustaTuzka");
let vymazat = document.querySelector(".vymazat");
let krivka = document.querySelector(".krivka");

let x = 0;
let y = 0;
let nastroj = tuzka;

document.addEventListener("mousedown", zacitKreslit);
document.addEventListener("mouseup", prestatKreslit);

function getMouseCords(event){
  x = event.clientX - canvas.offsetLeft;
  y = event.clientY - canvas.offsetTop;
}

function zacitKreslit(event) {
  document.addEventListener("mousemove", draw);
  getMouseCords(event);
}
function prestatKreslit() {
  document.removeEventListener("mousemove", draw);
}
function draw(event) {
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = changeBrush();
  ctx.strokeStyle = barva.value;
  ctx.moveTo(x, y);
  getMouseCords(event);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function bezCurv(){
  let sx = document.querySelector(".startx").value;
  let sy = document.querySelector(".starty").value;
  let ex = document.querySelector(".endx").value;
  let ey = document.querySelector(".endy").value;
  let cp1x = document.querySelector(".cp1x").value;
  let cp1y = document.querySelector(".cp1y").value;
  let cp2x = document.querySelector(".cp2x").value;
  let cp2y = document.querySelector(".cp2y").value;

  ctx.fillStyle = barva.value;
  ctx.lineCap = "round";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(sx,sy);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
  ctx.stroke();

}
krivka.addEventListener("click", bezCurv);

function changeBrush() {
  switch (nastroj) {
    case tuzka:
      return 5;
    case stetec:
      return 25;
  }
}
tuzka.addEventListener("click", () => {
  nastroj = tuzka;
});
stetec.addEventListener("click", () => {
  nastroj = stetec;
});

function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
vymazat.addEventListener("click", reset);

function save() {
  localStorage.setItem(canvas, canvas.toDataURL());
}

function load() { 
  let src = localStorage.getItem(canvas);
  let img = new Image();
  img.src = src;
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
}

let saveImg = document.querySelector(".save").addEventListener("click", save);
let loadImg = document.querySelector(".load").addEventListener("click", load);