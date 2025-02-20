// sketch.js - Click to display random word from text file.
// Font creates a mirror effect so words are readable when rotated on the x-axis

// Author: Lo Weislak
// Date: 2/19/25

//Random words text file: https://github.com/Shreda/pentestTools/blob/master/random-words.txt
//Lake Reflection font: https://fontmeme.com/fonts/lake-reflection-font/

// Globals
let canvasContainer;
var centerHorz, centerVert;

let words = [];
let totalWords = [];
const TEXT_SIZE = 50;
const BACKGROUND_COLOR = 10;

class Word {
  constructor(word, x, y) {
    this.word = word;
    this.position = {x: x - width/2, y: y - height/2};
    this.angle = 0;
    this.blue = random() * 255; //Create random shade of blue/green
    this.green = random() * 255;
  }

  draw() {
    push();
    translate(this.position.x, this.position.y, 0);
    rotateX(this.angle);
    fill(0, this.green, this.blue); //RGB
    text(this.word, 0, 0);
    this.angle += 0.01;
    pop();
  }
}

function resizeScreen() { 
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function preload() {
  totalWords = loadStrings('./random-words.txt'); //Load file into array
  font = loadFont('./LakeReflection.otf');
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

  background(BACKGROUND_COLOR);
}

function draw() {
  background(BACKGROUND_COLOR);

  textFont(font);
  textAlign(CENTER,CENTER);
  textSize(TEXT_SIZE);

  for(let word of words) {
    word.draw();
  }
}

function mouseClicked() {
  if(canvasPressed()) {
    words.push(new Word(totalWords.splice(random()*totalWords.length, 1), mouseX, mouseY)); //Select and remove a random word from array
  }
}

//Helper function to determine if mouse was pressed on the canvas
function canvasPressed() {
	if((mouseX > 0 && mouseX < width) && (mouseY > 0 && mouseY < height)) {
		return true;
	}
	return false;
}