class projectile {
  constructor(owner,s,xOff,yOff) {
    this.owner = owner;
    this.x = owner.x+xOff;
    this.y = owner.y+yOff;
    this.s = s;     // Speed
    this.r = 8;     // Radius
    this.sw = 4;    // Stroke Width
    this.rot = owner.rot;
  }

  update() {
    this.movement();
    this.collisionCheck();
    this.relevancyCheck();
  }

  movement() {
    this.y-=this.s;
  }

  relevancyCheck() {
    if (this.x<-64||this.x>width+64||this.y<-128||this.y>height+128) {
      bullets.splice(bullets.indexOf(this),1);
    }
  }

  collisionCheck() {
    if (this.owner == player) {
      for (var i=0; i<enemies.length; i++) {
        var enemy = enemies[i];
        if (enemy.h>0&&!enemy.i && this.x-this.r<enemy.x+enemy.hbxPos && this.x+this.r>enemy.x-enemy.hbxNeg && this.y-this.r<enemy.y+enemy.hbyPos && this.y+this.r>enemies[i].y-enemies[i].hbyNeg) {
          bullets.splice(bullets.indexOf(this),1);
          console.log(enemy);
          enemy.i = true;
          enemy.hit();
          var enemy = enemy;
          setTimeout(function(){enemy.c=enemy.cd;},enemy.it);
          setTimeout(function(){enemy.i=false;},enemy.it);
          if (enemy.h<=0) {
            setTimeout(function(){enemies.splice(enemies.indexOf(enemy),1);},enemy.dat);
            setTimeout(function(){enemy.playAni[1]=true;},enemy.dat/3);
            setTimeout(function(){enemy.playAni[0]=true;},enemy.dat/1.5);
          }
        }
      }
    } else {
      // for (var i=0; i<enemies.length; i++) {
      //   //
      // }
    }
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


class BaseWeapon {
  constructor() {

  }

  shoot() {
    //bullets[bullets.length] = new projectile(player,player.sBlt,0,-32);
    if (player.gLvl==2) {
      bullets.push(new projectile(player,player.sBlt,24,-20));
      bullets.push(new projectile(player,player.sBlt,0,-36));
      bullets.push(new projectile(player,player.sBlt,-24,-20));
    } else if (player.gLvl==1) {
      bullets.push(new projectile(player,player.sBlt,18,-24));
      bullets.push(new projectile(player,player.sBlt,-18,-24));
    } else {
      bullets.push(new projectile(player,player.sBlt,0,-32));
    }
  }
}

var bullets = [];
