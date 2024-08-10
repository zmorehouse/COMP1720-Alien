let stars = [];
let shootingStars = []; 
let numStars = 200;
let shootingStarCounter = 0;
let time = 0;  

// Arrays to store independent values for each eye
let verticalSpeeds = [0.5, 0.7, 0.9];
let horizontalSpeeds = [0.3, 0.4, 0.5];
let timeOffsets = [0, 50, 100];

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < numStars; i++) {
    stars[i] = createVector(random(width), random(height), random(1, 6));
  }
}

function draw() {
  canvasBg(); 
  updateStars();
  drawShootingStars(); 
  alien();
  time += 0.05;  
}

function keyTyped() {
  if (key === " ") {
    saveCanvas("monster.png");
  }
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

function alien() {
  fill(255);
  eyeball(150, 275, 0);
  eyeball(400, 200, 1);
  eyeball(650, 275, 2);

 let bodySway = sin(time * 0.4) * 5; // Subtle horizontal sway effect
  let headSway = sin(time * 0.5) * 5; // Subtle horizontal sway effect for the head

  fill('green');
  rect(275 + bodySway, 625, 250, 300, 35); // Body with sway
  rect(375 + bodySway, 585, 50, 75); // Neck with sway
  rect(275 + headSway, 350, 250, 250, 500, 500, 100, 100); // Head with sway

  fill(255);
  strokeWeight(1);
  stroke(0);
  arc(400 + headSway, 525, 100, 100, 0, PI); // Mouth with head sway
  strokeWeight(0);
}
function eyeball(x, y, index) {
  // Apply vertical and horizontal oscillation
  let floatY = y + sin(time * verticalSpeeds[index] + timeOffsets[index]) * 10;
  let floatX = x + sin(time * horizontalSpeeds[index] + timeOffsets[index]) * 5;
  
  // Adjust the connection point to the bottom of the eyeball
  let eyeballBottomY = floatY + 62.5; // Adjusted to be at the bottom of the eyeball (radius of 125/2)
  
  // Control points for the arc
  let controlPointX = (floatX + 400) / 2;
  let controlPointY = max(floatY, 450) + 50;

  // Draw the curved line
  noFill();
  stroke('green');
  strokeWeight(15);
  beginShape();
  vertex(400, 450); // Head center
  bezierVertex(controlPointX, controlPointY, floatX, eyeballBottomY, floatX, eyeballBottomY);
  endShape();

  noStroke();

  fill(255);
  circle(floatX, floatY, 125); // Draw the eyeball
  fill(0);
  circle(floatX, floatY, 35);  // Draw the pupil
  fill('green');
  arc(floatX, floatY + 50, 80, 30, 0, PI);  // Bottom eyelid
  arc(floatX, floatY - 50, 80, 30, PI, TWO_PI);  // Top eyelid
}


