const ctx = document.getElementById("canvas").getContext("2d");
let barva = document.querySelector(".color");
let tuzka = document.querySelector(".tenkaTuzka");
let stetec = document.querySelector(".tlustaTuzka");
let vymazat = document.querySelector(".vymazat");
let x = 0;
let y = 0;

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);


function souradnice(event) {
  x = event.clientX - canvas.offsetLeft;
  y = event.clientY - canvas.offsetTop;
}
function start(event) {
  document.addEventListener("mousemove", draw);
  souradnice(event);
}
function stop() {
  document.removeEventListener("mousemove", draw);
}
function draw(event) {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = barva.value;
  ctx.moveTo(x, y);
  souradnice(event);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function changeBrush(i){
    switch(i){
        case 1:
            ctx.lineWidth = 15;
            break;
        case 2:
            ctx.lineWidth = 3;
            break;
    }
}
tuzka.addEventListener("click", changeBrush(2));
stetec.addEventListener("click", changeBrush(1));

function reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
vymazat.addEventListener("click", reset);