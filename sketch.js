function setup() {
  // create the canvas (800px wide, 800px high)
  createCanvas(800, 800);

  // draw a border to help you see the size
  // this isn't compulsory (remove this code if you like)
  strokeWeight(5);
  rect(0, 0, width, height);
  strokeWeight(1);

}

function draw() {
  
  eyeball(150, 275, false)
  eyeball(400, 200, false)
  eyeball(650, 275, false)


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
    arc(x,y,100,100,PI, 0)
  }

  fill('green');
  arc(x,y+35,75,30,0, PI)

}
