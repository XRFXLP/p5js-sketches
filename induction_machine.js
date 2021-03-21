let pole;
function setup() {
  createCanvas(600, 600);
  pole = createSlider(0,5,1);
  pole.position(30,30);
  angleMode(DEGREES);
}


let r = 190;


//let there be Resultant
let X,Y;
let rr;
let x = 5;
function draw() {
  
  
  const n = 2*pole.value();
  let angle = 360/n;
  
  strokeWeight(1);
  stroke(0);
  background(255);
  translate(300,300);
  noFill();
  ellipse(0,0,350,350);
  ellipse(0,0,370,370);
  ellipse(0,0,420,420);
  
  //R
  for(let i = 1; i <= n; i++)
  {
    fill(255,0,0);
    ellipse(r*cos(angle*i), r*sin(angle*i), 10,10);
  }
  
  //Y
   for(let i = 1; i <= n; i++)
  {
    fill(0,255,0);
    ellipse(r*cos(angle*i + 60), r*sin(angle*i + 60), 10,10);
  }
  
  //B
   for(let i = 1; i <= n; i++)
  {
    fill(0,0,255);
    ellipse(r*cos(angle*i - 60), r*sin(angle*i -60), 10,10);
  }
  
  for(let j = 1; j <= n/2; j++)
  {
    strokeWeight(2);
    //Red
    stroke(255,0,0);
    fill(255, 0, 0);
    line(0,0,200*cos(x)*cos(90 + angle*j),200*cos(x)*sin(90 + angle*j));
    ellipse(200*cos(x)*cos(90 + angle*j),200*cos(x)*sin(90 + angle*j), 10,10);
    
    //Green
    stroke(0, 255,0);
    fill(0, 255 , 0);
    line(0,0,200*cos(x+ 120)*cos(210 + angle*j), 200*cos(x + 120)*sin(210 +angle*j));
    ellipse(200*cos(x + 120)*cos(210 + angle*j), 200*cos(x + 120)*sin(210 +angle*j), 10,10);
    
    //Blue
    stroke(0,0,255);
    fill(0, 0, 255);
    line(0,0,200*cos(x-120)*cos(330+ angle*j), 200*cos(x-120)*sin(330 + angle*j));
    ellipse(200*cos(x-120)*cos(330+ angle*j), 200*cos(x-120)*sin(330 + angle*j), 10, 10);
    
    
    //Resultant?
    X = 200*cos(x)*cos(90 + angle*j) + 200*cos(x + 120)*cos(210 + angle*j) + 200*cos(x-120)*cos(330+ angle*j);
    Y = 200*cos(x)*sin(90 + angle*j) + 200*cos(x + 120)*sin(210 +angle*j) + 200*cos(x-120)*sin(330 + angle*j);
    stroke(0);
    line(0,0,X,Y);
    
    
  }
   x = x + 3;
  stroke(0);
  strokeWeight(1);
  text(2*pole.value(), -90, -254);
}
