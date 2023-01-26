const ctx = document.getElementById("canvas").getContext("2d");
let barva = document.querySelector(".color");
let tuzka = document.querySelector(".tenkaTuzka");
let stetec = document.querySelector(".tlustaTuzka");
let vymazat = document.querySelector(".vymazat");
let x = 0;
let y = 0;
let nastroj = tuzka;

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);


function getMouseCord(event) {
  x = event.clientX - canvas.offsetLeft;
  y = event.clientY - canvas.offsetTop;
}
function start(event) {
  document.addEventListener("mousemove", draw);
  getMouseCord(event);
}
function stop() {
  document.removeEventListener("mousemove", draw);
}
function draw(event) {
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = changeBrush();
  ctx.strokeStyle = barva.value;
  ctx.moveTo(x, y);
  getMouseCord(event);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function changeBrush(){
    switch(nastroj){
        case tuzka:
            return 5;
        case stetec:
            return 25;
    }
}
tuzka.addEventListener("click", () =>{
    nastroj = tuzka;
});
stetec.addEventListener("click", () =>{
    nastroj = stetec;
});

function reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
vymazat.addEventListener("click", reset);