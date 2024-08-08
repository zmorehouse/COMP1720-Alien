let stars = [];
let shootingStars = []; 
let numStars = 200;

function setup() {
  // create the canvas (800px wide, 800px high)
  createCanvas(800, 800);

  // draw a border to help you see the size
  // this isn't compulsory (remove this code if you like)
  strokeWeight(5);
  rect(0, 0, width, height);
  strokeWeight(1);
  
  for (let i = 0; i < numStars; i++) {
    stars[i] = createVector(random(width), random(height), random(1, 6));
  }
}

let angry = false;
let shootingStarCounter = 0; 

function draw() {
  canvasBg(); 
  
  updateStars();
  drawShootingStars(); 

  strokeWeight(1);
  eyeball(150, 275, angry);
  eyeball(400, 200, angry);
  eyeball(650, 275, angry);
  
  strokeWeight(0);
  circle(width / 2, 700, 500);
  rect(151, 700, 498, 400, 20);
  

  if (frameCount % 200 === 0) {
    angry = !angry;
  }
}

function keyTyped() {
  if (key === " ") {
    saveCanvas("monster.png");
  }
}

function eyeball(x, y, angry) {
  fill(255);
  circle(x, y, 100);
  fill(0);
  circle(x, y, 25);

  if (angry) {
    fill('green');
    arc(x, y, 100, 100, PI, 0);
    fill('black');
    strokeWeight(5);
    line(x - 35, y - 45, x, y - 35);
    line(x + 35, y - 45, x, y - 35);
    strokeWeight(1);
  }

  fill('green');
  arc(x, y + 35, 75, 30, 0, PI);
}

function canvasBg() {
  background(9, 15, 79);
  fill(255);
  for (let i = 0; i < numStars; i++) {
    ellipse(stars[i].x, stars[i].y, stars[i].z, stars[i].z);
  }
  fill('rgb(190, 190, 190)');
  ellipse(width / 2, height, 1000, 200);
  fill('rgb(179, 179, 179)');
  ellipse(35, 775, 55, 25);
  ellipse(150, 765, 100, 45);
  ellipse(775, 800, 75, 25);
  ellipse(650, 765, 100, 25);
  fill('rgb(9, 15, 79)');
  ellipse(75, 710, 100, 45);
  ellipse(750, 710, 100, 45);
}

function updateStars() {
  for (let i = 0; i < numStars; i++) {
    stars[i].x -= 0.5; 


    if (stars[i].x < 0) {
      stars[i].x = width;
      stars[i].y = random(height);
      stars[i].z = random(1, 6);
    }
  }

  shootingStarCounter++;
  if (shootingStarCounter > 120) { 
    createShootingStar();
    shootingStarCounter = 0;
  }
}

function createShootingStar() {
  let shootingStar = {
    x: width,
    y: random(height),
    length: random(10, 20),
    alpha: 255,
    speed: random(5, 10)
  };
  shootingStars.push(shootingStar);
}

function drawShootingStars() {
  strokeWeight(2);
  stroke(255);
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    let star = shootingStars[i];
    
    line(star.x, star.y, star.x - star.length, star.y - star.length);
    
    star.x -= star.speed;
    star.y -= star.speed;
    star.alpha -= 5; 

    if (star.alpha <= 0) {
      shootingStars.splice(i, 1);
    }
  }
    strokeWeight(0);
  stroke(0);
}
