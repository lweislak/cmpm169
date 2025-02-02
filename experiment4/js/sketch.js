// sketch.js - purpose and description here
// Author: Lo Weislak
// Date: 2/3/25

// Globals
let canvasContainer;
var centerHorz, centerVert;

class Ball {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(2, 4); //Moves particles at different speeds
    this.acceleration = createVector(0,0);
    this.radius = 8;
    this.color = "black";
    //this.maxSpeed = 10;
  }

  show() {
    strokeWeight(8);
    stroke("black");
    point(this.position.x, this.position.y);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    //this.velocity.limit(this.maxSpeed);
    this.acceleration.set(0,0); //Reset acceleration
    this.checkCollision();
  }
    
  //Check for wall collision
  checkCollision() {
    if (this.position.x + this.radius > canvasContainer.width() || this.position.x - this.radius < 0) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.position.y + this.radius > canvasContainer.height() || this.position.y - this.radius < 0) {
      this.velocity.y = this.velocity.y * -1;
    }
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

  balls = [];
  for (var i = 0; i < 10; i++) {
    balls.push(new Ball());
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);

  for (ball of balls) {
    ball.update();
    ball.show();
  }
}