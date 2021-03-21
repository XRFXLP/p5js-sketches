/* I've no idea what is this :P
*/ // <I know that this is a tree>
function setup() {
  createCanvas(500, 500);
  translate(200,400);
  background(255);
  branch(80,3);
  
  branch(78,4);
}

var angle = 3.14159265/5;

function branch(len,w)
{
  strokeWeight(w);
  line(0,0,0,-len);
  translate(0,-len);
  if(len > 5)
  {
    push();
    rotate(angle + random(0.3));
    branch(random(0.6,0.9)*len, w*0.8);
    pop();
    push();
    rotate(-angle + random(0.3));
    branch(random(0.6,0.9)*len, 0.8 *w)
    pop();
  }
  
}
