// sketch.js -

// Author: Lo Weislak
// Date: 2/17/25

//Random words text file: https://github.com/Shreda/pentestTools/blob/master/random-words.txt

// Globals
let canvasContainer;
var centerHorz, centerVert;

let words = [];

function resizeScreen() { 
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function preload() {
  words = loadStrings('./random-words.txt'); //Load file into array
  font = loadFont('Consolas.ttf');
}

function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  background(255);
}

function draw() {
  textFont(font);
  textAlign(CENTER,CENTER);
  textSize(50);
  //rotateX(map(mouseX,0,width,0,TWO_PI));
  //rotateY(map(mouseY,0,height,0,TWO_PI));
  //rotateZ(map(frameCount,0,600,0,TWO_PI))
  push();
  for(let i=0; i<100; i++) {
    fill(map(i,0,100,0,255),80,215);
    translate(0,0,0.5); //Give text depth
    text("Hello",0,0);
  }
  pop();
}