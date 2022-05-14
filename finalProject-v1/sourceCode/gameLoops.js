//--------------------------------------------------------------------------------------------------------------------------------|Initialization Functions
function init() {
  if (document.readyState !== 'complete') {
    setTimeout(init, 5);
    return;
  }

  logicLoop();
  renderLoop(window.performance.now());

  pauseUpdate(false);
}
setTimeout(init, 5);


//--------------------------------------------------------------------------------------------------------------------------------|Game Loop Section
function logicLoop() {
  if (!pause) {
    var now = window.performance.now();
    var timeDelta = now - lastLogicLoopTime;

    player.movement(timeDelta);
    enemyUpdates(activeEnemies, timeDelta);


    var cycleDelay = logicTick;
    if (timeDelta > cycleDelay) {
      cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
    }

    setTimeout(logicLoop, cycleDelay);
    totalLogicTicks++;
    lastLogicLoopTime = now;
  }
}


function renderLoop(timeStamp) {
  if (!pause) {
    // context.resetTransform();
    // context.translate(player.x*cellSize, player.y*cellSize);
    // context.scale(0.5,0.5);
    // context.translate(-canvas.width/2, -canvas.height/2);
    // context.save();
    // context.translate((-player.x*cellSize)-(canvas.width/2), (-player.y*cellSize)-(canvas.height/2));
    // console.log((-player.x*cellSize)-(canvas.width/2));
    // console.log((player.x*cellSize)-(canvas.width/2));
    // context.translate((player.x*cellSize), (player.y*cellSize));
    // context.translate((player.x*cellSize)-(canvas.width/2)/cellSize, (player.y*cellSize)-(canvas.height/2)/cellSize);

    clearScreen();
    clearOverlayScreen();
    // context.save();
    // context.translate((player.x*cellSize)-(canvas.width/2), (player.y*cellSize)-(canvas.height/2));
    // context.translate((player.x*cellSize), (player.y*cellSize));
    // context.translate(player.x*cellSize, player.y*cellSize);
    // context.translate(-canvas.width/2, -canvas.height/2);

    renderEnemies(activeEnemies);
    renderPlayer();

    renderUi();

    context.fillStyle = "#e300ff";
    context.fillRect(0,0, canvas.width,4);
    context.fillRect(canvas.width,0, -4,canvas.height);
    context.fillRect(canvas.width,canvas.height, -canvas.width,-4);
    context.fillRect(0,canvas.height, 4,-canvas.height);

    // context.translate(((player.x*cellSize)+(canvas.width/2)), ((player.y*cellSize)+(canvas.height/2)));

    // context.restore();

    // context.resetTransform();
    // context.translate(player.x*cellSize, player.y*cellSize);
    // context.translate(-canvas.width/2, -canvas.height/2);
    // console.log((player.x*cellSize)+canvas.width/2);
  }

  // var now = window.performance.now();
  var now = timeStamp;
  var timeDelta = now - lastRenderLoopTime;
  var cycleDelay = renderTick;
  if (timeDelta > cycleDelay) {
    cycleDelay = Math.max(1, cycleDelay - (timeDelta - cycleDelay));
  }


  // setTimeout(renderLoop, cycleDelay);
  window.requestAnimationFrame(renderLoop);
  //totalRenderTicks++;
  lastRenderLoopTime = now;

  // context.translate(player.x*cellSize, player.y*cellSize);
  // context.translate(-canvas.width/2, -canvas.height/2);

  // context.translate(-(player.x*cellSize), -(player.y*cellSize));
  // context.restore();
}


function clearScreen() {
  context.fillStyle = "#222";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function clearOverlayScreen() {
  overlayContext.clearRect(0, 0, screenW, screenH);
}

function pauseUpdate(override) {
  if (typeof override == 'boolean') {
    pause = override;
  } else {
    pause = !pause;
  }

  if (pause) {
    // menu_pause.toggle(true);
  } else {
    // menu_pause.toggle(false);

    playerMoveCheck();
    lastLogicLoopTime = window.performance.now();
    logicLoop();
  }
  console.log("pause = " + pause);
}
