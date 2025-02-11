// sketch.js - purpose and description here
// Author: Lo Weislak
// Date: 2/10/25

//Idea: Have a deck of cards that can be moved.
//Leaves a trail behind like the ending of Solitare

// Globals
let canvasContainer;
var centerHorz, centerVert;

let cubes = [];

class Cube {
	constructor() {
		console.log(`width:${width}, height:${height}`);
		this.angle = 0;
		this.x = width/4;
		this.y = -height/8;
		this.dx = random(-3, 3);;
		this.dy = 0;
	}

	draw() {
		translate(this.x, this.y, 0);
		rotateX(this.angle);
		rotateY(this.angle);
		box();
		this.angle += 0.01;

		this.x += this.dx;
		this.dy += 0.1;
		this.y += this.dy;
	
		// Bounce
		if (this.y > height) {
			this.dy *= -0.8;
			this.y = height;
		}

		//TODO: Fix
		if(this.x > canvasContainer.width() || this.x < -canvasContainer.width()) {
			console.log("REMOVE CUBE");
			cubes.pop(this);
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
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  background(255);
  cubes.push(new Cube());
}

function draw() {
	for(let cube of cubes) {
		cube.draw();
	}
}
