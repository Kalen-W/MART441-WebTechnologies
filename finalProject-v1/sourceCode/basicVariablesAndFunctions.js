//--------------------------------------------------------------------------------------------------------------------------------|Variable Section
var screenW = window.innerWidth-1;
var screenH = window.innerHeight-4;
var center = {x: screenW*.5, y: screenH*.5}

var options = {
  overlayElements: true,
  fullscreen: false,
  fontSize: Math.floor(screenW * 0.022),
};
//Object.entries(options).forEach((item, i) => { console.log(item); });

var colors = {
  wallDefault: "#282828",
  floorTop: "#323d3a",
  floorBottom: "#4b544d",
  ceilingTop: "#a5cbe3",
  ceilingBottom: "#829ec1",
  wall: "#309db4",
  wallDark: "#406068",
  overlayTextFill: "#1a1a1a",
  overlayTextStroke: "#b8b8b8",
}




//--------------------------------------------------------------------------------------------------------------------------------|Mathmatical Constant Variables
const cellSize = 20;
const textureRez = 64;              // standard texture pixel resolution (assumes square textures)
const twoPi = Math.PI * 2;
const halfPi = Math.PI * 0.5;




//--------------------------------------------------------------------------------------------------------------------------------|Control Variables
var gameInitiated = false;
var pause = true;

var controlDefaults = {
  move_yNeg: 'w',
  move_xNeg: 'a',
  move_yPos: 's',
  move_xPos: 'd',
};

var controlKeys = {
  move_yNeg: 'w',
  move_xNeg: 'a',
  move_yPos: 's',
  move_xPos: 'd',
};




//--------------------------------------------------------------------------------------------------------------------------------|Loop Variables
var fps = 0;
const logicTick = 40;       // ~25 fps
var lastLogicLoopTime = 0;
var totalLogicTicks = 0;
const renderTick = 40;
var lastRenderLoopTime = 0;
//var totalRenderTicks = 0;




//--------------------------------------------------------------------------------------------------------------------------------|Canvas Declaration
const canvas = document.createElement("canvas");
canvas.setAttribute("width", screenW);
canvas.setAttribute("height", screenH);
// canvas.setAttribute("width", 1024);
// canvas.setAttribute("height", 1024);
canvas.setAttribute("z-index", "-2");
canvas.style.position = "absolute";
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);
// const context = canvas.getContext("2d",  { alpha: false });
const context = canvas.getContext("2d");

const overlayCanvas = document.createElement("canvas");
overlayCanvas.setAttribute("width", screenW);
overlayCanvas.setAttribute("height", screenH);
overlayCanvas.setAttribute("z-index", "2");
overlayCanvas.style.position = "absolute";
overlayCanvas.style.top = 0;
overlayCanvas.style.left = 0;
document.body.appendChild(overlayCanvas);
const overlayContext = overlayCanvas.getContext("2d");

// context.webkitImageSmoothingEnabled = false;
// context.mozImageSmoothingEnabled = false;
// context.imageSmoothingEnabled = false;
overlayContext.webkitImageSmoothingEnabled = false;
overlayContext.mozImageSmoothingEnabled = false;
overlayContext.imageSmoothingEnabled = false;

// context.translate(canvas.width/2, canvas.height/2);




//--------------------------------------------------------------------------------------------------------------------------------|Math Functions
function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function roundRadian(num) {
  return ((num % twoPi) + twoPi) % twoPi;
}

function distance(x1,y1, x2,y2) {
  return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
}

function getAngle(x1,y1, x2,y2) {
  const adj = x2 - x1;
  const opp = y2 - y1;
  return adj >= 0
  ? ((Math.atan(opp/adj) % twoPi) + twoPi) % twoPi
  : (((Math.atan(opp/adj) % twoPi) + twoPi) % twoPi) - Math.PI;
}

function toHex(dec) {
  dec = Math.floor(parseFloat(dec));
  if (dec < 10) {
    return "0" + dec;
  } else if (dec < 16 && dec >= 10) {
    return "0" + dec.toString(16);
  } else {
    return dec.toString(16);
  }
}




class Timer {
  constructor(duration, currentTick) {
    // this.startTick = currentTick;
    // this.endTick = currentTick + duration;
    this.time = duration;
    this.duration = duration;
  }

  isFinished(timeDelta) {
    if (this.time <= 0) {
      this.time = this.duration;
      // console.log(this);
      return true;
    } else {
      this.time -= timeDelta;
    }
  }
}
