let mic;
 function setup(){
  let cnv = createCanvas(500, 500);
  //cnv.mousePressed(userStartAudio);
  mic = new p5.AudioIn();
  angleMode(DEGREES);
  mic.start();
}
let d = 71;
function draw(){
  translate(250, 250);
  background(0);
  micLevel = Math.abs(mic.getLevel());
  d = micLevel * 100;
  let y = micLevel*40;
  let n = 6 + y;
  noFill();
  stroke(255);
  beginShape()
  for(let i = 0; i < 361; i+=1){
    let ang = 150 * sin(i * d * n);
    let y = ang * sin(i * d);
    let x = ang * cos(i * d);
    fill(155, y, x + 50, 0.5);
    vertex(x, y);
  }
  endShape();
}
