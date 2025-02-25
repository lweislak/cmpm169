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

  background("rgb( 0, 0, 30)");
}

let scrollAmount = 50;
let blue = 30;
let green = 0;

let lines = [];

function draw() {
  //background(`rgb(0, ${green} , ${blue})`);
  background(15);

  push();
  translate(-scrollAmount, 0);
  strokeWeight(5);
  stroke("green");
	line(0, 0, scrollAmount, 0);

  drawLines();
  pop();
}

function mouseWheel(event) {
  calculateLines();

  //TODO: Fix!!
   //Stop user from scrolling to the left
  if(scrollAmount < 50) {
    scrollAmount = 50;
    //background(`rgb(0, 0, 30)`);
    return false;
  }

  //Determine if scrolling up or down
	if(event.delta > 0){
		scrollAmount += 10;
    green++;
	} else {
		scrollAmount -= 10;
    green--;
	}
	return false; //Prohibits page scroll
}

function calculateLines() {
  //Add new lines
  if(scrollAmount % 200 == 0) {
    lines.push(scrollAmount);
  }

  //Remove lines when scrolling back
  for(let currLine of lines) {
    if(currLine > scrollAmount) {
      lines.splice(lines.indexOf(currLine, 1));
    }
  }
}

function drawLines() {
  for(var currLine of lines) {
    line(currLine, -10, currLine, 10);
  }
}