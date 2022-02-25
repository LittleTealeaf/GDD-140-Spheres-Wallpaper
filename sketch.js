/// <reference path="./libraries/p5.global-mode.d.ts" />

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var x = 0;
var y = 0;
var pointsPerFrame = 2500;
var dCross;

var pointGreen, pointRed, pointBlue;
var dGreen, dRed, dBlue;

var points = [];
var radius = 50;

function setup() {
  createCanvas(600, 600);
  background(220);
  pointGreen = new Point(random(width),random(height));
  pointRed = new Point(random(width),random(height));
  pointBlue = new Point(random(width),random(height));
  dGreen = calculateDistances(pointGreen);
  dRed = calculateDistances(pointRed);
  dBlue = calculateDistances(pointBlue);
  dCross = dist(0, 0, width, height);

  createPoints(7);
}

function calculateDistances(point) {
  return Math.max(dist(point.x,point.y,0,0),dist(point.x,point.y,width,0),dist(point.x,point.y,0,height),dist(point.x,point.y,width,height));
}

function createPoints(count) {
  for(var i = 0; i < count; i++) {
    points.push(new Point(Math.random() * width,Math.random() * height));
  }
}

function draw() {
  renderPartial();
}

function renderPartial() {
  if (y < height) {
    var points = 0;
    while (y < height && points < pointsPerFrame) {
      points++;
      render(x, y);
      x = (x + 1) % width;
      if (x == 0) {
        y++;
      }
    }
  } else {
    noLoop();
  }
}

function render(x, y) {
  var r = 0,
    g = 0,
    b = 0;


  r = ((1 - dist(x, y, pointRed.x,pointRed.y) / dRed) * 300)%255;
  g = ((1 - dist(x, y, pointGreen.x,pointGreen.y) / dBlue) * 300)%255;
  b = ((1 - dist(x, y, pointBlue.x,pointBlue.y) / dGreen) * 300)%255;

  stroke(r, g, b);

  points.forEach(e => {
    d = dist(x,y,e.x,e.y);
    if(d < radius) {
      stroke((255 - r) * (1 - d / radius),(255-b) * (1 - d/radius),(255-g) * (1 - d/radius));
    }
  })


  point(x, y);
}