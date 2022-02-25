/// <reference path="./libraries/p5.global-mode.d.ts" />

function setup() {
  createCanvas(600, 600);
}

function drawBackground() {
  noStroke();
  for(var x = 0; x < width; x++) {
    for(var y = 0; y < height; y++) {
      var i = x;
      var j = y * 2;
      
      point(x,y);
    }
  }
}

function draw() {
  background(220);
  drawBackground();
  noLoop();
}
