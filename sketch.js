let stars = []; //global variable (array)
let numStars = 200; //variable to control number of stard

function setup() {
  // create the canvas (800px wide, 800px high)
  createCanvas(800, 800);

  // draw a border to help you see the size
  // this isn't compulsory (remove this code if you like)
  strokeWeight(5);
  rect(0, 0, width, height);
  strokeWeight(1);
  
  
  for (let i = 0; i < numStars; i++) {
    stars[i] = createVector(random(width), random(height), random(1,6));
}
  

}

let angry = false;

function draw() {
  canvasBg() 
  
  if (frameCount % 200 === 0) {
     angry = !angry;
  }
  
  strokeWeight(1);
  eyeball(150, 275, angry)
  eyeball(400, 200, angry)
  eyeball(650, 275, angry)
  
  strokeWeight(0);
  circle(width/2, 700, 500)
  rect(151, 700, 498, 400, 20);
}


function keyTyped() {
  if (key === " ") {
    saveCanvas("monster.png");
  }
}

function eyeball(x, y, angry) {
  fill(255);
  circle(x,y, 100);
  fill(0);
  circle(x,y, 25)

  if (angry === true) {
      fill('green');
    arc(x,y,100,100,PI, 0);
    fill('black');
    strokeWeight(5);
    line(x - 35, y-45, x, y - 35 )
    line(x + 35, y-45, x, y - 35 )
        strokeWeight(1);
  }

  fill('green');
  arc(x,y+35,75,30,0, PI)

}



function canvasBg() {


  background(9, 15, 79);
  
  fill(255);
  for (let i = 0; i < numStars; i++){
    ellipse(stars[i].x, stars[i].y, stars[i].z,stars[i].z);
  }

}

// Inspo 1 https://editor.p5js.org/jesse_harding/sketches/0szF7gcAx 
