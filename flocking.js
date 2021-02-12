let boids = [];

function setup() {
  createCanvas(1350, 760);
  for (let i = 0; i < 250; i++) {
    boids[i] = new Boid(random(width), random(height));
  }
}



function draw() {
  background(5, 2, 58);
  for (let i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }
}


class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 5;
    this.maxforce = 0.05;
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }
  

  applyForce(force) {
    this.acceleration.add(force);
  }

  flock(boids) {
    let sep = this.separate(boids); 
    let ali = this.align(boids);    
    let coh = this.cohesion(boids); 
    sep.mult(5.0);
    ali.mult(3.0);
    coh.mult(1.0);
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  update() {
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  

  seek(target) {
    let desired = p5.Vector.sub(target, this.position); 
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }
  
  render() {
    fill(127, 127, 127);
    stroke(200);
    console.log(this.velocity);
    let [a,b] = [this.velocity.x, this.velocity.y];
    let mg = Math.pow((Math.pow(a,2) + Math.pow(b,2)), 0.5);
    a /= mg;
    b /= mg;
    
    let smaller = 5;
    let larger = 15;
    
    let distance_from_o = 0.002 * Math.pow(Math.pow(this.position.x - 1350/2, 2) + Math.pow(this.position.y - 760/2, 2), 0.5);
    distance_from_o *= distance_from_o;
    smaller *= distance_from_o;
    larger *= distance_from_o;
    
    let xf = this.position.x - a*smaller;
    let yf = this.position.y - b*smaller;
    
    let xs = this.position.x + a*larger;
    let ys = this.position.y + b*larger;
    
    let wings = 7;
    wings *= distance_from_o;
    let xs1 = xf + b*wings;
    let ys1 = yf - a*wings;
    
    let xs2 = xf - b*wings;
    let ys2 = yf + a*wings;
    stroke(127, 127, 127);
    triangle(xs1, ys1, xs2, ys2,xs, ys);
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      
      if ((d > 0) && (d < desiredseparation)) {
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); 
        steer.add(diff);
        count++; 
      }
    }

    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }
  
  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
  
  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); 
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); 
    } else {
      return createVector(0, 0);
    }
  }  
}
