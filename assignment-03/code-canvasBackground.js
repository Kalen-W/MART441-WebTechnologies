//--------------------------------------------------------------------------------------------------------------------------------|Variable & Setup Section
var screenW = window.innerWidth-1;
var screenH = window.innerHeight-4;

const tick = 20;

const canvas = document.createElement("canvas");
canvas.setAttribute("position", "absolute");
canvas.setAttribute("width", screenW);
canvas.setAttribute("height", screenH);
document.body.appendChild(canvas)
const context = canvas.getContext("2d",  { alpha: false });


var colors = {
  background: "#262628",
  bgOpacity: "ff",
  color1: "#6098aa",
  color2: "#24b6d6"
};

var points = [];
//var pointAmount = 64;
var pointAmount = Math.floor((screenW*screenH)/16000);
var currentShape = "circle";


generatePointsArray(currentShape);
setInterval(animationLoop, tick);


//--------------------------------------------------------------------------------------------------------------------------------|Basic Functions
function clearScreen() {
  context.fillStyle = colors.background + colors.bgOpacity;
  context.fillRect(0, 0, screenW, screenH);
}

function animationLoop() {
  clearScreen();
  //circle(600, 600, 200, 64);
  //triangle(800, 600, 200, 128, 2);
  floatPoints(currentShape);
}

function toHex(dec) {
  dec = Math.floor(parseFloat(dec));
  if (dec<10) {
    return "0" + dec;
  } else if (dec<16 && dec>=10) {
    return "0" + dec.toString(16);
  } else {
    return dec.toString(16);
  }
}

function decRound(num, decPoints) {
  return Math.floor(num*10**decPoints)/10**decPoints;
}


//--------------------------------------------------------------------------------------------------------------------------------|Basic Shape Functions
function circle(xCenter, yCenter, radius, opacity) {
  context.fillStyle = colors.color2 + toHex(opacity);
  context.beginPath();
  context.arc(xCenter, yCenter, radius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
}

function triangle(xCenter, yCenter, radius, opacity, rotation)  {
  context.fillStyle = colors.color1 + toHex(opacity);
  rotation *= Math.PI;
  var angle = [rotation, rotation + (1/3)*(2*Math.PI), rotation + (2/3)*(2*Math.PI)]

  context.beginPath();
  context.moveTo(radius * Math.cos(angle[0]) + xCenter, radius * Math.sin(angle[0]) + yCenter);
  context.lineTo(radius * Math.cos(angle[1]) + xCenter, radius * Math.sin(angle[1]) + yCenter);
  context.lineTo(radius * Math.cos(angle[2]) + xCenter, radius * Math.sin(angle[2]) + yCenter);
  context.fill();
  context.closePath();
}


//--------------------------------------------------------------------------------------------------------------------------------|Floating Shape
function generatePoint(shape) {
  if (shape == "circle") {
    return [
      Math.random()*screenW,
      Math.random()*screenH,
      Math.random()*10+2,
      0,
      Math.floor(Math.random()*119+1),
      Math.random()*2,
      Math.random()*.6-.3
    ];
  } else if (shape == "triangle") {
    return [
      Math.random()*screenW,
      Math.random()*screenH,
      Math.random()*128+16,
      0,
      Math.floor(Math.random()*119+1),
      Math.random()*2,
      Math.random()*.8-.4,
      Math.random()*2
    ]; // 0:xCenter, 1:yCenter, 2:radius, 3:opacity, 4:maxOpacity, 5:moveDirection, 6:speed, 7:rotation
  }
}


function generatePointsArray(shape) {
  while (points.length < pointAmount) {
    points.push(generatePoint(shape));
  }
}

function floatPoints(shape) {
  points.forEach((item, i) => {
    if (Math.random()*.8 > Math.random()*8) {
      points[i][5] += (Math.random() * .1 - .05);
      points[i][6] += (Math.random() * .08 - .04);
    }

    points[i][0] += (Math.cos(Math.PI * points[i][5]) * points[i][6]);
    points[i][1] += (Math.sin(Math.PI * points[i][5]) * points[i][6]);

    if (shape == "circle") {
      circle(points[i][0], points[i][1], Math.floor(points[i][2]), points[i][3]);
    } else if (shape == "triangle") {
      triangle(points[i][0], points[i][1], Math.floor(points[i][2]), points[i][3], points[i][7]);
    }

    // replaces point if it's outside the canvas (with .5 extra radius leeway)
    if (points[i][0]+points[i][2]*1.5<0 || points[i][0]-points[i][2]*1.5>screenW || points[i][1]+points[i][2]*1.5<0 || points[i][1]-points[i][2]*1.5>screenH) {
      if (points.length <= pointAmount) {
        points.splice(i, 1, generatePoint(shape));
      } else {
        points.splice(i, 1);
      }
    }

    // fades the object in
    if (points[i][3] < points[i][4]) {
      points[i][3] += 1;
    }

    /*if (points[i][5] > 2) {
      points[i][5] -= 2;
    } else if (points[i][5] < 0) {
      points[i][5] += 2;
    }
    if (points[i][6] > .8) {
      points[i][6] = .8;
    } else if (points[i][6] < -.8) {
      points[i][6] = -.8;
    }
    if (points[i][7] > 2) {
      points[i][7] -= 2;
    } else if (points[i][7] < 0) {
      points[i][7] += 2;
    }*/

    // Loops/limits direction, speed, and rotation
    points[i][5] = decRound(points[i][5]%2, 4);
    points[i][6] = decRound(points[i][6]%1, 4);

    if (shape == "triangle") {
      points[i][7] += points[i][5]*.0004+.0001;
      points[i][7] = decRound(points[i][7]%2, 4);
    }
  });
}


//--------------------------------------------------------------------------------------------------------------------------------|Window Resize Adjust
window.addEventListener('resize', windowSizeChange);

function windowSizeChange() {
  screenW = window.innerWidth-1;
  screenH = window.innerHeight-4;
  canvas.setAttribute("width", screenW);
  canvas.setAttribute("height", screenH);

  pointAmount = Math.floor((screenW*screenH)/16000);
  generatePointsArray(currentShape);
}
