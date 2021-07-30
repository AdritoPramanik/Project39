var PLAY = 1;
var END = 0;
var gameState = 1;
var ninja, ninja_running, ninja_Collided;
var background1, backgroundImg;
var invisibleGround, invisibleRoof;
var coins, coinsImg, coinsGroup;
var obstacle, obstacleImg, obstaclesGroup;
var score, survivalTime;
var restart, restartImg;
var cloudImg, cloud, cloudsGroup
localStorage.HighestScore = 0;
function preload() {
  ninja_running = loadAnimation("ninja1.png", "ninja2.png", "ninja3.png", "ninja4.png", "ninja5.png", "ninja6.png", "ninja7.png", "ninja8.png", "ninja9.png", "ninja10.png", "ninja11.png", "ninja12.png", "ninja13.png", "ninja14.png", "ninja15.png", "ninja16.png", "ninja17.png");
  backgroundImg = loadImage("Infinite.jpg");
  coinsImg = loadImage("—Pngtree—cartoon coin_161124.png");
  obstacleImg = loadImage("fire.png");
  restartImg = loadImage("restart.png");
  cloudImg = loadImage("cloud.png")
}

function setup() {
  createCanvas(1366, 625);
  gameState = PLAY;
  background1 = createSprite(250, 200, 1366, 650);
  background1.addImage(backgroundImg);
  background1.scale = 3.5;
  ninja_running.frameDelay = 1.5;
  ninja = createSprite(0, 300, 20, 20);

  ninja.addAnimation("running", ninja_running);
  ninja.scale = 0.1;

  restart = createSprite(ninja.x, 300, 20, 20);
  restart.addImage(restartImg);
  restart.visible = false;
  invisibleGround = createSprite(300, 500, 3000, 20);
  invisibleGround.visible = false;
  ninja.depth = background1.depth;
  ninja.depth = ninja.depth + 1;
  score = 0;
  survivalTime = 0;
  coinsGroup = new Group();
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
}

function draw() {
  background("white");
  ninja.setCollider("rectangle", 0, 0, 700, 900);
  ninja.velocityY = ninja.velocityY + 0.5;
  ninja.collide(invisibleGround);
  restart.x = ninja.x;
  // ninja.collide(invisibleRoof);
  console.log(gameState)
  if (gameState === PLAY) {
    // background1.velocityX=-1;
    console.log(ninja.x)
    if(ninja.x >800){
      background1.x = 750
    }
    if(ninja.x > 1200){
      background1.x = 1150
    }
    gameCurrency();
    fire();
    clouds();
    if (coinsGroup.isTouching(ninja)) {
      coinsGroup.destroyEach();
      score = score + 2;
    }


    if (keyDown("space") && ninja.y > 350) {
      ninja.velocityY = -12;
      ninja.x  = ninja.x +2;
    }
    ninja.x = ninja.x + 2




    if (obstaclesGroup.isTouching(ninja) || ninja.x > 1500) {
      obstaclesGroup.destroyEach();
      gameState = END;
    }

    drawSprites();
    camera.position.x = ninja.x
    camera.position.y = displayHeight/3

    survivalTime = survivalTime + (Math.round(getFrameRate() / 60));
    stroke("white");
    fill("black");
    textSize(20);
    text("S c o r e : " + score, ninja.x+500, 0);
    stroke("white");
    stroke("white");
    fill("black");
    textSize(20);
    text("S u r v i v a l  T i m e :" + survivalTime, ninja.x -600, 0);
  }


  if (gameState === END) {
    restart.visible = true;
    if (mousePressedOver(restart)) {
      reset();
    }
    ninja.velocityX = 0;

    coinsGroup.setVelocityEach = 0;
    obstaclesGroup.setVelocityEach = 0;
    background1.velocityX = 0;
    drawSprites();
    if (localStorage.HighestScore < score) {
      localStorage.HighestScore = score;
    }
    console.log(localStorage.HighestScore);
    stroke("white");
    fill("black");
    textSize(20);
    text("S c o r e : " + score, ninja.x+500, 50);
    stroke("white");
    stroke("white");
    fill("black");
    textSize(20);
    text("S u r v i v a l  T i m e :" + survivalTime, ninja.x - 650, 50);
    text("Highest Score:" + localStorage.HighestScore, ninja.x - 650, 100);
    stroke("yellow");
    fill("red");
    textSize(50);
    text("GAME OVER!", ninja.x-100, 200);
    stroke("black");
    fill("black");
    textSize(20);
    text("Try to achieve the highest score in this game (highest score till now in this world - 100)!", ninja.x-300, 230);
    if(ninja.x > 1499){
      fill("white")
      text("Bravo ! ", ninja.x -20, 400)
      text("You have successfully completed this game. No obstacle could touch you", ninja.x-200, 450)
    }
  }
}

function gameCurrency() {
  rand = Math.round(random(60, 150))
  if (frameCount % rand === 0) {


    coins = createSprite(ninja.x+500, 500, 20, 20);
    coins.y = Math.round(random(340, 500));
    coins.addImage(coinsImg);
    coins.velocityX = -(10 + 3 * survivalTime / 100);
    coins.scale = 0.05;
    coins.lifeTime = 900;
    coinsGroup.add(coins);

  }


}
function fire() {
  ran =Math.round(random(125, 135))
  if (frameCount % ran === 0) {
    obstacle = createSprite(ninja.x+700, 450, 20, 20);
    obstacle.addImage(obstacleImg);
    obstacle.velocityX = -(5 + 3 * survivalTime / 100);
    obstacle.lifeTime = 900;
    obstacle.scale = 0.13;
    obstaclesGroup.add(obstacle);
  }
}
function reset() {
  gameState = PLAY;
  restart.visible = false;
  background1.vsible = true;
  ninja.vsible = true;
  coinsGroup.vsible = true;
  obstaclesGroup.vsible = true;
  obstaclesGroup.destroyEach();
  ninja.x = 0;
  background1.x = 450;
  
  survivalTime = 0;
  score = 0;

}
function clouds(){
  if (frameCount % 100 === 0) {
    cloud = createSprite(ninja.x+700, 100, 20, 20);
    cloud.y = Math.round(random(50, 200))
    cloud.addImage(cloudImg);
    cloud.velocityX = -(5 + 3 * survivalTime / 100);
    cloud.lifeTime = 900;
    cloud.scale = 1;
    cloudsGroup.add(cloud);
  }
}
