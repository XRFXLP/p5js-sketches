let value;
function setup() {
  createCanvas(600, 600);
  background(121, 43, 39);
  rectMode(CENTER);
}

let stepSize = 20;
let food = [100, 100];
var snake = [[0, 0], [0, stepSize], [0, stepSize * 2]];
let direction = 'U';
let number = 0;
let inc = 1;
function oppositeTo(dir){
  switch(dir){
    case 'U' : return 'D';
    case 'D' : return 'U';
    case 'R' : return 'L';
    case 'L' : return 'R';
  }
}
function draw() {
  translate(300, 300);
  background(121, 43, 39)
  fill(56, 60, 34);
  rect(0, 0, 580, 580); 
  fill(100, 50, 150);
  noStroke();
  number += inc;
  
  ellipse(food[0], food[1], 0.75*(number % 20) + 20, 0.75*(number % 20) + 20);
  if(number > 19){
    inc = -1;
  }
  else if(number < 1){
    inc = 1;
  }
  let [x, y] = snake[0];
  if(value == oppositeTo(direction)){
    value = direction;
  }
  if(value != undefined){
    x += value == "L" ? -stepSize : value == "R" ? stepSize : 0;
    y += value == "U" ? -stepSize : value == "D" ? stepSize : 0;
    direction = value;
    if(x<-300||x>300|y<-300||y>300||snake.slice(1).some(([a, b]) => a == x && b == y)){
      background(255);
      textSize(50);
      text("GAME OVER", -140, 0);
      noLoop();
    }

    snake.unshift([x, y]);
    if(x == food[0] && y == food[1]){
      food = [-280 + Math.floor(280 * Math.random()), -280 + Math.floor(280 * Math.random())];
      food[0] = Math.floor(food[0] / stepSize) * stepSize;
      food[1] = Math.floor(food[1] / stepSize) * stepSize;
    }
    else{
      snake.pop();
    }
    
  }
  
  fill(255, 0, 0);
  let [hx, hy] = snake[0];
  ellipse(hx, hy, 20, 20);
  fill(0);
  for(let [i, j] of snake.slice(1)){
    rect(i, j, 20, 20);
  }
  
  textSize(10);
  fill(0, 0, 255);
  noFill();
  stroke(0);
  rect(-220, -250, 100, 40);
  text("Score : " + snake.length * 5, -250, -250);
}

function keyPressed() {
       if (keyCode === LEFT_ARROW) {   value = "L";  }  
  else if (keyCode === RIGHT_ARROW){   value = "R";  }
  else if (keyCode === DOWN_ARROW) {   value = "D";  }
  else if (keyCode === UP_ARROW)   {   value = "U";  }
}
