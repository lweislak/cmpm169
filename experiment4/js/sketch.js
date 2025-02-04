// sketch.js - purpose and description here
// Author: Lo Weislak
// Date: 2/3/25

//Chime sounds found at: https://freesound.org/people/_bliind/packs/27727/

// Globals
let canvasContainer;
var centerHorz, centerVert;
let chimes = [];
let fireflies = [];
const numOfChimes = 6;
const numOfFireflies = 20;


//Blink and display firefly functions taken from: https://editor.p5js.org/dt2307/sketches/NAaFMQ7hc
//The rest of the class is adapted from the Experiment 3 Particle class
class Firefly {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.brightness = random(150, 255);
    this.blinkRate = random(0.03, 0.05);
    this.radius = 8;
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(1.5, 4); //Moves particles at different speeds
  }

  update() {
    this.position.add(this.velocity);
  }

  //Wrap particles around screen
  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  blink() {
    // Update brightness for blinking effect
    this.brightness += sin(frameCount * this.blinkRate) * 5;
    this.brightness = constrain(this.brightness, 150, 255);
  }

  display() {
    noStroke();
    let glowSize = this.size * 2;
    let alpha = map(this.brightness, 150, 255, 50, 150);

    // Draw firefly with layered glow effect
    fill(255, 255, 150, alpha * 0.3);
    ellipse(this.position.x, this.position.y, glowSize, glowSize);
    fill(255, 255, 150, alpha * 0.7);
    ellipse(this.position.x, this.position.y, this.radius * 1.5, this.radius * 1.5);
    fill(255, 255, 150, alpha);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }
}

class Chime {
  constructor(x, sound) {
    this.position = createVector(x, random(50, 400)); //Set random height
    this.height = 200;
    this.width = 80;
    this.sound = loadSound(sound);
    this.color = color(random(255), random(255), random(255)); //Get random rgb color

    this.glowRadius = 0;
    this.maxGlowRadius = 200;
  }

  display() {
    strokeWeight(1);
    stroke("black");
    fill(this.color);
    let radius = this.width/2;

    //Draw chime
    beginShape();
    vertex(this.position.x - radius, this.position.y);
    vertex(this.position.x - radius, this.position.y + this.height);
    vertex(this.position.x + radius, this.position.y + this.height - 30);
    vertex(this.position.x + radius, this.position.y);
    endShape();
    ellipse(this.position.x, this.position.y, this.width, 10); //Draw top of chime
    strokeWeight(2);
    line(this.position.x, this.position.y, this.position.x, 0); //Draw string
  }

  //Check if chime has been clicked
  wasClicked() {
    if(mouseX < this.position.x + this.width/2 && mouseX > this.position.x - this.width/2) {
      if(mouseY < this.position.y + this.height && mouseY > this.position.y) {
        return true;
      }
    }
    return false;
  }

  //Blur code found at: https://stackoverflow.com/a/71086079
  //Display a glow from chime that expands as time goes on
  displayGlow() {
    if(this.glowRadius > 0 && this.glowRadius < this.maxGlowRadius) {
      drawingContext.filter = 'blur(20px)';
      this.glowRadius++;
      fill(this.color, this.glowRadius);
      circle(this.position.x, this.position.y + 100, this.glowRadius);
      drawingContext.filter = 'none';
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

  setupChimes();
  setupFireflies();
}

function setupChimes() {
  var spacing = 15;
  var padding = width / numOfChimes;
  var scale = padding - spacing - (spacing / numOfChimes);

  //Code for spacing found at: https://editor.p5js.org/slow_izzm/sketches/m7v7d87kL
  for(let i = 1; i <= numOfChimes; i++) {
    chimes.push(new Chime((scale*0.5)+spacing+(i-1)*(scale+spacing), `./sounds/chimes-${i}.wav`));
  }
}

function setupFireflies() {
  for(let i = 0; i < numOfFireflies; i++) {
    fireflies.push(new Firefly());
  }
}

function draw() {
  background(20);

  for(let chime of chimes) {
    chime.displayGlow();
    chime.display();
  }

  for(let firefly of fireflies) {
    firefly.blink();
    firefly.display();
    firefly.edges();
    firefly.update();
  }
}

function mousePressed() {
  for(let chime of chimes) {
    if(chime.wasClicked()) {
      chime.sound.play();
      chime.glowRadius = 60;
    }
  }
}