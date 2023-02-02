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
  document.removeEventListener("mousemove", bezierCurve);
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

function bezierCurve(event){
  let start = { x: 345,   y: 50};
  let cp1 =   { x: 230,   y: 30  };
  let cp2 =   { x: 150,   y: 80  };
  let end =   { x: 250,   y: 100 };


  


  ctx.fillStyle = barva.value;
  ctx.lineCap = "round";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(start.x,start.y);
  getMouseCords(event)
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
  ctx.stroke();

  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI);  
  ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI);      
  ctx.fill();
  
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI);  
  ctx.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI);  
  ctx.fill();

}
krivka.addEventListener("click", bezierCurve);









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