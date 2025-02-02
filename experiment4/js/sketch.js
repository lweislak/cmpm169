// sketch.js - purpose and description here
// Author: Lo Weislak
// Date: 2/3/25

// Globals
let canvasContainer;
var centerHorz, centerVert;

class Chime {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.height = 200;
    this.width = 80;
    this.sound = loadSound('./sounds/chimes-7.wav');
  }

  display() {
    strokeWeight(1);
    let radius = this.width/2;

    //Draw chime
    beginShape();
    vertex(this.position.x - radius, this.position.y);
    vertex(this.position.x - radius, this.position.y + this.height);
    vertex(this.position.x + radius, this.position.y + this.height - 30);
    vertex(this.position.x + radius, this.position.y);
    endShape();
    ellipse(this.position.x, this.position.y, this.width, 10); //Draw top of chime
    line(this.position.x, this.position.y, this.position.x, 0); //Draw string
  }

  //Check if chime has been pressed
  checkClick() {

  }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  testChime = new Chime(600, 200); //TEST
  testChime2 = new Chime(900, 350);
}

function draw() {
  background(220);

  testChime.display(); //TEST
  testChime2.display();
}

function mousePressed() {
  testChime.sound.play(); //TEST
}