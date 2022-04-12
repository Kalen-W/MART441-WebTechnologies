//--------------------------------------------------------------------------------------------------------------------------------|Variable Section
var screenW = window.innerWidth-1;
var screenH = window.innerHeight-4;
var center = {x: screenW*.5, y: screenH*.5};
var borderWidth = 32;
const tick = 30;
var lastLoopTime = 0;
var pause = false;

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
const colors = {
  "textFill": "#c2e6e7",
  "textStroke": "#15181a",
  "collectibles": ["#539674", "#2bbfbf"],
};

var playerScore = 0;




//--------------------------------------------------------------------------------------------------------------------------------|Actor Class
class Actor {
  constructor(x,y, shapeInfo, speed) {
    this.x = x;
    this.y = y;
    this.angle = halfPi;

    this.shapeStyle = shapeInfo.style;
    this.shape = shapeInfo.type;
    if (shapeInfo.type == 'circle') {
      this.r = shapeInfo.radius;
    } else if (shapeInfo.type == 'rect') {
      this.w = shapeInfo.width;
      this.h = shapeInfo.height;
      this.halfW = shapeInfo.width * 0.5;
      this.halfH = shapeInfo.height * 0.5;
    }

    this.speed = 0;
    this.strafeSpeed = 0;
    this.moveSpeed = speed;
    this.angleMoveSpeed = Math.round(Math.sqrt((this.moveSpeed * this.moveSpeed) / 2) * 1000) / 1000;

    this.tag = 'ai';
  }

  render() {
    context.lineWidth = this.shapeStyle.lw;
    context.strokeStyle = this.shapeStyle.ss;
    context.fillStyle = this.shapeStyle.fs;
    if (this.shape == 'circle') {
      context.beginPath();
      context.arc(this.x,this.y, this.r, 0,twoPi);
      context.fill();
      context.stroke();
    } else if (this.shape == 'rect') {
      context.fillRect(this.x-this.halfW,this.y-this.halfH, this.w,this.h);
      context.strokeRect(this.x-this.halfW,this.y-this.halfH, this.w,this.h);
    }
  }

  movement(timeDelta) {
    return;
  }
}

class ControlledActor extends Actor {
  constructor(x,y, shapeInfo, speed) {
    super(x,y, shapeInfo, speed);
    this.tag = 'player';
  }

  movement(timeDelta) {
    this.angle = roundRadian(this.angle);

    var mul = timeDelta / tick;
    var moveStep = mul * this.speed;
    var strafeStep = mul * this.strafeSpeed;
    const strafeAngle = roundRadian(this.angle - halfPi);
    var newX = this.x;
    var newY = this.y;

    newX += Math.cos(this.angle) * moveStep;
    newY -= Math.sin(this.angle) * moveStep;
    newX += Math.cos(strafeAngle) * strafeStep;
    newY -= Math.sin(strafeAngle) * strafeStep;

    if (newX < borderWidth + this.r || newX > screenW - borderWidth - this.r || newY < borderWidth + this.r || newY > screenH - borderWidth - this.r) { return; }
    if (this.collisionCheck(newX, newY)) { return; }
    this.x = Math.round(newX);
    this.y = Math.round(newY);
  }

  collectibleEvent() {
    playerScore += 1;
  }

  collisionCheck(x, y) {
    var newX = x;
    var newY = y;
    // i starts at 1 to skip over the player, which will always be at index 0.
    for (var i=1; i<actors.length; i++) {
      var actor = actors[i];
      if (actor.shape == 'circle' && distance(x,y, actor.x,actor.y) < this.r + actor.r) {
        return true;
      } else if (actor.shape == 'rect') {
        if (x >= actor.x - actor.halfW && x <= actor.x + actor.halfW) {
          if (y < actor.y && y + this.r > actor.y - actor.halfH) {
            // newY = actor.y - actor.halfH - this.r;
            return true;
          } else if (y > actor.y && y - this.r < actor.y + actor.halfH) {
            // newY = actor.y + actor.halfH + this.r;
            return true;
          }
        }
        if (y >= actor.y - actor.halfH && y <= actor.y + actor.halfH) {
          if (x < actor.x && x + this.r > actor.x - actor.halfW) {
            // newX = actor.x - actor.halfW - this.r;
            return true;
          } else if (x > actor.x && x - this.r < actor.x + actor.halfW) {
            // newX = actor.x + actor.halfW + this.r;
            return true;
          }
        }
      }
    }
    return false;
  }
}

