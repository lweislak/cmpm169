// sketch.js - Displays nodes. When clicked on, nodes branch out randomly to create new nodes
// Author: Lo Weislak
// Date: 1/20/25

//Inspiration and starting code for functions displayNodes and mousePressed found at:
//http://www.generative-gestaltung.de/2/sketches/?02_M/M_6_1_03


// Globals
let canvasContainer;
var centerHorz, centerVert;
var selectedNode = null;

class Node {
  constructor(x, y) {
    this.x = Math.round(x *100)/100;
    this.y = Math.round(y *100)/100;
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

  setCurrentLocation(x, y) {
    this.currX = Math.round(x *100)/100;
    this.currY = Math.round(y *100)/100;
  }
};

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
};

// setup() function is called once when the program starts
function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  nodes = [];
  node = new Node(canvas.width/2, canvas.height/2);
  nodes.push(node); //Add starting node to center
  node.setCurrentLocation(canvas.width/2, canvas.height/2);


  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
};

//Function modified from generative design
function displayNodes() {
  for (var i = 0; i < nodes.length; i++) {
    var currNode = nodes[i];

    drawEdges(currNode);
    drawNode(currNode);
    moveNode(currNode);
  }
};

function drawNode(node) {
  noStroke();
  fill(255);
  ellipse(node.currX, node.currY, 16, 16);
  fill("#181818");
  ellipse(node.currX, node.currY, 16 - 4, 16 - 4);
};

function drawEdges(node) {
  if(dist(node.currX, node.currY, node.x, node.y) <= 1) {
    stroke(0, 130, 164);
    strokeWeight(2);
    for (var j = 0; j < node.edges.length; j++) {
      line(node.x, node.y, node.edges[j][0], node.edges[j][1]);
    }
    node.setCurrentLocation(node.x, node.y);  //Set final location to finish animation
  }
};

//Move node along edge
function moveNode(node) {
  if(dist(node.currX, node.currY, node.x, node.y) > 0) {
    //Move point along line code found at: https://stackoverflow.com/a/5995931
    //Note: Not efficient! Line is already calculated earlier in the drawEdges() function
    angle = Math.atan2(node.y - node.currY, node.x - node.currX);
    node.setCurrentLocation(node.currX + Math.cos(angle), node.currY + Math.sin(angle));
  }
};

//Function modified from generative design
//Check if node was pressed by checking mouse location and comparing to node locations
function mousePressed() {
  nodeSize = 8;
  maxDistFromNode = 200; //Max distance that a new node can be placed from selected node
  numNodes = Math.floor((Math.random() * 5) + 2); //Random number of nodes created (1-5)

  for (var i = 0; i < nodes.length; i++) { //Check all nodes
    checkNodeDistance(nodes[i]);
  }
};

//Helper function to check the distance from a node to the mouse pointer
function checkNodeDistance(checkNode) {
  var d = dist(mouseX, mouseY, checkNode.x, checkNode.y);
  if (d < nodeSize) { //If node is selected, create new branching nodes
    selectedNode = checkNode;
    for(var j = 0; j < numNodes; j++) {
      setNodeLocation(maxDistFromNode);
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

  if(!newNode.checkNodeOverlap()) { //If there is no overlap, add node to the array
    nodes.push(newNode);
    selectedNode.addEdges(newNode.x, newNode.y);
    newNode.setCurrentLocation(selectedNode.x, selectedNode.y);
  }
};

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);
  displayNodes();
};