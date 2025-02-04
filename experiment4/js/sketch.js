// sketch.js - purpose and description here
// Author: Lo Weislak
// Date: 2/3/25

// Globals
let canvasContainer;
var centerHorz, centerVert;
let chimes = [];

class Chime {
  constructor(x, sound) {
    this.position = createVector(x, random(50, 400));
    this.height = 200;
    this.width = 80;
    this.sound = loadSound(sound);
  }

  display() {
    strokeWeight(1);
    stroke("black");
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

  //Check if chime has been clicked
  wasClicked() {
    if(mouseX < this.position.x + this.width/2 && mouseX > this.position.x - this.width/2) {
      if(mouseY < this.position.y + this.height && mouseY > this.position.y) {
        console.log("CLICKED");
        return true;
      }
    }
    return false;
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

  setupChimes();
}

function setupChimes() {
  var spacing = 15;
  var padding = width / 6; //6 is num of chimes
  var scale = padding - spacing - (spacing / 6);

  //Code for spacing found at: https://editor.p5js.org/slow_izzm/sketches/m7v7d87kL
  for(let i = 1; i <= 6; i++) {
    chimes.push(new Chime((scale*0.5)+spacing+(i-1)*(scale+spacing), `./sounds/chimes-${i}.wav`));
  }
}

function draw() {
  background(220);

  for(let chime of chimes) {
    chime.display();
  }
}

function mousePressed() {
  for(let chime of chimes) {
    if(chime.wasClicked()) {
      chime.sound.play();
    }
  }
}