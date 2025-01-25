// sketch.js - purpose and description here
// Author: Your Name
// Date:

//Perlin noise code tutorial found at: https://www.youtube.com/watch?v=BjoM9oKOAKY


// Globals
let canvasContainer;
var centerHorz, centerVert;

var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;

class Particle {
    constructor() {
      this.pos = createVector(random(width), random(height));
      this.vel = createVector(0,0);
      this.acc = createVector(0,0);
    }

    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    follow(vectors) {
      var x = floor(this.pos.x /scl);
      var y = floor(this.pos.y /scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
    }

    edges() {
      if(this.pos.x > width) this.pos.x = 0;
      if(this.pos.x < 0) this.pos.x = width;
      if(this.pos.y > height) this.pos.y = 0;
      if(this.pos.y < 0) this.pos.y = height;
    }

    applyForce(force) {
      this.acc.add(force);
    }

    show() {
      stroke(0);
      point(this.pos.x, this.pos.y);
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  cols = floor(canvasContainer.width() / scl);
  rows = floor(canvasContainer.height() / scl);
  fr = createP('');
  flowfield = new Array(cols * rows);
  for (var i = 0; i < canvasContainer.width()/2; i++) {
    particles[i] = new Particle();
  }
  background(51);  
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;
    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}