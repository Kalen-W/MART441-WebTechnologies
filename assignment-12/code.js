/* To DO:
 X 1: Make player jump with spacebar.
 X 2: Change gravity of the stars.
 ? 3: Change gravity, so each star has gravity.
 - 4: Use different sprites for the player.
 X 5: Add spikes that kill the player on collision.
 - 6: Optional: Make it a speed-run time challenge.
 ~ 7: Create star variations with different score values.
 X 8: Add more platforms.
 X 9: Add a new level if they collect all the stars. Displays the current level number.
*/


//--------------------------------------------------------------------------------------------------------------------------------|Variables
// Game Object Arrays
var platforms;
var player;
var stars;
var pointObj2s;
var bombs;
var spikes;

var cursors;
var score = 0;
var currentLevel = 1;
var gameOver = false;
var scoreText;
var currentLevelText;

var screenW = 800;
var screenH = 600;
var center = { x: screenW/2, y: screenH/2 };


//--------------------------------------------------------------------------------------------------------------------------------|Game Config and Initialization
var config = {
  type: Phaser.AUTO,
  width: screenW,
  height: screenH,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 320 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);


//--------------------------------------------------------------------------------------------------------------------------------|Preload Function
function preload() {
  // this.load.setBaseURL('http:labs.phaser.io');
  //
  // this.load.image('sky', 'assets/skies/space3.png');
  // this.load.image('ground', 'assets/sprites/platform.png');
  // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  // this.load.image('red', 'assets/particles/red.png');
  //
  // this.load.image('star', 'assets/demoscene/star.png');
  // this.load.image('pointObj2', 'assets/demoscene/star.png');
  // this.load.image('bomb', 'assets/sprites/mine.png');
  // this.load.image('spike', 'assets/sprites/mine.png');
  //
  // this.load.spritesheet('dude', 'assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });

  this.load.image('sky', './assets/space3.png');
  this.load.image('ground', './assets/platform.png');

  this.load.image('star', './assets/star.png');
  this.load.image('pointObj2', './assets/star3.png');
  this.load.image('bomb', './assets/mine.png');
  this.load.image('spike', './assets/mine.png');

  this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}


//--------------------------------------------------------------------------------------------------------------------------------|Create Function
function create() {
  //----------------------------------------------------------------|Background
  this.add.image(center.x, center.y, 'sky');


  //----------------------------------------------------------------|Phaser "Hello World"
  /*var particles = this.add.particles('red');

  var emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 2, end: 0 },
    blendMode: 'ADD'
  });

  var logo = this.physics.add.image(400, 100, 'logo');
  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);*/


  //----------------------------------------------------------------|Platforms
  platforms = this.physics.add.staticGroup();

  // Bottom Floor Platform
  platforms.create(400, 600, 'ground').setScale(2).refreshBody();

  platforms.create(600, 390, 'ground');
  platforms.create(050, 240, 'ground');
  platforms.create(750, 220, 'ground');

  platforms.create(260, 470, 'ground').setScale(0.16, 0.4).refreshBody();
  platforms.create(-60, 140, 'ground').setScale(0.6, 0.2).refreshBody();


  //----------------------------------------------------------------|Player
  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.14);
  player.setCollideWorldBounds(true);

  // Animation Frames
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });


  //----------------------------------------------------------------|Stars
  stars = this.physics.add.group({
    key: 'star',
    repeat: 9,
    setXY: { x: 12, y: 0, stepX: 80 }
  });

  stars.children.iterate(function(child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.95));
  });


  //----------------------------------------------------------------|Point Objects 2s
  pointObj2s = this.physics.add.group({
    key: 'pointObj2',
    repeat: 3,
    setXY: { x: 12, y: 0, stepX: 180 }
  });

  pointObj2s.children.iterate(function(child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.6, 0.9));
  });


  //----------------------------------------------------------------|Bombs
  bombs = this.physics.add.group();


  //----------------------------------------------------------------|Spikes
  spikes = this.physics.add.group({
    key: 'spike',
    repeat: 5,
    setXY: { x: 40, y: 20, stepX: 140, stepY: 82 },
    allowGravity: false
  });


  //----------------------------------------------------------------|Text
  scoreText = this.add.text(16, 32, 'score: 0', { fontSize: '26px', fill: '#fff' });
  currentLevelText = this.add.text(16, 10, 'Current Level: 1', { fontSize: '26px', fill: '#fff' });


  //----------------------------------------------------------------|Initialization Stuff
  // Player - Platform Collision
  this.physics.add.collider(player, platforms);
  // Controls Initialization
  cursors = this.input.keyboard.createCursorKeys();

  // Star - Platform Collision
  this.physics.add.collider(stars, platforms);
  // Star - Player Collision (/Overlap)
  this.physics.add.overlap(player, stars, collectStar, null, this);

  // PointObj2 - Platform Collision
  this.physics.add.collider(pointObj2s, platforms);
  // PointObj2 - Player Collision (/Overlap)
  this.physics.add.overlap(player, pointObj2s, collectPointObj2, null, this);

  // Bomb - Platform Collision
  this.physics.add.collider(bombs, platforms);
  // Bomb - Player Collision (/Overlap)
  this.physics.add.overlap(player, bombs, hitBomb, null, this);

  // Spike - Player Collision (/Overlap)
  this.physics.add.overlap(player, spikes, hitBomb, null, this);
}


//--------------------------------------------------------------------------------------------------------------------------------|Update Function
function update() {
  if (gameOver) { return; }

  //----------------------------------------------------------------|Player Controls
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Star Collision Event
function collectStar(player, star) {
  star.disableBody(true, true);

  updateScore(5);
}

function collectPointObj2(player, obj) {
  obj.disableBody(true, true);

  updateScore(20);
}

function updateScore(pointAmount) {
  score += pointAmount;
  console.log(score);
  scoreText.setText('Score: ' + score);

  levelProgressionCheck();
}

function levelProgressionCheck() {
  if (stars.countActive(true) === 0 && pointObj2s.countActive(true) === 0) {
    currentLevel += 1;
    currentLevelText.setText('CurrentLevel: ' + currentLevel);
    //--------------------------------|Star / Point Object Respawning
    stars.children.iterate(function(child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    pointObj2s.children.iterate(function(child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    //--------------------------------|Bomb Spawning
    var x = (player.x < 400)
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Bomb Collision Event
function hitBomb(player, bomb) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
}