// var player = new ControlledActor(center.x,center.y, {type: 'circle', radius: 20, style: {lw: 2, ss: '#0d0e13', fs: '#63b1a3'}}, 12);
var player;
var actors = [player];




//--------------------------------------------------------------------------------------------------------------------------------|Collectible Class
const collectibleDefaults = [
  {"r": 16},
  {"r": 12}
];
class Collectible {
  constructor(x,y, type) {
    this.x = x;
    this.y = y;

    this.type = type;
    this.color = colors.collectibles[type];
    this.r = collectibleDefaults[type].r;

    this.minDistCheck = 64;
    this.possibleCollisions = [];
    this.collected = false;
  }

  render() {
    context.lineWidth = 2;
    context.strokeStyle = '#0d0e13';
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x,this.y, this.r, 0,twoPi);
    context.fill();
  }

  collectPossibleCollisions() {
    this.possibleCollisions = [];
    for (var i=0; i<actors.length; i++) {
      let actor = actors[i];
      if (Math.abs(this.x - actor.x) > this.minDistCheck) {
        continue;
      } else if (Math.abs(this.y - actor.y) > this.minDistCheck) {
        continue;
      }

      this.possibleCollisions.push(actor);
    }
  }

  collisionCheck() {
    this.collectPossibleCollisions();

    for (var i=0; i<this.possibleCollisions.length; i++) {
      var actor = this.possibleCollisions[i];
      if (actor.shape == 'circle' && distance(this.x,this.y, actor.x,actor.y) < this.r + actor.r) {
        actor.collectibleEvent();
        bgSwitch();
        this.collected = true;
      }
    }
  }
}




//--------------------------------------------------------------------------------------------------------------------------------|JSON Fetching
var actorData;
function getJsonData(link) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      actorData = JSON.parse(this.responseText);
      // console.log(this.responseText);

      initActorsArray();

      // setTimeout(init, 10);
      getJsonData2('./jsonFiles/collectibleData.json');
    }
  };

  xhttp.open('GET', link, true)
  xhttp.send();
}
getJsonData('./jsonFiles/actorData.json');

function initActorsArray() {
  player = new ControlledActor(center.x,center.y, actorData.player.shapeInfo, actorData.player.speed);
  actors = [player];

  for (var key in actorData) {
    if (!actorData.hasOwnProperty(key) || key == 'player') { continue; }
    // console.log(key, actorData[key]);

    for (var i=0; i<actorData[key].length; i++) {
      // console.log(actorData[key][i]);
      let actor = actorData[key][i];

      // Assign random values to x/y if they have "random" as their values.
      if (actor.x == "random") {
        var x = Math.floor(Math.random() * (screenW - borderWidth * 2) + borderWidth);
      } else {
        var x = actor.x;
      }
      if (actor.y == "random") {
        var y = Math.floor(Math.random() * (screenH - borderWidth * 2) + borderWidth);
      } else {
        var y = actor.y;
      }

      actors.push(new Actor(x,y, actor.shapeInfo, actor.speed));
    }
  }
}


var collectibleData;
function getJsonData2(link) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      collectibleData = JSON.parse(this.responseText);
      // console.log(this.responseText);

      initCollectiblesArray();

      setTimeout(init, 10);
    }
  };

  xhttp.open('GET', link, true)
  xhttp.send();
}

