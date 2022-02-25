/// <reference path="./libraries/p5.global-mode.d.ts" />

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return this.x + " " + this.y;
  }
}

var points;

function setup() {
  createCanvas(600, 600);
  points = createPositions(width,height,10);

  print(points);
}

function drawBackground() {
  noStroke();
  for(var x = 0; x < width; x++) {
    for(var y = 0; y < height; y++) {
      var i = x;
      var j = y * 2;
      
      var minDist = -1;
      points.forEach(element => {
        var norm = dist(x,y,element.x,element.y);
        if(minDist == -1 || norm < minDist) {
          minDist = norm;
        }
      });
      stroke((1 - minDist / width) * 255);
      point(x,y);
    }
  }
}

function draw() {
  background(220);
  drawBackground();
  noLoop();
}


function createPositions(width,height, count) {
  var vals = [];
  for(var i = 0; i < count; i++){
    vals.push(new Point(Math.random() * width,Math.random() * height));
  }
  return vals;
}