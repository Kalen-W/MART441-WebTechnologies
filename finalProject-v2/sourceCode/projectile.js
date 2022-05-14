//--------------------------------------------------------------------------------------------------------------------------------|Class - Projectile
class projectile {
  constructor(owner, dmg, s, xOff,yOff) {
    this.owner = owner;
    this.x = owner.x+xOff;
    this.y = owner.y+yOff;
    this.dmg = dmg;
    this.s = s;     // Speed
    this.r = 8;     // Radius
    this.sw = 4;    // Stroke Width
    this.rot = owner.rot;
  }

  update(timeDelta) {
    this.movement(timeDelta);
    this.collisionCheck();
    this.relevancyCheck();
  }

  movement(timeDelta) {
    this.y -= this.s * timeDelta;
  }

  relevancyCheck() {
    if (this.x<-64||this.x>screenW+64||this.y<-128||this.y>screenH+128) {
      // bullets.splice(bullets.indexOf(this), 1);
      bulletsToRemove.push(bullets.indexOf(this));
    }
  }

  collisionCheck() {
    if (this.owner == player) {
      for (var i=0; i<enemies.length; i++) {
        var enemy = enemies[i];

        if (enemy.dead || enemy.i || Math.abs(enemy.x - this.x) > 128) { continue; }

        if ( this.x-this.r < enemy.x+enemy.hbxPos
          && this.x+this.r > enemy.x-enemy.hbxNeg
          && this.y-this.r < enemy.y+enemy.hbyPos
          && this.y+this.r > enemy.y-enemy.hbyNeg
        ) {
          // bullets.splice(bullets.indexOf(this),1);
          bulletsToRemove.push(bullets.indexOf(this));

          // console.log(enemy);

          enemy.damage(this.dmg);

          // if (enemy.h<=0) {
          //   setTimeout(function(){enemies.splice(enemies.indexOf(enemy),1);},enemy.dat);
          //   enemy.playAni[2]=true;
          //   setTimeout(function(){enemy.playAni[1]=true;},enemy.dat/3);
          //   setTimeout(function(){enemy.playAni[0]=true;},enemy.dat/1.5);
          // }
        }
      }
    }
    // else {
    //   for (var i=0; i<enemies.length; i++) {
    //     //
    //   }
    // }
  }

  draw() {
    strokeWeight(this.sw);
    if (this.owner==player) {
      stroke(76,98,130);
      fill(66,128,162);
    } else {
      stroke(158,62,68);
      fill(174,80,64);
    }
    //circle(this.x,this.y,this.r*2-this.sw);
    //rect(this.x-this.r+this.sw/2,this.y-this.r+this.sw/2,this.r*2-this.sw,this.r*2-this.sw/2, 8,8,2,2);
    angleMode(DEGREES);
    translate(this.x,this.y);
    rotate(this.rot);
    rect(-this.r+this.sw/2,-this.r+this.sw/2,this.r*2-this.sw,this.r*2-this.sw/2, 8,8,2,2);
    rotate(-this.rot);
    translate(-this.x,-this.y);
  }
}


var bullets = [];
var bulletsToRemove = [];


function updateBullets(timeDelta) {
  if (bullets.length <= 0) { return; }

  // Sort bulletsToRemove
  bulletsToRemove.sort(function(a,b) {
    return b - a;
  });
  // remove relevant bullets
  for (var i=0; i<bulletsToRemove.length; i++) {
    bullets.splice(bulletsToRemove[i], 1);
  }
  bulletsToRemove = [];

  for (var i=0; i<bullets.length; i++) {
    bullets[i].update(timeDelta);
  }
}


function drawBullets() {
  if (bullets.length <= 0) { return }
  for (var i=0; i<bullets.length; i++) {
    bullets[i].draw();
  }
}
