let canvas = document.body.querySelector('canvas');
let xhr = new XMLHttpRequest();
ctx = canvas.getContext("2d");
wind = {
    w:800,
    h:480
}
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();