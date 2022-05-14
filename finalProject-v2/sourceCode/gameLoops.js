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
    updateEnemies(timeDelta);
    updateBullets(timeDelta);

    mapMovement(timeDelta);


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
    clearScreen();

    renderBgObjs(testBg);
    renderEnemies();
    renderBullets();
    player.render();
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
