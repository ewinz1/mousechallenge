// Canvas + 2D
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 800;

// global variables

// shapes

let dirc = {
    x: 500,
    y: 400,
    r: 70,
    color: "orange",
    xSpeed: 0,
    ySpeed: 0,
}


let dect = {
    x: 200,
    y: 300,
    w: 100,
    h: 200,
    color: "green",
    xSpeed: 0,
    ySpeed: 0,
}

// mouse variables
let mouseX, mouseY;

// event listener
document.addEventListener("mousemove", mousemovehandler);

function mousemovehandler(event) {
    // get rectangle info about canvas location
    let cnvRect = cnv.getBoundingClientRect();

    // Calc mouse coordinates using mouse event and canvas location info
    mouseX = event.clientX - cnvRect.left;
    mouseY = event.clientY - cnvRect.top;
}

// draw function
requestAnimationFrame(draw);

function draw() {

    // x and y speeds
    dect.x += dect.xSpeed;
    dect.y += dect.ySpeed;
    dirc.x += dirc.xSpeed;
    dirc.y += dirc.ySpeed;

    let n = Math.random();
   
    // mouse detection 

    // rectangle
    if (dect.x <= mouseX && mouseX <= dect.x + dect.w &&
        dect.y <= mouseY && mouseY <= dect.y + dect.h) {

        // collision detected!
        dect.color = "red";

        // random movement
        if (n < 0.25) {
            dect.xSpeed = 0;
            dect.ySpeed = 2;

        } else if (n < 0.5) {
            dect.xSpeed = 2;
            dect.ySpeed = 0;

        } else if (n < 0.75) {
            dect.xSpeed = 0;
            dect.ySpeed = -2;

        } else {
            dect.xSpeed = -2;
            dect.ySpeed = 0;
        }

    } else {
        dect.color = "green";
        dect.xSpeed = 0;
        dect.ySpeed = 0;
    }

    // circle
 
    let d = Math.sqrt((mouseX - dirc.x)**2 + (mouseY - dirc.y)**2);

    if (d < dirc.r) {
        dirc.color = "purple";

        // random movement
        if (n < 0.25) {
            dirc.xSpeed = 2;
            dirc.ySpeed = 0;

        } else if (n < 0.5) {
            dirc.xSpeed = 0;
            dirc.ySpeed = 2;

        } else if (n < 0.75) {
            dirc.xSpeed = -2;
            dirc.ySpeed = 0;

        } else {
            dirc.xSpeed = 0;
            dirc.ySpeed = -2;
        }

    } else {
        dirc.color = "orange";
        dirc.xSpeed = 0;
        dirc.ySpeed = 0;
    }

    // background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // Circle
    ctx.fillStyle = dirc.color;
    ctx.beginPath();
    ctx.arc(dirc.x, dirc.y, dirc.r, 0, 2*Math.PI);
    ctx.fill();

    // Rectangle 
    ctx.fillStyle = dect.color;
    ctx.fillRect(dect.x, dect.y, dect.w, dect.h);

    requestAnimationFrame(draw);
}