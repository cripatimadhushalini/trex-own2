var trex,trex_running,trex_collided;
var ground,gI;
var iG;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var cloud,cloudG,cloudI;

var goI,rI;

var s;

var jumpSound;
var scoreSound;
var goS;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  gI = loadImage("ground2.png");
  cloudI = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  jumpSound = loadSound("jump.mp3");
  gos = loadSound("die.mp3");
  scoreSound = loadSound("checkPoint.mp3");
  
  goI = loadImage("gameOver.png");
  rI = loadImage("restart.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,157,10,10);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(80,180,10,10);
  ground.addImage(gI);
  
  go = createSprite(300,90,10,10);
  go.addImage(goI);
  go.scale = 0.5;
  go.visible = false;

  r = createSprite(300,130,10,10);
  r.addImage(rI);
  r.scale = 0.5;
  r.visible = false;

  iG = createSprite(80,185,500,10);
  iG.visible = false;
  
  s = 0;
  
  obstaclesGroup = new Group();
  cloudG = new Group();
}

function draw(){
  background("white");
  
  if(gameState===PLAY){
    ground.velocityX = -4;
    
    trex.changeAnimation("running",trex_running);
  
  if(ground.x<0){
    ground.x = ground.width/2;
    }
    
    if(s>0 && s%100===0){
      scoreSound.play();
    }
    
  createClouds();
  createObstacles();
  
  s = s + Math.round(getFrameRate()/60);
    
  trex.velocityY = trex.velocityY+0.8;
  
  if(keyDown("space") && trex.y >= 100){
    jumpSound.play();
    trex.velocityY = -10;
  }
    if(obstaclesGroup.isTouching(trex)){
      gos.play();
      gameState = END;
    }
    
 }else if(gameState===END){
   ground.velocityX = 0;
   obstaclesGroup.setVelocityXEach(0);
   cloudG.setVelocityXEach(0);
   trex.changeAnimation("collided",trex_collided);
   go.visible = true;
   r.visible = true;
   
   if(mousePressedOver(r)){
     reset();
   }
 }
  
  text("Score:"+s,500,20);
 
  trex.collide(iG);
  drawSprites();
}

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  go.visible = false;
  r.visible = false;
  cloudG.destroyEach();
  s = 0;
}

function createClouds(){
  if(frameCount%60===0){
    cloud = createSprite(600,60,10,10)
    cloud.y = Math.round(random(60,10));
    cloud.addImage(cloudI);
    cloud.scale = 0.5;
    cloud.velocityX = -4;
    cloudG.add(cloud);
  }
}

function createObstacles(){
  if(frameCount%60===0){
    obstacle = createSprite(500,160,10,10);
    obstacle.scale = 0.4;
    obstacle.velocityX = -4;
    
    var ran = Math.round(random(1,6))
      switch(ran){
        case 1 : obstacle.addImage(obstacle1);
        break;
        case 2 : obstacle.addImage(obstacle2);
        break;
        case 3 : obstacle.addImage(obstacle3);
        break;
        case 4 : obstacle.addImage(obstacle4);
        break;
        case 5 : obstacle.addImage(obstacle5);
        break;
        case 6 : obstacle.addImage(obstacle6);
        break;
        
      }
     obstaclesGroup.add(obstacle);
    }
  }