var collectibles = [];
function initCollectiblesArray() {
  for (var key in collectibleData) {
    if (!collectibleData.hasOwnProperty(key)) { continue; }
    // console.log(key, collectibleData[key]);

    for (var i=0; i<collectibleData[key].length; i++) {
      // console.log(collectibleData[key][i]);
      let obj = collectibleData[key][i];

      if (key == "type0s") {
        var type = 0;
      } else if (key == "type1s") {
        var type = 1;
      }

      // Assign random values to x/y if they have "random" as their values.
      if (obj.x == "random") {
        var x = Math.floor(Math.random() * (screenW - (borderWidth + collectibleDefaults[type].r) * 2) + (borderWidth + collectibleDefaults[type].r));
      } else {
        var x = obj.x;
      }
      if (obj.y == "random") {
        var y = Math.floor(Math.random() * (screenH - (borderWidth + collectibleDefaults[type].r) * 2) + (borderWidth + collectibleDefaults[type].r));
      } else {
        var y = obj.y;
      }

      collectibles.push(new Collectible(x,y, type));
    }
  }
}


// Tried fetching all json data with one function, but doesn't work, I think due to the function being called
// outside the loop, thus it doesn't reference the correct array index, and I couldn't think of any solution.

/*var retrievedData = [];
function getJsonDataArray() {
  var xhttpLinks = ['./data.json', './data2.json', './data.json'];
  var xhttpRequests = [];

  for (var i=0; i<xhttpLinks.length; i++) {
    console.log(i);
    xhttpRequests[i] = new XMLHttpRequest();
    xhttpRequests[i].onreadystatechange = function(e, i) {
      if (this.readyState == 4 && this.status == 200) {
        // console.log(this);
        console.log(e);
        let data = JSON.parse(this.responseText);
        // console.log(data);
        retrievedData[i] = data;
        // console.log(this.responseText);

        if (ti = xhttpLinks.length) {
          // console.log(i);
          // console.log(retrievedData);
        }
      }
    };
    console.log(xhttpLinks[i]);
    xhttpRequests[i].open('GET', xhttpLinks[i], true)
    xhttpRequests[i].send();
  }
  setTimeout(init, 10);
}*/
//getJsonDataArray();




//--------------------------------------------------------------------------------------------------------------------------------|Functions
function roundRadian(num) {
  return ((num % twoPi) + twoPi) % twoPi;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
}

