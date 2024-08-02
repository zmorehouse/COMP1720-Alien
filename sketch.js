function setup() {
  // create the canvas (800px wide, 800px high)
  createCanvas(800, 800);

  // draw a border to help you see the size
  // this isn't compulsory (remove this code if you like)
  strokeWeight(5);
  rect(0, 0, width, height);
  strokeWeight(1);



}

let angry = false;

function draw() {
background(255)

  if (frameCount % 300 === 0) {
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

function mouth(angry) {
  
}
