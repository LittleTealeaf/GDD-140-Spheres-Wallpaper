/// <reference path="./libraries/p5.global-mode.d.ts" />

var distance

function setup() {
  createCanvas(600, 600);
  // PLAN: recursive quilt pattern with squares and/or circles
}

function drawBackground() {
  noStroke();
  for(var x = 0; x < width; x++) {
    for(var y = 0; y < height; y++) {
      var i = x;
      var j = y * 2;
      stroke(dist(0,0,i,j)%255,dist(width,0,i,j)%255,dist(0,height,i,j)%255);
      point(x,y);
    }
  }
  var x = 0;
  var y = 0;
  for(var i = 0; i < 10; i++) {
    drawSphere(width/2,height/2,50);
  }
}

function drawSphere(xPos,yPos,radius) {
  for(var x = xPos - radius; x < xPos + radius; x++) {
    for(var y = yPos - radius; y < yPos + radius; y++) {
      if(dist(xPos,yPos,x,y) <= radius) {
        stroke((xPos - x + yPos - y) / (radius * 3) * 255);
        point(x,y);
      }
    }
  }
}

function draw() {
  background(220);
  drawBackground();
  noLoop();
}
