let d = 29;
let n = 2;
let x,y;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  x = createSlider(1,180,1);
  y = createSlider(1, 180,1);
}

function draw() {
  translate(200,200);
  background(0);
  noFill();
  d = x.value();
  n = y.value();
  beginShape();
  for(let i = 0;i < 360;i++)
  {
    k = i*d;
    r = 150*sin(n*k);
    stroke(255);
    let x = r*cos(k);
    let y = r*sin(k);
    vertex(x,y);
  }
  endShape(CLOSE);
  stroke(0,0,255);
  strokeWeight(1);
  
   beginShape();
  for(let i = 0;i < 360;i++)
  {
    k = i;
    r = 150*sin(n*k);
    let x = r*cos(k);
    let y = r*sin(k);
    vertex(x,y);
  }
  endShape(CLOSE);
  
  
  stroke(255,0 , 0);
   beginShape();
  for(let i = 0;i < 360;i++)
  {
    k = i*3;
    r = 150*sin(n*k);
    let x = r*cos(k);
    let y = r*sin(k);
    vertex(x,y);
  }
  endShape(CLOSE);
}
