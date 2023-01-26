const ctx = document.getElementById("canvas").getContext("2d");
let barva = document.querySelector(".color");
let tuzka = document.querySelector(".tuzka");
let stetec = document.querySelector(".stetec");
let vymazat = document.querySelector(".vymazat");

function draw(){
    ctx.fillStyle = barva.value;
    console.log(barva);
}

draw();