// sketch.js - 

// Author: Lo Weislak
// Date: 2/24/25

// Globals
let canvasContainer;
var centerHorz, centerVert;

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

  background(0);
}

let circleSize = 100;

function draw() {
  background(15);
	circle(0, 0, circleSize);
}

function mouseWheel(event) {
	if(event.delta > 0){
		circleSize += 10;
	} else {
		circleSize -= 10;
	}
	return false; //Prohibit scroll
}