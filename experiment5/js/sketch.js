// sketch.js - purpose and description here
// Author: Lo Weislak
// Date: 2/10/25

// Globals
let canvasContainer;
var centerHorz, centerVert;

var balls = [], r = 0;
const quant = 300, f = 1.00001, g = 0.1, bounce = 0.1, rad = 10;
const cube = {x:200, y:200, z:200}

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
  for(var i = 0; i < quant; i++){
		balls.push({
			x:random(cube.x),
			y:random(cube.y),
			z:random(cube.z),
			xs:0,
			ys:0,
			zs:0
		})
	}
	smooth();
	directionalLight(204, 204, 204, 100, 100, -100);
}

function draw() {
  r += 0.01;
  clear();
	rotateY(r);
	orbitControl(1, 1)
	noFill();
	stroke(0)
	box(cube.x + rad * 2, cube.y + rad * 2, cube.z + rad * 2);
	noStroke();
	fill(0);
	translate(-cube.x / 2, -cube.y / 2, -cube.z / 2);
	ambientMaterial(255);
	for(var i = 0; i < quant; i++){
		const b = balls[i];
		b.x += b.xs;
		b.y += b.ys;
		b.z += b.zs;
		b.ys += g;
		b.xs /= f;
		b.ys /= f;
		b.zs /= f;
		if (b.y > cube.y) {b.y = cube.y; b.ys *= -bounce}
		if (b.y < 0)      {b.y = 1; b.ys *= -bounce}
		if (b.x > cube.x) {b.x = cube.x; b.xs *= -bounce}
		if (b.x < 0)      {b.x = 0; b.xs *= -bounce}
		if (b.z > cube.z) {b.z = cube.z; b.zs *= -bounce}
		if (b.z < 0)      {b.z = 0; b.zs *= -bounce}
		translate(b.x, b.y, b.z);
		sphere(rad);
		translate(-b.x, -b.y, -b.z);
		for(var j = 0 ; j < quant; j++){
			if(j != i){
				const b2 = balls[j];
				const v = createVector(b2.x - b.x, b2.y - b.y, b2.z - b.z);
				if(v.mag() < rad * 2){
					v.setMag(v.mag() - rad * 2);
					b.x += v.x / 2;
					b.y += v.y / 2;
					b.z += v.z / 2;
					b2.x -= v.x / 2;
					b2.y -= v.y / 2;
					b2.z -= v.z / 2;
					b.xs += v.x / 2;
					b.ys += v.y / 2;
					b.zs += v.z / 2;
					b2.xs -= v.x / 2;
					b2.ys -= v.y / 2;
					b2.zs -= v.z / 2;
				}
			}
		}
	}
}
