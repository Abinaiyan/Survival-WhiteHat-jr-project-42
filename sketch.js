var backImage,backgr;
var player, player_running;
var ground,ground_img;
var obstacleGroup,fruitGroup
var score

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacleImage = loadImage("stone.png")
  bananaImage = loadImage("banana.png")
  monkeystop = loadImage("Monkey_10.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.15;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  obstacleGroup = new Group();
  fruitGroup = new Group();
  score = 0;
}

function draw() { 
  background(0);
  //console.log(player.y)

  player.collide(ground);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y >= 280 ) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
  
  }
  spawnObstacles()
  spawnBanana()

  

  if (fruitGroup.isTouching(player)) {
    score = score + 2;

    fruitGroup.destroyEach();

  }
  if (obstacleGroup.isTouching(player)) {

    gameState === END
    ground.velocityX = 0;
    backgr.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    fruitGroup.setLifetimeEach(-1);


    stroke("black");
    fill("red");
    textSize(100);
    text("GameOver", 30, 20);

    player.scale = 0.15;
  }
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 180 === 0) {
    var obstacle = createSprite(850, 320, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15
    obstacle.velocityX = -5;
    obstacle.lifetime = 180;
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana() {
  if (frameCount % 120 === 0) {
    var banana = createSprite(850, Math.round(random(180, 200)), 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.07
    banana.velocityX = -5;
    banana.lifetime = 180;
    fruitGroup.add(banana);
  }
}