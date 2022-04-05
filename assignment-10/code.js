//--------------------------------------------------------------------------------------------------------------------------------|Variable Section
var screenW = window.innerWidth-1;
var screenH = window.innerHeight-4;
var center = {x: screenW*.5, y: screenH*.5};
var borderWidth = 32;
const tick = 30;

const quarterPi = Math.PI * 0.25;
const halfPi = Math.PI * 0.5;
const twoPi = Math.PI * 2;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", screenW);
canvas.setAttribute("height", screenH);
canvas.setAttribute("z-index", "-2");
canvas.style.position = "absolute";
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);
const context = canvas.getContext("2d",  { alpha: false });

var bgColor = 'rgb(34, 34, 34)';


//--------------------------------------------------------------------------------------------------------------------------------|Paddle Class
class Paddle {
  constructor(x,y, width,height, speed, ai) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.halfWidth = width * 0.5;
    this.halfHeight = height * 0.5;
  }

  render() {
    context.lineWidth = 2;
    context.strokeStyle = '#0d0e13';
    context.fillStyle = '#63b1a3';
    context.fillRect(this.x-this.halfWidth,this.y-this.halfHeight, this.width,this.height);
  }

  collisionEvent() {
    var newHeight = this.height + Math.floor(Math.random() * 64 - 30);

    if (newHeight >= center.y || newHeight <= 16) { return; }

    this.height = newHeight;
    this.halfHeight = this.height * 0.5;
  }
}

class ControlledPaddle extends Paddle {
  constructor(x,y, width,height, speed) {
    super(x,y, width,height, speed);
  }

  movement() {
    if ((keyMap.up && keyMap.down) || (!keyMap.up && !keyMap.down)) { return; }
    if (keyMap.up && this.y-this.halfHeight-this.speed > borderWidth) { this.y -= this.speed; }
    if (keyMap.down && this.y+this.halfHeight+this.speed < screenH-borderWidth) { this.y += this.speed; }
  }
}

class AiPaddle extends Paddle {
  constructor(x,y, width,height, speed) {
    super(x,y, width,height, speed);
  }

  movement() {
    var newY = this.y + this.speed;
    if (newY-this.halfHeight-this.speed < borderWidth) {
      this.y = borderWidth+this.halfHeight;
      this.speed *= -1;
      return;
    }
    if (newY+this.halfHeight+this.speed > screenH-borderWidth) {
      this.y = screenH-borderWidth-this.halfHeight;
      this.speed *= -1;
      return;
    }

    if (Math.random() < 0.03) {
      this.speed *= -1;
    }

    this.y = newY;
  }
}

var playerPaddle = new ControlledPaddle(borderWidth+32,center.y, 20,160, 22);
var paddles = [
  playerPaddle,
  new AiPaddle(screenW-borderWidth-32, center.y, 20,160, 16)
];


//--------------------------------------------------------------------------------------------------------------------------------|Ball Class
class Ball {
  constructor(x,y, radius, angle, baseSpeed) {
    this.x = x;
    this.y = y;
    this.r = radius;
    this.baseSpeed = baseSpeed;
    this.speed = baseSpeed;
    this.accel = 1;
    this.angle = angle;
  }

  render() {
    context.lineWidth = 2;
    context.strokeStyle = '#0d0e13';
    context.fillStyle = '#63b1a3';
    context.beginPath();
    context.arc(this.x,this.y, this.r, 0, twoPi);
    context.fill();
  }

