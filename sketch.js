let slider;
let isMoon = false;
let asteroid;

let stars = [];
let clouds = [];

function setup() {
  createCanvas(600, 600);
  slider = createSlider(0, 255, 50);
  slider.position(10, height + 10);
  slider.style('width', '580px');

  asteroid = {
    x: -50,
    y: random(height),
    speed: random(1, 3),
    size: random(10, 30)
  };

  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3)
    });
  }
}

function draw() {
  if (isMoon) {
    background(0);
    fill(255);
    ellipse(width / 2, height / 2, 200);
    
    for (let i = 0; i < stars.length; i++) {
      fill(255);
      noStroke();
      ellipse(stars[i].x, stars[i].y, stars[i].size);
    }

    if (asteroid.x > width + asteroid.size / 2) {
      asteroid.x = -asteroid.size / 2;
      asteroid.y = random(height);
      asteroid.speed = random(1, 3);
      asteroid.size = random(10, 30);
    }
    if (asteroid.x < -asteroid.size / 2) {
      asteroid.x = width + asteroid.size / 2;
      asteroid.y = random(height);
      asteroid.speed = random(1, 3);
      asteroid.size = random(10, 30);
    }
    asteroid.x += asteroid.speed;
    noStroke();
    fill(200);
    ellipse(asteroid.x, asteroid.y, asteroid.size);
    
    clouds = [];
    fill(255);
    textAlign(CENTER);
    textSize(30);
  } else {
    background(0, 128, 255);
    noStroke();
    let sunSize = map(slider.value(), 0, 255, 50, 200);
    let glowSize = sunSize / 5;
    let alpha = map(slider.value(), 0, 255, 50, 150);
    let maxAlpha = 150;
    for (let i = glowSize; i >= 0; i--) {
      let r = sunSize + i;
      let a = map(i, 0, glowSize, maxAlpha, alpha);
      fill(255, 255, 0, a);
      ellipse(width / 2, height / 2, r, r);
    }
    fill(255, 255, 0);
    ellipse(width / 2, height / 2, sunSize, sunSize);
    
    for (let i = 0; i < clouds.length; i++) {
      noStroke();
      fill(255, 255, 255, 200);
      ellipse(clouds[i].x, clouds[i].y, clouds[i].size, clouds[i].size);
      clouds[i].x += asteroid.speed;
      if (clouds[i].x > width + clouds[i].size / 2) {
        clouds[i].x = -clouds[i].size / 2;
        clouds[i].y = random(height / 2);
      }
    }
fill(255);
textAlign(CENTER);
textSize(30);
if (isMoon) {
} else {
  text("Sun", width/2, height/2 + 170);
}
}
 if (isMoon) {
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text("Moon", width/2, height/2 + 170);
} else {
  fill(255);
  textAlign(CENTER);
  textSize(30);
}


}function mouseClicked() {
  if (dist(mouseX, mouseY, width / 2, height / 2) < 100) {
    isMoon = !isMoon;
  }

  // Add a new cloud to the array when the sun is showing
  if (!isMoon) {
    clouds.push({
      x: random(width),
      y: random(height / 2),
      size: random(20, 80),
      speed: random(1, 3)
    });
  }
}