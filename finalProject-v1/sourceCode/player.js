//--------------------------------------------------------------------------------------------------------------------------------|Player Section
class PlayerClass {
  constructor() {
    // this.x = cellSize * 13;
    // this.y = cellSize * 19.5;
    this.x = center.x/cellSize;
    this.y = center.y/cellSize;
    this.angle = -halfPi;

    this.collisionSize = 1;

    //--------------------------------|Stats Section
    this.speed = 0;
    this.strafeSpeed = 0;
    // this.moveSpeed = 1.14 * cellSize;
    this.moveSpeed = 0.34;
    this.angleMoveSpeed = Math.round(Math.sqrt((this.moveSpeed * this.moveSpeed) / 2) * 1000) / 1000;

    this.health_max = 100;
    this.health = this.health_max;
    this.health_recovery = 0;
    this.armor = 0;

    this.dead = false;

    this.inventory = [];
  }

  movement(timeDelta) {
    this.angle = roundRadian(this.angle);

    var mul = timeDelta / logicTick;
    var moveStep = mul * this.speed;
    var strafeStep = mul * this.strafeSpeed;
    const strafeAngle = roundRadian(this.angle-halfPi);
    var newX = this.x;
    var newY = this.y;

    newX += Math.cos(this.angle) * moveStep;
    newY += Math.sin(this.angle) * moveStep;
    newX += Math.cos(strafeAngle) * strafeStep;
    newY += Math.sin(strafeAngle) * strafeStep;

    // var pos = checkCollision(this.x,this.y, newX,newY, this.collisionSize);
    // this.x = pos.x;
    // this.y = pos.y;
    this.x = newX;
    this.y = newY;
  }


  hit(damage) {
    if (this.dead) { return; }

    this.health -= Math.max((damage - this.armor), 0);
    if (this.health <= 0) {
      this.dead = true;
    }
  }
}
const player = new PlayerClass();




//--------------------------------------------------------------------------------------------------------------------------------|Collision Functions
function outOfMapBounds(x, y) {
  return x < 0 || x >= mapWidth || y < 0 || y >= mapHeight;
}


function collidesWithMap(x, y) {
  // x = Math.floor(x/cellSize);
  // y = Math.floor(y/cellSize);
  if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) { return true; }
  x = Math.floor(x);
  y = Math.floor(y);
  // if (currentMap[y][x] != 0) { return true; }
  // if (spriteMap[y][x] && spriteMap[y][x].block) { return true; }
  return false;
  //return x < 0 || x >= mapWidth || y < 0 || y >= mapHeight || currentMap[y][x] != 0 || (spriteMap[y][x] && spriteMap[y][x].block);
}


function checkCollision(fromX,fromY, toX,toY, radius) {
  // var pos = { x: fromX/cellSize, y: fromY/cellSize };
  // var toX = toX / cellSize;
  // var toY = toY / cellSize;
  var pos = { x: fromX, y: fromY };
  var toX = toX;
  var toY = toY;

  if (toY<0 || toY>=mapHeight || toX<0 || toX>=mapWidth) { return pos; }

  var blockX = Math.floor(toX);
  var blockY = Math.floor(toY);

  if (collidesWithMap(blockX,blockY)) {
    /*
    if (!collidesWithMap(blockX-1,blockY)) { // if cell to left == 0
      return {x: (blockX-radius), y: pos.y};
    }
    if (!collidesWithMap(blockX-1,blockY-1)) { // if cell to top-left == 0
      return {x: (blockX-radius), y: (blockY-radius)};
    }
    if (!collidesWithMap(blockX,blockY-1)) { // if cell to top == 0
      return {x: pos.x, y: (blockY-radius)};
    }
    if (!collidesWithMap(blockX+1,blockY-1)) { // if cell to top-right == 0
      return {x: (blockX+1+radius), y: (blockY-radius)};
    }
    if (!collidesWithMap(blockX+1,blockY)) { // if cell to right == 0
      return {x: (blockX+1+radius), y: pos.y};
    }
    if (!collidesWithMap(blockX+1,blockY+1)) { // if cell to bottom-right == 0
      return {x: (blockX+1+radius), y: (blockY+1+radius)};
    }
    if (!collidesWithMap(blockX,blockY+1)) { // if cell to bottom == 0
      return {x: pos.x, y: (blockY+1+radius)};
    }
    if (!collidesWithMap(blockX-1,blockY+1)) { // if cell to bottom-left == 0
      return {x: (blockX-radius), y: (blockY+1+radius)};
    }
    */
    // return {x: pos.x*cellSize, y: pos.y*cellSize};
    return {x: pos.x, y: pos.y};
  }

  pos.x = toX;
  pos.y = toY;
  var blockTop = collidesWithMap(blockX,blockY-1);
  var blockBottom = collidesWithMap(blockX,blockY+1);
  var blockLeft = collidesWithMap(blockX-1,blockY);
  var blockRight = collidesWithMap(blockX+1,blockY);

  if (blockTop != 0 && toY-blockY < radius) { toY = pos.y = blockY + radius; }
  if (blockBottom != 0 && blockY+1-toY < radius) { toY = pos.y = blockY + 1 - radius; }
  if (blockLeft != 0 && toX-blockX < radius) { toX = pos.x = blockX + radius; }
  if (blockRight != 0 && blockX+1-toX < radius) { toX = pos.x = blockX + 1 - radius; }

  // is tile to the top-left a wall
  if (collidesWithMap(blockX-1,blockY-1) != 0 && !(blockTop != 0 && blockLeft != 0)) {
    var dx = toX - blockX;
    var dy = toY - blockY;
    if (dx*dx+dy*dy < radius*radius) {
      if (dx*dx > dy*dy) {
        toX = pos.x = blockX + radius;
      } else {
        toY = pos.y = blockY + radius;
      }
    }
  }
  // is tile to the top-right a wall
  if (collidesWithMap(blockX+1,blockY-1) != 0 && !(blockTop != 0 && blockRight != 0)) {
		var dx = toX - (blockX+1);
		var dy = toY - blockY;
		if (dx*dx+dy*dy < radius*radius) {
			if (dx*dx > dy*dy) {
				toX = pos.x = blockX + 1 - radius;
			} else {
				toY = pos.y = blockY + radius;
      }
		}
	}
	// is tile to the bottom-left a wall
	if (collidesWithMap(blockX-1,blockY+1) != 0 && !(blockBottom != 0 && blockLeft != 0)) {
		var dx = toX - blockX;
		var dy = toY - (blockY+1);
		if (dx*dx+dy*dy < radius*radius) {
			if (dx*dx > dy*dy) {
				toX = pos.x = blockX + radius;
			} else {
				toY = pos.y = blockY + 1 - radius;
      }
		}
	}
	// is tile to the bottom-right a wall
	if (collidesWithMap(blockX+1,blockY+1) != 0 && !(blockBottom != 0 && blockRight != 0)) {
		var dx = toX - (blockX+1);
		var dy = toY - (blockY+1);
		if (dx*dx+dy*dy < radius*radius) {
			if (dx*dx > dy*dy) {
				toX = pos.x = blockX + 1 - radius;
			} else {
				toY = pos.y = blockY + 1 - radius;
      }
		}
	}

  // pos.x *= cellSize;
  // pos.y *= cellSize;
  return pos;
}




