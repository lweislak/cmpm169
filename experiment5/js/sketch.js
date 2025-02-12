// sketch.js - purpose and description here
// Author: Lo Weislak
// Date: 2/10/25

//Idea: Have length of time mouse is held determine size/color of cube

// Globals
let canvasContainer;
var centerHorz, centerVert;

let cubes = [];

let down;
let mouseClickTime = 0;

class Cube {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.angle = 0;
		this.dx = Math.random() * (5 + 4) - 5; //Set random speed in x direction
		this.dy = 0;
		this.offset = size + 20; //Determines how far off screen cube must be to remove
	}

	draw() {
		push();
		this.rotate();
		this.setSpeed();
		pop();
	}

	rotate() {
		translate(this.x, this.y, 0);
		rotateX(this.angle);
		rotateY(this.angle);
		box(this.size);
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

	//Remove cube when it goes out of bounds
	checkBounds() {
		if(this.x > width/2  + this.offset || this.x < -width/2 - this.offset) {
			cubes.splice(cubes.indexOf(this), 1);
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
}

function draw() {
	for(let cube of cubes) {
		cube.draw();
		cube.bounce();
		cube.checkBounds();
	}
}

function mousePressed() {
	if(canvasPressed()) {
		down = Date.now(); //Set start of mouse click timer
	}
}

function mouseReleased() {
	if(canvasPressed()) {
		mouseClickTime = Date.now() - down; //Determine how long mouse was pressed
		cubes.push(new Cube(mouseX - width/2, mouseY - height/2, mouseClickTime/10));
	}
}

//Helper function to determine if mouse was pressed on the canvas
function canvasPressed() {
	if((mouseX > 0 && mouseX < width) && (mouseY > 0 && mouseY < height)) {
		return true;
	}
	return false;
}