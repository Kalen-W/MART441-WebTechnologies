//--------------------------------------------------------------------------------------------------------------------------------|Variables & Setup
var screenW = window.innerWidth-1;
var screenH = window.innerHeight-4;
var canvasOffX;
var canvasOffY;

const tick = 20;

const canvas = document.createElement("canvas");
canvas.setAttribute("position", "absolute");
canvas.setAttribute("width", screenW);
canvas.setAttribute("height", screenH);
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d",  { alpha: false });

var colors = {
  background: "#262628",
  color1: "#24b6d6",
  color2: "#4e83aa",
  matchedColor: "#6a848f"
};

var cardBase = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
var cardDisplay = [];
const numberOfCards = cardBase.length;
var cardEdgeR = 18;

//if (screenH-1.4*2 < screenW-5) {}
var cardH = Math.floor(screenH/2.4);
var cardW = Math.floor(cardH/1.4);
var yGap = Math.floor((screenH - cardH * 2) / 3);
var xGap = Math.floor((screenW - cardW * 5) / 6);

var allowClick = true;
var attempts = 0;


//--------------------------------------------------------------------------------------------------------------------------------|Classes
class card {
  constructor(xCenter,yCenter, width,height, edgeRadius, defaultColor,hoverColor, value) {
    this.path = new Path2D();
    this.x = xCenter;
    this.y = yCenter;
    this.w = width;
    this.h = height;
    this.r = edgeRadius;
    this.colors = {
      current: defaultColor,
      default: defaultColor,
      hover: hoverColor,
      matched: colors.matchedColor
    };
    this.value = value;
    this.displayValue = false;
    this.matched = false;

    this.direction = 1.2*Math.PI;
    this.speed = 8;
    this.initPath();
  }

  initPath() {
    //this.path.beginPath();
    this.path.moveTo(this.x - .5 * this.w + this.r, this.y - .5 * this.h);
    this.path.lineTo(this.x + .5 * this.w - this.r, this.y - .5 * this.h);
    this.path.quadraticCurveTo(this.x + .5 * this.w, this.y - .5 * this.h, this.x + .5 * this.w, this.y - .5 * this.h + this.r);
    this.path.lineTo(this.x + .5 * this.w, this.y + .5 * this.h - this.r);
    this.path.quadraticCurveTo(this.x + .5 * this.w, this.y + .5 * this.h, this.x + .5 * this.w - this.r, this.y + .5 * this.h);
    this.path.lineTo(this.x - .5 * this.w + this.r, this.y + .5 * this.h);
    this.path.quadraticCurveTo(this.x - .5 * this.w, this.y + .5 * this.h, this.x - .5 * this.w, this.y + .5 * this.h - this.r);
    this.path.lineTo(this.x - .5 * this.w, this.y - .5 * this.h + this.r);
    this.path.quadraticCurveTo(this.x - .5 * this.w, this.y - .5 * this.h, this.x - .5 * this.w + this.r, this.y - .5 * this.h);
    this.path.closePath();
  }

  render() {
    ctx.fillStyle = this.colors.current;
    ctx.fill(this.path);

    if (this.displayValue) {
      this.renderValue();
    }
  }

  update() {
    this.path = new Path2D();
    this.initPath();
    this.inPath(ctx, canvasOffX,canvasOffY);
  }

  inPath(ctx, offX,offY) {
    if (allowClick && !this.matched) {
      this.colors.current = ctx.isPointInPath(this.path, offX,offY)
        ? this.colors.current = this.colors.hover
        : this.colors.current = this.colors.default;

      return ctx.isPointInPath(this.path, offX,offY);
    } else if (this.matched) {
      this.colors.current = this.colors.matched;
    } else {
      this.colors.current = this.colors.default;
    }
  }

  clickEvent() {
    //console.log(this.value);
    //this.displayValue = !this.displayValue;
    if (!selectedCards.includes(this)) {
      matchCheck(this);
    }
  }