//--------------------------------------------------------------------------------------------------------------------------------|Event Listeners
document.addEventListener('keydown', (e) => {
  if (e.key == 'Tab') {
    e.preventDefault();
  }

  if (e.key == 't') {
    console.log("Player X: " + player.x + " | Y: " + player.y);
  }
});


document.addEventListener('keyup', (e) => {
  if ((e.key == "Tab" || e.key == "Escape")) {
  // if ((e.key == "Tab" || e.key == "Escape") && gameInitiated) {
    pauseUpdate();
  }
});


// keyMap based off code from: https://stackoverflow.com/a/12444641
var keyMap = {};
onkeydown = onkeyup = function(e) {
  var eKey = e.key.toLowerCase();
  if (Object.values(controlKeys).includes(eKey)) {
    keyMap[Object.keys(controlKeys).find(key => controlKeys[key] === eKey)] = e.type == 'keydown';
  }

  //console.log(keyMap);
  if (!pause) { playerMoveCheck(); }
}


function playerMoveCheck() {
  if (keyMap.move_sprint) {
    var moveSpeed = player.sprintSpeed;
    var angleMoveSpeed = player.angleSprintSpeed;
  } else {
    var moveSpeed = player.moveSpeed;
    var angleMoveSpeed = player.angleMoveSpeed;
  }

  if (keyMap.move_yNeg && keyMap.move_yPos)
  {
    player.speed = 0;
    if (keyMap.move_xNeg && !keyMap.move_xPos) {
      player.strafeSpeed = moveSpeed;
    } else if (keyMap.move_xPos && !keyMap.move_xNeg) {
      player.strafeSpeed = -moveSpeed;
    } else {
      player.strafeSpeed = 0;
    }
  }
  else if (keyMap.move_xNeg && keyMap.move_xPos)
  {
    player.strafeSpeed = 0;
    if (keyMap.move_yNeg && !keyMap.move_yPos) {
      player.speed = moveSpeed;
    } else if (keyMap.move_yPos && !keyMap.move_yNeg) {
      player.speed = -moveSpeed;
    } else {
      player.speed = 0;
    }
  }
  else if (keyMap.move_yNeg && keyMap.move_xNeg)
  {
    player.speed = angleMoveSpeed;
    player.strafeSpeed = angleMoveSpeed;
  }
  else if (keyMap.move_yNeg && keyMap.move_xPos)
  {
    player.speed = angleMoveSpeed;
    player.strafeSpeed = -angleMoveSpeed;
  }
  else if (keyMap.move_yPos && keyMap.move_xNeg)
  {
    player.speed = -angleMoveSpeed;
    player.strafeSpeed = angleMoveSpeed;
  }
  else if (keyMap.move_yPos && keyMap.move_xPos)
  {
    player.speed = -angleMoveSpeed;
    player.strafeSpeed = -angleMoveSpeed;
  }
  else if (keyMap.move_yNeg)
  {
    player.speed = moveSpeed;
    player.strafeSpeed = 0;
  }
  else if (keyMap.move_yPos)
  {
    player.speed = -moveSpeed;
    player.strafeSpeed = 0;
  }
  else if (keyMap.move_xNeg)
  {
    player.strafeSpeed = moveSpeed;
    player.speed = 0;
  }
  else if (keyMap.move_xPos)
  {
    player.strafeSpeed = -moveSpeed;
    player.speed = 0;
  }
  else
  {
    player.speed = 0;
    player.strafeSpeed = 0;
  }
}


document.addEventListener('contextmenu', (e) => {
  // Prevents right mouse click context menu.
  e.preventDefault();
});


window.addEventListener('blur', (e) => {
  // console.log("window blur event");
  // Insures player won't continue moving if a key is held when window losses focus.
  // Also pauses game if it isn't already.
  keyMap = {};
  playerMoveCheck();
  if (!pause) { pauseUpdate(); }
});
