class BaseEnemy {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
    this.moveAngle = -halfPi;
    this.lookAngle = -halfPi;

    this.collisionSize = 1;
    this.distance;

    //--------------------------------|Stats Section
    this.speed = 0;
    this.strafeSpeed = 0;
    this.moveSpeed = 0.12;
    this.angleMoveSpeed = Math.round(Math.sqrt((this.moveSpeed * this.moveSpeed) / 2) * 1000) / 1000;

    this.health_max = 100;
    this.health = this.health_max;
    this.health_recovery = 0;
    this.armor = 0;
    this.damage = 4;

    this.dead = false;
    this.hitFlashFrames = 0;
  }


  movement(timeDelta) {
    this.moveAngle = roundRadian(this.moveAngle-Math.PI);

    var mul = timeDelta / logicTick;
    var moveStep = mul * this.speed;
    // var strafeStep = mul * this.strafeSpeed;
    // const strafeAngle = roundRadian(-this.moveAngle-halfPi);
    // const strafeAngle = roundRadian(this.moveAngle-halfPi);
    var newX = this.x;
    var newY = this.y;

    newX += Math.cos(this.moveAngle) * moveStep;
    newY += Math.sin(this.moveAngle) * moveStep;
    // newX += Math.cos(strafeAngle) * strafeStep;
    // newY += Math.sin(strafeAngle) * strafeStep;

    // var pos = checkCollision(this.x,this.y, newX,newY, this.hitboxSize);
    // this.x = pos.x;
    // this.y = pos.y;
    this.x = newX;
    this.y = newY;
  }


  ai() {
    if (this.dead) { return; }

    if (this.distance < 128) {
      this.speed = this.moveSpeed;
    } else {
      this.speed = 0;
    }
  }


  hit(damage) {
    if (this.dead) { return; }

    this.health -= damage;
    if (this.health <= 0) {
      this.dead = true;
      this.hitFlashFrames = -20;
    } else {
      this.hitFlashFrames = 12;
    }
  }
}


function spawnEnemies() {
  // var xSpawn = Math.random() * 100 + player.x - 50;
  // var ySpawn = Math.random() * 50 + player.y - 25;
  var xSpawn = Math.random() < 0.5
    ? (Math.random() * 28) + player.x - 80
    : (Math.random() * 28) + player.x + 80;
  var ySpawn = Math.random() < 0.5
    ? (Math.random() * 22) + player.y - 50
    : (Math.random() * 22) + player.y + 50;
  // console.log("Enemy spawn at: " + xSpawn + " - " + ySpawn);
  activeEnemies.push(new BaseEnemy(xSpawn, ySpawn));

  // Reset spawn timer
  // spawnTimer = spawnTimer_duration;
  // Decrease spawn timer duration
  // spawnTimer_duration -= 100;
  // if (spawnTimer_duration < 1000) { spawnTimer_duration += 6000 }
  spawnTimer.duration -= 100;
  if (spawnTimer.duration < 1000) { spawnTimer.duration += 6000 }
}


// var spawnTimer_duration = 6000;
// var spawnTimer = spawnTimer_duration;
spawnTimer = new Timer(2000);


function enemyUpdates(enemies, timeDelta) {
  // Spawn timer
  // if (spawnTimer <= 0) {
  //   spawnEnemies();
  // } else {
  //   spawnTimer -= timeDelta;
  // }
  if (spawnTimer.isFinished(timeDelta)) { spawnEnemies(); }

  // Update enemy ai and movement
  for (var i=0; i<enemies.length; i++) {
    enemy = enemies[i];

    // enemy.distance = distance(player.x,player.y, enemy.x,enemy.y);
    var dx = enemy.x - player.x;
    var dy = enemy.y - player.y;
    enemy.distance = Math.round(Math.sqrt(dx*dx + dy*dy));
    enemy.moveAngle = Math.atan2(dy, dx);

    if (enemy.dead || enemy.distance>256) { continue; }

    if (enemy.distance < player.collisionSize) {
      player.hit(enemy.damage);
    }

    enemy.ai();
    enemy.movement(timeDelta);
  }
}


var activeEnemies = [];
activeEnemies.push(new BaseEnemy(2, 4));
