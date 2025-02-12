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
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.angle = 0;
		this.dx = random(-3, 3);
		this.dy = 0;
		this.offset = 50; //Determines how far off screen cube must be to remove
	}

	draw() {
		this.rotate();
		this.setSpeed();
	}

	rotate() {
		translate(this.x, this.y, 0);
		rotateX(this.angle);
		rotateY(this.angle);
		box();
		this.angle += 0.01;
	}

	setSpeed() {
		this.x += this.dx;
		this.dy += 0.1;
		this.y += this.dy;
	}

	bounce() {
		if (this.y > height/2) {
			this.dy *= -1;
			this.y = height/2;
		}
	}

	//TODO: Fix. Add offset
	checkBounds() {
		if(this.x > width/2  + this.offset|| this.x < -width/2 - this.offset) {
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
  cubes.push(new Cube(0, 0));
}

function draw() {
	for(let cube of cubes) {
		cube.draw();
		cube.bounce();
		cube.checkBounds();
	}
}

function mouseClicked() {
	if((mouseX > 0 && mouseX < width) && (mouseY > 0 && mouseY < height)) {
		//TODO: Add cube
	}
}