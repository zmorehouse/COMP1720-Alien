// Anti-gravity Alien by Zac Morehouse u7637337

// General Variables
let stars = [];
let shootingStars = []; 
let numStars = 200;
let shootingStarCounter = 0;
let time = 0;  

// Arrays to store unique values for each eye
let verticalSpeeds = [0.5, 0.7, 0.9];
let horizontalSpeeds = [0.3, 0.4, 0.5];
let timeOffsets = [0, 50, 100];

function setup() {
  createCanvas(800, 800);
  // Generate some random stars
  for (let i = 0; i < numStars; i++) {
    stars[i] = createVector(random(width), random(height), random(1, 6));
  }
}

function draw() {
  // Each item has been extrapolated into its own function for legibility sake 
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
  // Add stars
  for (let i = 0; i < numStars; i++) {
    ellipse(stars[i].x, stars[i].y, stars[i].z, stars[i].z);
  }
  // Draw the moon and craters
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
  // Move stars across the screen
  for (let i = 0; i < numStars; i++) {
    stars[i].x -= 0.5; 
    if (stars[i].x < 0) {
      stars[i].x = width;
      stars[i].y = random(height);
      stars[i].z = random(1, 6);
    }
  }
  // Every 120 frames, create a shooting star
  shootingStarCounter++;
  if (shootingStarCounter > 120) { 
    createShootingStar();
    shootingStarCounter = 0;
  }
}

function createShootingStar() {
  // Generate a random location for the shooting star
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
  // Draw the shooting star
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
  eyeball(150, 275, 0); // Draw all three eyeballs
  eyeball(400, 200, 1);
  eyeball(650, 275, 2);
  // Initialise variables for the sway / anti gravity effects
  let bodySway = sin(time * 0.45) * 5; 
  let headSway = sin(time * 0.5) * 5; 
  // Draw the arms

  noFill();
  strokeWeight(18);
  stroke('rgb(0,88,0)');

  arc(325 + bodySway,  575 + bodySway, 300, 300, HALF_PI, PI - QUARTER_PI);
  arc(475 + bodySway,  575 + bodySway, 300, 300, QUARTER_PI, HALF_PI);

  strokeWeight(0)
fill('rgb(0,88,0)')
  circle(215 + bodySway,  675 + bodySway, 35);
  circle(585 + bodySway,  675 + bodySway, 35);

  rocket();
  // Draw the body, neck and head
  fill('green');

  rect(300 + bodySway, 625, 200, 225, 65, 65, 450, 450);
  rect(375 + bodySway, 585, 50, 75); 
  rect(275 + headSway, 350, 250, 250, 500, 500, 100, 100); 

  fill('rgb(0,88,0)');
  circle(395 + headSway,  425, 5)
  circle(405 + headSway,  425, 5)

  // Draw the mouth
  fill(255);
  strokeWeight(0);

  arc(400 + headSway, 525, 100, 100, 0, PI); 
}

function eyeball(x, y, index) {
  // Create randomised variables for the eyeball position
  let floatY = y + sin(time * verticalSpeeds[index] + timeOffsets[index]) * 10;
  let floatX = x + sin(time * horizontalSpeeds[index] + timeOffsets[index]) * 5;
  
  // Create a variable for the connection point to the bottom of the eyeball
  let eyeballBottomY = floatY + 62.5; 
  let controlPointX = (floatX + 400) / 2;
  let controlPointY = max(floatY, 450) + 50;

  // Draw the curved line to connect the eyes
  noFill();
  stroke('green');
  strokeWeight(15);
  beginShape();
  vertex(400, 450); // Head center
  bezierVertex(controlPointX, controlPointY, floatX, eyeballBottomY, floatX, eyeballBottomY);
  endShape();
  noStroke();

  // Draw the eyeballs themselves
  fill(255);
  circle(floatX, floatY, 125); 
  fill(0);
  circle(floatX, floatY, 35);  
  fill('green');
  arc(floatX, floatY + 50, 80, 30, 0, PI);  
  arc(floatX, floatY - 50, 80, 30, PI, TWO_PI); 
}

function rocket() {
  
}