function bgSwitch() {
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

function renderPauseText() {
  context.font = "32px monospace";
  context.fillStyle = colors.textFill;
  context.lineWidth = 4;
  context.strokeStyle = colors.textStroke;
  context.textAlign = "center";
  context.textBaseline = "top";
  context.strokeText("paused", center.x, 58);
  context.fillText("paused", center.x, 58);
}

function renderScore(overrideText) {
  context.font = "32px monospace";
  context.fillStyle = colors.textFill;
  context.lineWidth = 4;
  context.strokeStyle = colors.textStroke;
  context.textAlign = "left";
  context.textBaseline = "top";

  if (typeof overrideText != 'undefined') {
    var text = overrideText;
  } else {
    var text = "Score: " + playerScore;
  }
  context.strokeText(text, 42, 42);
  context.fillText(text, 42, 42);
}




//--------------------------------------------------------------------------------------------------------------------------------|Initialization
function init() {
  //player = new ControlledActor(center.x,center.y, actorData.player[2], actorData.player[3]);
  gameLoop();
}




//--------------------------------------------------------------------------------------------------------------------------------|Game Loop
function gameLoop() {
  if (pause) {
    renderPauseText();
    return;
  }

  var now = window.performance.now();
  var timeDelta = now - lastLoopTime;

  clearScreen();


  for (var i=0; i<collectibles.length; i++) {
    collectible = collectibles[i];
    collectible.collisionCheck();
    if (collectible.collected) {
      collectibles.splice(i, 1);
      continue;
    }
    collectible.render();
  }

  for (var i=0; i<actors.length; i++) {
    actor = actors[i];
    actor.movement(timeDelta);
    actor.render();
  }


  renderBorder();
  renderScore();


  var cycleDelay = tick;
  if (timeDelta > cycleDelay) {
    cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
  }

  setTimeout(gameLoop, cycleDelay);
  lastLoopTime = now;
}


function clearScreen() {
  context.fillStyle = bgColor;
  context.fillRect(0,0, screenW,screenH);
}


function pauseUpdate(override) {
  if (typeof override == 'boolean') {
    pause = override;
  } else {
    pause = !pause;
  }

  if (!pause) {
    playerMoveCheck();
    lastLoopTime = window.performance.now();
    gameLoop();
  }
  console.log("pause = " + pause);
}




//--------------------------------------------------------------------------------------------------------------------------------|Event Listeners
var keyMap = {};
const controls = {
  move_yNeg: ['w', 'arrowup'],
  move_yPos: ['s', 'arrowdown'],
  move_xNeg: ['a', 'arrowleft'],
  move_xPos: ['d', 'arrowright']
};

onkeydown = onkeyup = function(e) {
  var eKey = e.key.toLowerCase();
  if (controls.move_yNeg.includes(eKey)) {
    keyMap['move_yNeg'] = e.type == 'keydown';
  } else if (controls.move_yPos.includes(eKey)) {
    keyMap['move_yPos'] = e.type == 'keydown';
  } else if (controls.move_xPos.includes(eKey)) {
    keyMap['move_xNeg'] = e.type == 'keydown';
  } else if (controls.move_xNeg.includes(eKey)) {
    keyMap['move_xPos'] = e.type == 'keydown';
  }

  playerMoveCheck();
}

function playerMoveCheck() {
  /*if (keyMap.move_sprint) {
    var moveSpeed = player.sprintSpeed;
    var angleMoveSpeed = player.angleSprintSpeed;
  } else {
    var moveSpeed = player.moveSpeed;
    var angleMoveSpeed = player.angleMoveSpeed;
  }*/
  var moveSpeed = player.moveSpeed;
  var angleMoveSpeed = player.angleMoveSpeed;

  if (keyMap.move_yNeg && keyMap.move_yPos) {
    player.speed = 0;
    if (keyMap.move_xNeg && !keyMap.move_xPos) {
      player.strafeSpeed = moveSpeed;
    } else if (keyMap.move_xPos && !keyMap.move_xNeg) {
      player.strafeSpeed = -moveSpeed;
    } else {
      player.strafeSpeed = 0;
    }
  } else if (keyMap.move_xNeg && keyMap.move_xPos) {
    player.strafeSpeed = 0;
    if (keyMap.move_yNeg && !keyMap.move_yPos) {
      player.speed = moveSpeed;
    } else if (keyMap.move_yPos && !keyMap.move_yNeg) {
      player.speed = -moveSpeed;
    } else {
      player.speed = 0;
    }
  } else if (keyMap.move_yNeg && keyMap.move_xNeg) {
    player.speed = angleMoveSpeed;
    player.strafeSpeed = angleMoveSpeed;
  } else if (keyMap.move_yNeg && keyMap.move_xPos) {
    player.speed = angleMoveSpeed;
    player.strafeSpeed = -angleMoveSpeed;
  } else if (keyMap.move_yPos && keyMap.move_xNeg) {
    player.speed = -angleMoveSpeed;
    player.strafeSpeed = angleMoveSpeed;
  } else if (keyMap.move_yPos && keyMap.move_xPos) {
    player.speed = -angleMoveSpeed;
    player.strafeSpeed = -angleMoveSpeed;
  } else if (keyMap.move_yNeg) {
    player.speed = moveSpeed;
    player.strafeSpeed = 0;
  } else if (keyMap.move_yPos) {
    player.speed = -moveSpeed;
    player.strafeSpeed = 0;
  } else if (keyMap.move_xNeg) {
    player.strafeSpeed = moveSpeed;
    player.speed = 0;
  } else if (keyMap.move_xPos) {
    player.strafeSpeed = -moveSpeed;
    player.speed = 0;
  } else {
    player.speed = 0;
    player.strafeSpeed = 0;
  }
}

document.addEventListener('keyup', (e) => {
  if (e.key == 'Escape') {
    e.preventDefault();
    pauseUpdate();
    if (!pause) { gameLoop(); }
  } else if (e.key == 't') {
    // console.log(actorData);
    console.log(player.x);
    console.log(actors);
  }
});

window.addEventListener('blur', (e) => {
  keyMap = {};
  playerMoveCheck();
  if (!pause) { pauseUpdate(true); }
});
