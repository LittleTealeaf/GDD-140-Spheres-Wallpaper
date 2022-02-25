/// <reference path="./libraries/p5.global-mode.d.ts" />

var x = 0;
var y = 0;
var pointsPerFrame = 5000;

function setup() {
  createCanvas(600, 600);
  background(220);
}

function draw() {
  renderPartial();
}

function renderPartial() {
  if(y < height) {
    var points = 0;
    while(y < height && points < pointsPerFrame) {
      points++;
      render(x,y);
      x = (x + 1)%width;
      if(x == 0) {
        y++;
      }
    }
  } else {
    noLoop();
  }
}

function render(x,y) {
  stroke((dist(x,y,0,0) + dist(x,y,width,0) + dist(x,y,0,height) + dist(x,y,width,height) + dist(x,y,width/2,height/2))%255);
  point(x,y);
}
