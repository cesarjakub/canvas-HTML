const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let barva = document.querySelector(".color");
let tuzka = document.querySelector(".tenkaTuzka");
let stetec = document.querySelector(".tlustaTuzka");
let vymazat = document.querySelector(".vymazat");
let obdel = document.querySelector(".obdelnik");
let x = 0;
let y = 0;
let nastroj = tuzka;
let ob = false;

document.addEventListener("mousedown", zacitKreslit);
document.addEventListener("mouseup", prestatKreslit);

function zacitKreslit(event) {
  if(!ob){
    document.addEventListener("mousemove", draw);
    x = event.clientX - canvas.offsetLeft;
    y = event.clientY - canvas.offsetTop;
  }else{
    document.addEventListener("mousemove", obdelnik);
    x = event.clientX - canvas.offsetLeft;
    y = event.clientY - canvas.offsetTop;
  }
  
}
function prestatKreslit() {
  document.removeEventListener("mousemove", draw);
  document.removeEventListener("mousemove", obdelnik);
}
function draw(event) {
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = changeBrush();
  ctx.strokeStyle = barva.value;
  ctx.moveTo(x, y);
  x = event.clientX - canvas.offsetLeft;
  y = event.clientY - canvas.offsetTop;
  ctx.lineTo(x, y);
  ctx.stroke();
}

function obdelnik(event){
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = 5;
  ctx.strokeStyle = barva.value;
  ctx.rect(x,y,100,50);
  ctx.stroke();
}
obdel.addEventListener("click", () => {
  ob = true;
});

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
  ob = false;
});
stetec.addEventListener("click", () => {
  nastroj = stetec;
  ob = false;
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