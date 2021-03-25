let value;
function setup() {
  createCanvas(600, 600);
  background(121, 43, 39);
  rectMode(CENTER);
}

let stepSize = 20;
let food = [100, 100];
var snake = [[0, 0], [0, stepSize], [0, stepSize * 2]];
function draw() {
  translate(300, 300);
  background(121, 43, 39);
  fill(100, 50, 150);
	noStroke();
  ellipse(food[0], food[1], 20, 20);
  
  
  let [x, y] = snake[0];
  if(value != undefined){
    x += value == "L" ? -stepSize : value == "R" ? stepSize : 0;
    y += value == "U" ? -stepSize : value == "D" ? stepSize : 0;
    if(x < -300)        x = 300;
    if(x > 300)         x = -300;
    if(y < -300)       y = 300;
    if(y > 300)         y = -300;
    snake.unshift([x, y]);
    if(x == food[0] && y == food[1]){
      food = [-300 + Math.floor(300 * Math.random()), -300 + Math.floor(300 * Math.random())];
      food[0] = Math.floor(food[0] / stepSize) * stepSize;
      food[1] = Math.floor(food[1] / stepSize) * stepSize;
    }
    else{
      snake.pop();
    }
  }
  fill(0);
  for(let [i, j] of snake){
    rect(i, j, 20, 20);
  }
    
}

function keyPressed() {
       if (keyCode === LEFT_ARROW) {   value = "L";  }  
  else if (keyCode === RIGHT_ARROW){   value = "R";  }
  else if (keyCode === DOWN_ARROW) {   value = "D";  }
  else if (keyCode === UP_ARROW)   {   value = "U";  }
}
