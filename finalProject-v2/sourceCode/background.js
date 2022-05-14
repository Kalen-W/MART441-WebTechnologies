//--------------------------------------------------------------------------------------------------------------------------------|Class - Background Objects
class bgObject {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.s = Math.random() * 0.1 + 0.001; // Speed
    this.rot = Math.floor(Math.random()*360); // Rotation
    this.m = Math.floor(Math.random()*320)/100+.22; // multiplier - size
    this.tint = [
      Math.floor(Math.random() * 128) - 64,
      Math.floor(Math.random() * 128) - 64,
      Math.floor(Math.random() * 128) - 64,
      Math.min((Math.floor(Math.random() * 96) + 4) / this.m, 220)
    ];
    this.typeOps = 2;
    this.type = Math.floor(Math.random()*this.typeOps);
  }

  relevancyCheck(bgClass) {
    if (this.x<-32 || this.x>screenW+32 || this.y>screenH+128) {
      bgClass.objList.splice(bgClass.objList.indexOf(this),1);
    }
  }

  star(t,m,r) {
    m/=2;
    rotate(r);
    strokeWeight(0);
    fill(120+t[0],180+t[1],200+t[2],t[3]+12);
    beginShape();
    vertex(-44*m,0);
    vertex(-22*m,-9*m);
    vertex(-31*m,-31*m);
    vertex(-9*m,-22*m);
    vertex(0,-44*m);
    vertex(9*m,-22*m);
    vertex(31*m,-31*m);
    vertex(22*m,-9*m);
    vertex(44*m,0);
    vertex(22*m,9*m);
    vertex(31*m,31*m);
    vertex(9*m,22*m);
    vertex(0,44*m);
    vertex(-9*m,22*m);
    vertex(-31*m,31*m);
    vertex(-22*m,9*m);
    vertex(-44*m,0);
    endShape();
    rotate(-r);
  }

  star2(t,m) {
    strokeWeight(0);
    fill(t[0]*4,t[1]*4,t[2]*4,t[3]+12);
    for (var i=0; i<8; i++) {
      rect(-16*m,-1*m,32*m,2*m);
      rotate(22.5);
    }
    rotate(-180);
  }

  draw() {
    angleMode(DEGREES);
    translate(this.x,this.y);
    rotate(this.rot);
    if (this.type == 0) {
      this.star([this.tint[0]-30, this.tint[1]-60, this.tint[2]-40, this.tint[3]-4], this.m*.9, 22.5);
      this.star(this.tint, this.m, 0);
    } else if (this.type == 1) {
      this.star2(this.tint, this.m);
    }
    rotate(-this.rot);
    translate(-this.x,-this.y);
  }
}

class bgDecor {
  constructor() {
    this.objList = [];
    for (var i=0; i<=screenW; i+=128) {
      for (var z=Math.floor(screenH/128)*128; z>=-4096; z-=128) {
        var randNum = Math.floor(Math.random() * 16);
        if (randNum <= 0.88) {
          this.objList.push(new bgObject(i, z));
        }
      }
    }

    this.spawnTimer = new Timer(1024);
  }

  update(timeDelta) {
    if (this.spawnTimer.isFinished(timeDelta)) {
      var spawnAmount = Math.floor(Math.random() * 2);

      for (var i=0; i<spawnAmount; i++) {
        var spawnX = Math.random() * (screenW + 32) - 16;
        var spawnY = Math.random() * screenH - screenH - 64;

        this.objList.push(new bgObject(spawnX, spawnY));
      }

      // randomize timer duration
      this.spawnTimer.duration = Math.floor(Math.random() * 1280) + 256;
    }
  }

  draw() {
    for (var i=0; i<this.objList.length; i++) {
      if (this.objList[i] != 0) {
        this.objList[i].draw();
      }
    }
  }
}


function drawBgObjs(bgClass) {
  for (var i=0; i<bgClass.objList.length; i++) {
    bgClass.objList[i].draw();
    bgClass.objList[i].relevancyCheck(bgClass);
  }
}


var testBg = new bgDecor();
