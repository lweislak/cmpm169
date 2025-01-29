// sketch.js - purpose and description here
// Author: Lo Weislak
// Date: 1/27/25

//Flocking sim tutorial using Boids found at: https://www.youtube.com/watch?v=mhjuuHl6qHM

//Possible refactoring: Take snapshot of each particles' current velocity and flock using that snapshot in update()
//Possible refactoring: Subdivison/quadtree
//Possible ideas: Particle can only see a specific "view", obstacles

// Globals
let canvasContainer;
var centerHorz, centerVert;

var flock = [];

class Particle {
    constructor() {
      this.position = createVector(random(width), random(height));
      this.velocity = p5.Vector.random2D();
      this.velocity.setMag(2, 4); //Moves particles at different speeds
      this.acceleration = createVector(0,0);
      this.maxForce = 0.2;
      this.maxSpeed = 7;
    }

    show(color) {
      strokeWeight(8);
      //stroke(255);
      stroke(color);
      point(this.position.x, this.position.y);
    }

    checkColor() {

    }

    update() {
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.acceleration.set(0,0); //Reset acceleration
    }
    
    flock(particles) {
      let alignment = this.align(particles);
      let cohesion = this.cohesion(particles);
      let separation = this.separation(particles);
      this.acceleration.add(separation);
      this.acceleration.add(alignment); //Force accumulation
      this.acceleration.add(cohesion);

      //console.log(Math.abs(Math.round((this.velocity.x + this.velocity.y)*100)));

      return(Math.abs(Math.round((this.velocity.x + this.velocity.y)*100)));
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

    getSteeringForce(particles, rule) {
      let radius = 20;
      let total = 0;
      let steeringForce = createVector();
      for (let other of particles) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if(other != this && d < radius) {
          if(rule == "align") {steeringForce.add(other.velocity);}
          else if(rule == "cohesion") {steeringForce.add(other.position);}
          else { //Separation
            let difference = p5.Vector.sub(this.position, other.position);
            difference.div(d**2); //The farther away a particle is, the lower the magnitude
            steeringForce.add(difference);
          }
          total++;
        }
      }
      if (total > 0) {
        steeringForce.div(total);
        if(rule == "cohesion") { steeringForce.sub(this.position); }
        steeringForce.setMag(this.maxSpeed);
        steeringForce.sub(this.velocity);
        steeringForce.limit(this.maxForce);
      }
      return steeringForce;
    }

    /*
    //TODO: Refactor!
    //Align particle with other local particles
    align(particles) {
      let radius = 50;
      let total = 0;
      let steeringForce = createVector();
      for (let other of particles) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if(other != this && d < radius) {
          steeringForce.add(other.velocity);
          total++;
        }
      }
      if (total > 0) {
        steeringForce.div(total);
        steeringForce.setMag(this.maxSpeed);
        steeringForce.sub(this.velocity);
        steeringForce.limit(this.maxForce);
      }
      return steeringForce;
    }

    //TODO: Refactor!
    //Steer particles in direction of local particles
    cohesion(particles) {
      let radius = 50;
      let total = 0;
      let steeringForce = createVector();
      for (let other of particles) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if(other != this && d < radius) {
          steeringForce.add(other.position);
          total++;
        }
      }
      if (total > 0) {
        steeringForce.div(total);
        steeringForce.sub(this.position);
        steeringForce.setMag(this.maxSpeed);
        steeringForce.sub(this.velocity);
        steeringForce.limit(this.maxForce);
      }
      return steeringForce;
    }

    //TODO: Refactor!
    separation(particles) {
      let radius = 50;
      let total = 0;
      let steeringForce = createVector();
      for (let other of particles) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if(other != this && d < radius) {
          let difference = p5.Vector.sub(this.position, other.position);
          difference.div(d**2); //The farther away a particle is, the lower the magnitude
          steeringForce.add(difference);
          total++;
        }
      }
      if (total > 0) {
        steeringForce.div(total);
        steeringForce.setMag(this.maxSpeed);
        steeringForce.sub(this.velocity);
        steeringForce.limit(this.maxForce);
      }
      return steeringForce;
    }
    */

    align(particles) {
      return(this.getSteeringForce(particles, "align"));
    }

    cohesion(particles) {
      return(this.getSteeringForce(particles, "cohesion"));
    }

    separation(particles) {
      return(this.getSteeringForce(particles, "separation"));
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
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  for(var i = 0; i < 100; i++) {
    flock.push(new Particle());
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  //background(51);
  background("#0080ff");

  for(let particle of flock) {
    particle.edges();
    testColor = particle.flock(flock);
    particle.update();
    particle.show(testColor);
  }
}