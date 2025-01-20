// sketch.js - Displays nodes. When clicked on, nodes branch out randomly to create new nodes
// Author: Lo Weislak
// Date: 1/20/25

//Code for functions displayNodes and mousePressed found at:
//http://www.generative-gestaltung.de/2/sketches/?02_M/M_6_1_03


// Globals
let canvasContainer;
var centerHorz, centerVert;
var selectedNode = null;

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.edges = [];
  }

  //Edges are attatched to origin node
  addEdges(x, y) {
    this.edges.push([x, y]);
  }

  //Check if new node overlaps
  checkNodeOverlap() {
    for(var i = 0; i < nodes.length; i++) {
      if(dist(this.x, this.y, nodes[i].x, nodes[i].y) < 20) {
        return true;
      }
    }
    return false;
  }

  animateNode() {

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
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  nodes = [];
  nodes.push(new Node(canvas.width/2, canvas.height/2)); //Add starting node to center

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

//Function modified from generative design
function displayNodes() {
  for (var i = 0; i < nodes.length; i++) {
    currNode = nodes[i];

    //Draw edges
    stroke(0, 130, 164);
    strokeWeight(2);
    for (var j = 0; j < currNode.edges.length; j++) {
      line(currNode.x, currNode.y, currNode.edges[j][0], currNode.edges[j][1]);
    }

    //Draw node
    noStroke();
    fill(255);
    ellipse(currNode.x, currNode.y, 16, 16);
    fill(0);
    ellipse(currNode.x, currNode.y, 16 - 4, 16 - 4);
  }
}

//Function modified from generative design
//Check if node was pressed by checking mouse location and comparing to node locations
//TODO: Modify the number of nodes created when clicked and narrow possible angles
function mousePressed() {
  var nodeSize = 8;
  var maxDistFromNode = 200; //Max distance that a new node can be placed from selected node
  numNodes = Math.floor((Math.random() * 5) + 2); //Random number of nodes created (1-5)

  for (var i = 0; i < nodes.length; i++) { //Check all nodes
    var checkNode = nodes[i];
    var d = dist(mouseX, mouseY, checkNode.x, checkNode.y);
    if (d < nodeSize) { //If node is selected, create new branching nodes
      selectedNode = checkNode;
      for(var j = 0; j < numNodes; j++) {
        setNodeLocation(maxDistFromNode);
      }
      return;
    }
  }
};

function mouseReleased() {
  if (selectedNode != null) {
    selectedNode = null;
  }
};

//Find where node will be placed and add node/edge
function setNodeLocation(maxDist) {
  //Random angle code from: https://stackoverflow.com/a/9879291
  angle = Math.random() * 2 * Math.PI;
  x = Math.floor(Math.random() * maxDist);
  y = Math.floor(Math.random() * maxDist);

  newNode = new Node(selectedNode.x + x * Math.cos(angle), selectedNode.y + y * Math.sin(angle));
  if(!newNode.checkNodeOverlap()) {
    newNode.animateNode();
    nodes.push(newNode);
    selectedNode.addEdges(newNode.x, newNode.y);
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);
  displayNodes();
}