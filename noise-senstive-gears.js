/*
Trivial crappy implementation of noise-senstive gears
*/
let mic;

function setup() {
  createCanvas(500, 500);
  mic = new p5.AudioIn();
  mic.start();
}


let angleC = 0, angleR = 0;;
function draw() {
  background(0);
  translate(125, 250);
  fill(100, 50, 150);
  let number_of_sides = 6;
  let internal_angle = 360 / number_of_sides;
  let radius = 100;
  strokeWeight(5);
  fill(255);
  let arr = [];
  beginShape()
  for(let i  = 0; i < number_of_sides + 1; i++){
    fill(255);
    vertex(radius * Math.cos((angleC + internal_angle * i) * PI/180), 
          radius * Math.sin((angleC + internal_angle * i) * PI/180));
    arr.push([radius * Math.cos((angleC + internal_angle * i) * PI/180), 
          radius * Math.sin((angleC + internal_angle * i) * PI/180)]);
  }
  endShape();
  fill(0, 255, 0);
  noStroke();
  ellipse(0, 0, 10 + radius, 10 + radius);
  fill(255, 0, 0);
  ellipse(0, 0, radius, radius);
  stroke(0);
  for(const [y, x] of arr){
    line(0, 0, y, x);
  }
  
  arr = [];  
  translate(190, 0);
  beginShape();
  for(let i  = 0; i < number_of_sides + 1; i++){
    fill(255);
    vertex(radius * Math.cos((angleR + internal_angle * i) * PI/180), 
          radius * Math.sin((angleR + internal_angle * i) * PI/180));
    arr.push([radius * Math.cos((angleR + internal_angle * i) * PI/180), 
          radius * Math.sin((angleR + internal_angle * i) * PI/180)]);
  }
  endShape();
  fill(0, 255, 0);
  noStroke();
  ellipse(0, 0, 10 + radius, 10 + radius);
  fill(255, 0, 0);
  ellipse(0, 0, radius, radius);

  stroke(0);
  for(const [y, x] of arr){
    line(0, 0, y, x);
  }
  
  let level = mic.getLevel()
  angleC += 20 * level;
  angleR -= 20 * level;
}
