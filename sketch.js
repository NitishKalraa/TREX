var gameState = 1;
var trex, treximg;
var ground, groundimg;
var invisibleGround;
var cloudimg;
var r;
var score;
var o1, o2, o3, o4, o5, o6;
var oGroup, cGroup;
var trexcollide;
var gameOver, reset;
var g, r, a, a1;
var bot, manual;
var botImg, manualImg;
var flag = 0;
var die, checkPoint, jump;
var high, secondhigh;
var bgImg;
function preload() {
  treximg = loadAnimation(
    "images/trex1.png",
    "images/trex2.png",
    "images/trex3.png"
  );
  groundimg = loadImage("images/ground.jpg");
  cloudimg = loadImage("images/cloud.png");
  o1 = loadImage("images/obstacle1.png");
  o2 = loadImage("images/obstacle2.png");
  o3 = loadImage("images/obstacle3.png");
  o4 = loadImage("images/obstacle4.png");
  o5 = loadImage("images/obstacle5.png");
  o6 = loadImage("images/obstacle6.png");
  botImg = loadImage("images/bot.png");
  manualImg = loadImage("images/manual.png");
  bgImg = loadImage("images/bg.jpg");
  trexcollide = loadAnimation("images/trex_collided.png");
  gameOver = loadImage("images/gameOver.png");
  a = loadImage("images/reset.png");
  die = loadSound("sounds/die.mp3");
  checkPoint = loadSound("sounds/checkPoint.mp3");
  jump = loadSound("sounds/jump.mp3");
}
function setup() {
  createCanvas(1200, 500);
  trex = createSprite(60, 460, 10, 10);
  high = 0;
  trex.setCollider("circle", 0, 0, 45);
  trex.addAnimation("trex", treximg);
  trex.addAnimation("collide", trexcollide);
  ground = createSprite(600, 500, 1200, 20);
  ground.addImage("ground", groundimg);
  ground.x = ground.width / 2;
  trex.scale = 0.8;
  invisibleGround = createSprite(600, 502, 1200, 10);
  invisibleGround.visible = false;
  score = 0;
  oGroup = new Group();

  cGroup = new Group();
  g = createSprite(600, 150, 10, 10);
  g.addImage("a", gameOver);
  g.scale = 0.5;
  a1 = createSprite(600, 350, 10, 10);
  a1.addImage("b", a);
  a1.visible = false;
  a1.scale = 0.2;
  g.visible = false;
  bot = createSprite(150, 30, 30, 30);
  bot.addImage(botImg);
  bot.scale = 0.07;
  manual = createSprite(200, 30, 30, 30);
  manual.addImage(manualImg);
  manual.scale = 0.07;
  flag = 0;
  secondhigh = 0;
}

function draw() {
  background(bgImg);
  if (gameState === 1) {
    ground.velocityX = -(6 + (score * 2) / 100);
    score += Math.round(getFrameRate() / 60);
    spawnClouds();
    createObstacles();
    if (flag === 0) {
      trex.setCollider("circle", 0, 0, 45);
    }
    if (mousePressedOver(bot)) {
      flag = 1;
    }
    if (mousePressedOver(manual)) {
      flag = 0;
      trex.setCollider("circle", 0, 0, 45);
    }
    if (trex.isTouching(oGroup)) {
      if (flag === 0) {
        die.play();
        gameState = 0;
      }
      if (flag === 1) {
        trex.setCollider("circle", 50, 0, 45);
        trex.velocityY = -12;
      }
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (score % 100 == 0 && score > 0) {
      checkPoint.play();
    }
    if (keyDown("space") && trex.y >= 447.4) {
      trex.velocityY = -10;
      jump.play();
    }
  } else if (gameState === 0) {
    a1.visible = true;
    g.visible = true;
    ground.velocityX = 0;
    oGroup.setVelocityXEach(0);
    cGroup.setVelocityXEach(0);
    trex.changeAnimation("collide", trexcollide);
    trex.velocityY = 0;
    oGroup.setLifetimeEach(-1);

    cGroup.setLifetimeEach(-1);
    if (high < score) {
      secondhigh = high;
      high = score;
    }
  }

  textSize(30);
  fill("khaki");
  text("SCORE : " + score, 900, 100);
  textSize(22);
  text("HIGHEST :" + high, 900, 40);
  text("SECOND HIGHEST : " + secondhigh, 900, 70);

  trex.velocityY = trex.velocityY + 0.5;
  trex.collide(invisibleGround);

  drawSprites();
  if (mousePressedOver(a1)) {
    reset();
  }
}
function spawnClouds() {
  if (frameCount % 80 == 0) {
    r = Math.round(random(50, 400));
    var cloud = createSprite(1200, r, 10, 10);
    cloud.scale = 0.05;
    cloud.addImage("user", cloudimg);
    cloud.velocityX = -4;

    cloud.depth = trex.depth;
    trex.depth++;
    cGroup.add(cloud);
    cloud.lifetime = 1200 / 4;
  }
}
function createObstacles() {
  if (frameCount % 80 == 0) {
    var obstacle = createSprite(1200, 463, 10, 10);
    obstacle.scale = 1;
    obstacle.velocityX = -(6 + (score * 2) / 100);
    var r = Math.round(random(1, 6));
    obstacle.lifetime = 1200 / 6;
    oGroup.add(obstacle);
    switch (r) {
      case 1:
        obstacle.addImage(o1);
        break;
      case 2:
        obstacle.addImage(o2);
        break;
      case 3:
        obstacle.addImage(o3);
        break;
      case 4:
        obstacle.addImage(o4);
        break;
      case 5:
        obstacle.addImage(o5);
        break;
      case 6:
        obstacle.addImage(o6);
        break;
      default:
        break;
    }
  }
}

function reset() {
  gameState = 1;
  g.visible = false;
  a1.visible = false;
  trex.changeAnimation("trex", treximg);
  score = 0;
  oGroup.destroyEach();
  cGroup.destroyEach();
}
