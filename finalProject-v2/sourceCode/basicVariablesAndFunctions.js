//--------------------------------------------------------------------------------------------------------------------------------|Variables
var paused = false;

var screenW = window.innerWidth-1;
var screenH = window.innerHeight-4;
var screenCenter = {x: screenW*.5, y: screenH*.5}

var score = 0;
var renderHitboxes = false;


//--------------------------------------------------------------------------------------------------------------------------------|Function Section
function keyPressed() {
  menu.controls(keyCode);
  if (keyCode == 66)
  {
    console.log(bullets);
  }
  else if (keyCode == 86)
  {
    console.log(enemies);
  }
  else if (keyCode == 192)
  {
    enemies.push(new enemy(192,128,180));
    let enmyXPos = [];
    for (var i=0; i<enemies.length; i++) {
      enmyXPos.push(enemies[i].x);
    }
    for (var i=128; i<screenW-42; i+=128) {
      if (!enmyXPos.includes(i)) {
        enemies.push(new enemy(i,128,180));
        break;
      }
    }
  }
  else if (keyCode == 49)
  {
    player.gLvl = 0;
  }
  else if (keyCode == 50)
  {
    player.gLvl = 1;
  }
  else if (keyCode == 51)
  {
    player.gLvl = 2;
  }
  else if (keyCode == 72)
  {
    renderHitboxes = !renderHitboxes;
  }
}


function mapMovement(timeDelta = 1) {
  for (var i=0; i<bullets.length; i++) {
    bullets[i].y += 0.2 * timeDelta;
  }
  for (var i=0; i<testBg.objList.length; i++) {
    testBg.objList[i].y += testBg.objList[i].s * timeDelta * 0.8;
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Timer
class Timer {
  constructor(duration) {
    this.time = duration;
    this.duration = duration;
    this.iterations = 0;
  }

  isFinished(timeDelta) {
    if (this.time <= 0) {
      this.time = this.duration;
      this.iterations++;
      return true;
    } else {
      this.time -= timeDelta;
    }
  }
}




//--------------------------------------------------------------------------------------------------------------------------------|Setup & Window Resize
function setup() {
  frameRate(30);

  windowResized();
  menu.update();
}

function windowResized() {
  screenW = window.innerWidth-1;
  screenH = window.innerHeight-4;
  screenCenter = {x: screenW*.5, y: screenH*.5}

  canvas = createCanvas(screenW, screenH);
  canvas.position(0, 0, 'absolute');
  canvas.style("display", "block");
  canvas.style("z-index", "-1");

  player.x = screenCenter.x;
  player.y = screenCenter.y;
}


//--------------------------------------------------------------------------------------------------------------------------------|Draw Function
function draw() {
  if (!paused && !player.dead) {
    player.update(deltaTime);
    updateEnemies(deltaTime);
    updateBullets(deltaTime);
    testBg.update(deltaTime);

    mapMovement(deltaTime);

    background(44,46,50);

    drawBgObjs(testBg);
    drawEnemies();
    drawBullets();
    player.draw();

    textSize(52);
    textAlign(LEFT, BOTTOM);
    fill(152, 66, 58);
    stroke(214, 220, 228);
    strokeWeight(2);
    text(player.h, 22,screenH-4);

    fill(130, 206, 210);
    textAlign(LEFT, TOP);
    text(score, 22,22);

  } else if (player.dead) {
    textSize(144);
    textAlign(CENTER, CENTER);
    fill(196, 38, 36);
    stroke(18, 16, 12);
    strokeWeight(22);
    text("Game Over", screenCenter.x,screenCenter.y);
  }
}
