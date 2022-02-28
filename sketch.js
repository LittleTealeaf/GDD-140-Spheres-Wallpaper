/// <reference path="./libraries/p5.global-mode.d.ts" />

/**
 * Class representing a specific point, used in deciding the origins of each color channel
 */
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Class that represents a circle, which has a point and a radius
 */
class Circle {
  constructor(x,y,radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

/**
 * Number of points to be rendered in each frame
 */
const pointsPerFrame = 2000;


//The currently rendered x and y positions
var x = 0;
var y = 0;

//Points of origin for each channel of color
var pointGreen, pointRed, pointBlue;
//Stored max distance for each channel of color's point
var dGreen, dRed, dBlue;

//Array of Circles
var circles = [];
//Max radius of a circle
const radius = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);

  //Sets each color channel point
  pointGreen = new Point(random(width),random(height));
  pointRed = new Point(random(width),random(height));
  pointBlue = new Point(random(width),random(height));
  //Gets the maximum distance from each point to one of the corners
  dGreen = calculateDistances(pointGreen);
  dRed = calculateDistances(pointRed);
  dBlue = calculateDistances(pointBlue);

  //Creates the circles
  circles = createCircles();

  //Sets the framerate to absurdly high so the computer won't wait before cycles
  frameRate(240);
}

function calculateDistances(point) {
  //Basically takes the maximum distance from the given point to any of the corners
  return Math.max(dist(point.x,point.y,0,0),dist(point.x,point.y,width,0),dist(point.x,point.y,0,height),dist(point.x,point.y,width,height));
}

/**
 * Creates a bunch of circles to populate 
 */
function createCircles() {
  const count = 50;
  var circles = [];
  for(var i = 0; i < count; i++) {
    //Creates a new circle at a random position with a random radius
    circles.push(new Circle(Math.random() * width,Math.random() * height, Math.random() * radius));
  }
  return circles;
}

function draw() {
  if (y < height) { //Run as long as the y level is within the height
    var points = 0;
    //Only run until points is more than pointsPerFrame, or the image is finished
    while (y < height && points < pointsPerFrame) {
      //Update points
      points++;
      //run the render script at x and y
      render(x, y);
      //Update x and y, wrapping around if necessary
      x = (x + 1) % width;
      if (x == 0) {
        y++;
      }
    }
  } else { //Once image is finished, cancel loop
    noLoop();
  }
}

function render(x, y) {
  //Calculate background colors
  var r = ((1 - dist(x, y, pointRed.x,pointRed.y) / dRed) * 255)%255;
  var g = ((1 - dist(x, y, pointGreen.x,pointGreen.y) / dBlue) * 255)%255;
  var b = ((1 - dist(x, y, pointBlue.x,pointBlue.y) / dGreen) * 255)%255;

  //Set stroke to the background colors
  stroke(r, g, b);
  
  //For each circle
  circles.forEach(e => {
    d = dist(x,y,e.x,e.y);
    if(d < e.radius) {
      /*
      If it's within the circles, then do some CRAZY stuff that I did:

      step 1: invert the colors
      step 2: multiply it by the current distance, such that the colors get darker the further they are
      */
      stroke((255 - r) * (1 - d / radius),(255-b) * (1 - d/radius),(255-g) * (1 - d/radius));
    }
  });

  //Draw the point of madness!
  point(x, y);
}