  update() {
    var newX = this.x;
    var newY = this.y;
    newX += Math.cos(this.angle) * this.speed;
    newY -= Math.sin(this.angle) * this.speed;

    // Screen edge collision bounce
    if (newX + this.r > screenW - borderWidth) {
      newX = screenW - this.r - borderWidth;
      this.angle = Math.PI - this.angle;
    } else if (newX - this.r < borderWidth) {
      newX = this.r + borderWidth;
      this.angle = Math.PI - this.angle;
    }
    if (newY + this.r > screenH - borderWidth) {
      newY = screenH - this.r - borderWidth;
      this.angle *= -1;
    } else if (newY - this.r < borderWidth) {
      newY = this.r + borderWidth;
      this.angle *= -1;
    }

    // Paddle collision bounce
    for (var i=0; i<paddles.length; i++) {
      let paddle = paddles[i]
      if (!(newX+this.r > paddle.x-paddle.width) && !(newX-this.r < paddle.x+paddle.width) && !(newY+this.r > paddle.y-paddle.height) && !(newY-this.r < paddle.y+paddle.height)) {
        continue;
      }

      if (newY >= paddle.y - paddle.halfHeight && newY <= paddle.y + paddle.halfHeight) {
        if (newX < paddle.x && newX + this.r > paddle.x - paddle.halfWidth) {
          newX = paddle.x - paddle.halfWidth - this.r;
          this.angle = Math.PI - this.angle;
          this.collisionEvent(paddle);
        } else if (newX > paddle.x && newX - this.r < paddle.x + paddle.halfWidth) {
          newX = paddle.x + paddle.halfWidth + this.r;
          this.angle = Math.PI - this.angle;
          this.collisionEvent(paddle);
        }
      }

      if (newX >= paddle.x - paddle.halfWidth && newX <= paddle.x + paddle.halfWidth) {
        if (newY < paddle.y && newY + this.r > paddle.y - paddle.halfHeight) {
          newY = paddle.y - paddle.halfHeight - this.r;
          this.angle *= -1;
          this.collisionEvent(paddle);
        } else if (newY > paddle.y && newY - this.r < paddle.y + paddle.halfHeight) {
          newY = paddle.y + paddle.halfHeight + this.r;
          this.angle *= -1;
          this.collisionEvent(paddle);
        }
      }
    }

    this.angle = roundRadian(this.angle);

    this.x = newX;
    this.y = newY;
  }

  collisionEvent(paddle) {
    if (this.speed < 40) { this.speed += this.accel; }
    bgSwitch();
    paddle.collisionEvent();
  }
}

var balls = [
  new Ball(center.x,center.y, 28, Math.PI*0.3, 14),
  new Ball(center.x*1.5,center.y, 28, Math.PI*1.2, 10)
];


//--------------------------------------------------------------------------------------------------------------------------------|Functions
function roundRadian(num) {
  return ((num % twoPi) + twoPi) % twoPi;
}

function bgSwitch() {
  /*
  var rand = Math.floor(Math.random() * bgColors.length);
  while (rand == bgColor) { // Not ideal
    rand = Math.floor(Math.random() * bgColors.length);
  }
  bgColor = bgColors[rand];
  */
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  bgColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function renderBorder() {
  context.fillStyle = '#58585888';
  context.fillRect(0,0, screenW,borderWidth);
  context.fillRect(0,screenH, screenW,-borderWidth);

  context.fillRect(0,borderWidth, borderWidth,screenH-2*borderWidth);
  context.fillRect(screenW,borderWidth, -borderWidth,screenH-2*borderWidth);
}


//--------------------------------------------------------------------------------------------------------------------------------|Initialization
function init() {
  gameLoop();
}


//--------------------------------------------------------------------------------------------------------------------------------|Game Loop
function gameLoop() {
  clearScreen();

  for (var i=0; i<paddles.length; i++) {
    paddle = paddles[i];
    paddle.render();
    paddle.movement();
  }

  for (var i=0; i<balls.length; i++) {
    ball = balls[i];
    ball.update();
    ball.render();
  }

  renderBorder();

  setTimeout(gameLoop, 30);
}

function clearScreen() {
  context.fillStyle = bgColor;
  context.fillRect(0,0, screenW,screenH);
}


//--------------------------------------------------------------------------------------------------------------------------------|Event Listeners
var keyMap = {'up': false, 'down': false};
var validUpKeys = ['w', 'arrowup'];
var validDownKeys = ['s', 'arrowdown'];

onkeydown = onkeyup = function(e) {
  var eKey = e.key.toLowerCase();
  if (validUpKeys.includes(eKey)) {
    keyMap['up'] = e.type == 'keydown';
  } else if (validDownKeys.includes(eKey)) {
    keyMap['down'] = e.type == 'keydown';
  }
}

document.onwheel = (e) => {
  if (e.deltaY < 0 && playerPaddle.y-playerPaddle.halfHeight-playerPaddle.speed <= borderWidth) { return; }
  if (e.deltaY > 0 && playerPaddle.y+playerPaddle.halfHeight+playerPaddle.speed >= screenH-borderWidth) { return; }

  playerPaddle.y = e.deltaY < 0
    ? playerPaddle.y - playerPaddle.speed
    : playerPaddle.y + playerPaddle.speed;

  /*if (e.deltaY < 0) {
    keyMap.up = true;
    keyMap.down = false;
  } else if (e.deltaY > 0) {
    keyMap.up = false;
    keyMap.down = true;
  } else {
    keyMap.up = false;
    keyMap.down = false;
  }*/
};


setTimeout(init(), 5)
