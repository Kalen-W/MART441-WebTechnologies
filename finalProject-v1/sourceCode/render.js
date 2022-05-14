screenPosX = 0;
screenPosY = 0;
screenScale = 1;

//--------------------------------------------------------------------------------------------------------------------------------|Render Player
function renderPlayer() {
  context.fillStyle = "#387092";
  context.fillRect(
    screenPosX + (player.x * cellSize * screenScale) - ((player.collisionSize * cellSize) / 2),
    screenPosY + (player.y * cellSize * screenScale) - ((player.collisionSize * cellSize) / 2),
    player.collisionSize * cellSize,
    player.collisionSize * cellSize
  );

  // Displays direction with short line
  const rayLength = player.collisionSize * cellSize;
  context.strokeStyle = "#48d2f6";
  context.beginPath();
  context.moveTo(
    screenPosX + (player.x * cellSize * screenScale),
    screenPosY + (player.y * cellSize * screenScale)
  );
  context.lineTo(
    ((player.x * cellSize) + Math.cos(player.angle) * rayLength) * screenScale,
    ((player.y * cellSize) + Math.sin(player.angle) * rayLength) * screenScale
  );
  context.closePath();
  context.stroke();
}


//--------------------------------------------------------------------------------------------------------------------------------|Render Enemies
function renderEnemies(enemies) {
  for (var i=0; i<enemies.length; i++) {
    enemy = enemies[i];

    // context.fillStyle = "#642f2f";
    if (enemy.hitFlashFrames > 0) { enemy.hitFlashFrames--; }
    var r = 99 + enemy.hitFlashFrames;
    var g = 47 + enemy.hitFlashFrames;
    var b = 47 + enemy.hitFlashFrames;
    context.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    context.fillRect(
      screenPosX + (enemy.x * cellSize * screenScale) - ((enemy.collisionSize * cellSize) / 2),
      screenPosY + (enemy.y * cellSize * screenScale) - ((enemy.collisionSize * cellSize) / 2),
      enemy.collisionSize * cellSize,
      enemy.collisionSize * cellSize
    );

    // Displays direction with short line
    const rayLength = enemy.collisionSize * cellSize;
    context.strokeStyle = "#b02610";
    context.beginPath();
    context.moveTo(
      screenPosX + (enemy.x * cellSize * screenScale),
      screenPosY + (enemy.y * cellSize * screenScale)
    );
    context.lineTo(
      ((enemy.x * cellSize) + Math.cos(enemy.moveAngle) * rayLength) * screenScale,
      ((enemy.y * cellSize) + Math.sin(enemy.moveAngle) * rayLength) * screenScale
    );
    context.closePath();
    context.stroke();
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Render UI
var healthBarScale = 96;
function renderUi() {
  var healthPercentScale = (player.health / player.health_max) * healthBarScale;

  context.fillStyle = "#387092";
  // context.fillRect(
  //   screenPosX + center.x - (healthPercentScale / 2),
  //   screenPosY + 8,
  //   healthPercentScale,
  //   8
  // );

  context.fillRect(
    screenPosX + (player.x * cellSize) - (healthPercentScale / 2),
    screenPosY + (player.y * cellSize) + 26,
    healthPercentScale,
    4
  );
}