  renderValue() {
    var fontSize = cardW * .38;
    ctx.font = fontSize + "px Monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#222";
    ctx.fillText(this.value, this.x,this.y);
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Card Array
randomizeCards();

var cardArray = [
  new card(
    cardW*.5 + xGap, cardH*.5 + yGap,
    cardW,cardH, cardEdgeR,
    colors.color1,colors.color2, cardDisplay[0]
  ),
  new card(
    cardW*1.5 + xGap*2, cardH*.5 + yGap,
    cardW,cardH, cardEdgeR,
    colors.color1,colors.color2, cardDisplay[1]
  ),
  new card(
    screenW*.5, cardH*.5 + yGap,
    cardW,cardH, cardEdgeR,
    colors.color1,colors.color2, cardDisplay[2]
  ),
  new card(
    screenW - (cardW*1.5 + xGap*2), cardH*.5 + yGap,
    cardW,cardH, cardEdgeR,
    colors.color1,colors.color2, cardDisplay[3]
  ),
  new card(
    screenW - (cardW*.5 + xGap), cardH*.5 + yGap,
    cardW,cardH, cardEdgeR,
    colors.color1,colors.color2, cardDisplay[4]
  ),


  new card(
    cardW*.5 + xGap, screenH - (cardH*.5 + yGap),
    cardW,cardH, cardEdgeR,
    colors.color1,colors.color2, cardDisplay[5]
  ),
  new card(
    cardW*1.5 + xGap*2, screenH - (cardH*.5 + yGap),
    cardW,cardH, cardEdgeR,
    colors.color1,colors.color2, cardDisplay[6]
  ),
  new card(
    screenW*.5, screenH - (cardH*.5 + yGap),
    cardW,cardH, cardEdgeR,
    colors.color1,colors.color2, cardDisplay[7]
  ),
  new card(
    screenW - (cardW*1.5 + xGap*2), screenH - (cardH*.5 + yGap),
    cardW,cardH, cardEdgeR,
    colors.color1,colors.color2, cardDisplay[8]
  ),
  new card(
    screenW - (cardW*.5 + xGap), screenH - (cardH*.5 + yGap),
    cardW,cardH, cardEdgeR,
    colors.color1,colors.color2, cardDisplay[9]
  ),
];

setInterval(drawLoop, tick);


//--------------------------------------------------------------------------------------------------------------------------------|Loop
function drawLoop() {
  clearScreen();
  //clickableObjArray[0].update();

  cardArray.forEach((item, i) => {
    item.render();
  });
}

function clearScreen() {
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, screenW, screenH);
}


//--------------------------------------------------------------------------------------------------------------------------------|Functions
function randomizeCards() {
  cardBase = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
  for (var i=0; i<numberOfCards; i++) {
    const randomCard = Math.floor(Math.random()*cardBase.length);
    cardDisplay[i] = cardBase[randomCard];
    cardBase.splice(randomCard,1);
  }
  console.log(cardDisplay);
}

var selectedCards = [];
function matchCheck(card) {
  if (selectedCards.length <= 0) {
    card.displayValue = true;
    selectedCards[0] = card;
    //selectedCards.push(card);
  } else if (card.value == selectedCards[0].value) {
    card.displayValue = true;
    selectedCards[0].matched = true;
    card.matched = true;

    attempts += 1;
    selectedCards = [];
  } else {
    card.displayValue = true;


    selectedCards.push(card);
    allowClick = false;
    setTimeout(delayedHide, 1000);
  }


  if (cardArray.every((item, i) => { return item.matched; })) {
    var info = JSON.parse(localStorage.getItem('playerInfo'));
    info.attempts = attempts;

    localStorage.setItem('playerInfo', JSON.stringify(info));
    window.location = "./results.html";
  }

}

function delayedHide() {
  selectedCards[0].displayValue = false;
  selectedCards[1].displayValue = false;

  attempts += 1;
  selectedCards = [];
  allowClick = true;
}


//--------------------------------------------------------------------------------------------------------------------------------|Event Listeners
canvas.addEventListener('mousemove', function(e) {
  cardArray.forEach((item, i) => {
    item.inPath(ctx, e.offsetX,e.offsetY);
  });

  canvasOffX = e.offsetX;
  canvasOffY = e.offsetY;
});

canvas.addEventListener("click", () => {
  cardArray.forEach((item, i) => {
    if (allowClick && !item.matched && item.inPath(ctx, canvasOffX,canvasOffY)) {
      item.clickEvent();
    }
  });
});


//--------------------------------------------------------------------------------------------------------------------------------|Window Resize Adjust
window.addEventListener('resize', windowSizeChange);

function windowSizeChange() {
  screenW = window.innerWidth-1;
  screenH = window.innerHeight-4;
  canvas.setAttribute("width", screenW);
  canvas.setAttribute("height", screenH);

  cardH = Math.floor(screenH/2.4);
  cardW = Math.floor(cardH/1.4);
  yGap = Math.floor((screenH - cardH * 2) / 3);
  xGap = Math.floor((screenW - cardW * 5) / 6);
}
