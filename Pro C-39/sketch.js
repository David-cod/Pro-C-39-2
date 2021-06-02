var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;
var backgroundImage;



function preload(){
  trex_running =   loadAnimation("TrexImage1.png","TrexImage2.png","TrexImage3.png");
 // trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("GroundImage.png");
  
  cloudImage = loadImage("Cloud1.png");
  
  obstacle1 = loadImage("Obstacle1.png");
  obstacle2 = loadImage("Obstacle2.png");
  obstacle3 = loadImage("Obstacle3.png");
  obstacle4 = loadImage("Obstacle4.png");
  obstacle5 = loadImage("Obstacle5.png");
  obstacle6 = loadImage("Obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  backGroundImage=loadImage("Sky Backgound.jpeg")
}

function setup() {
  createCanvas(windowWidth/2, windowHeight/4);
  
  trex = createSprite(windowWidth/10,windowHeight/5.7,20,50);
  
  trex.addAnimation("running", trex_running);
 // trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(windowWidth/3,windowHeight/45,400,20);
  ground.addImage("ground",groundImage);
  ground.scale=1.7
  //ground.x = ground.width /2;
 
 // ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(windowWidth/2,50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(windowWidth/2,100);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(windowWidth/10,windowHeight/5+10,400,10);
  invisibleGround.visible = false;
  invisibleGround.velocityX=5
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;

  background(backGroundImage);
  text("Score: "+ score, trex.x+500,windowHeight/10,0);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    //ground.velocityX = -(6 + 3*score/100);
   // trex.velocityX=5;
  camera.position.x=camera.position.x+5;
  gameOver.x=windowWidth/2;
  gameOver.y=50;
  restart.x=windowWidth/2;
  restart.y=100;
  trex.velocityX=5
  // camera.position.y=displayHeight/2;
  
    if(keyDown("space") && trex.y >= 140) {
      trex.velocityY = -17  ; 
    }
  
    trex.velocityY = trex.velocityY + 0.5 
  
    if (camera.position.x %100===0){
      ground.x=trex.x+300;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    gameOver.x=trex.x;
    gameOver.y=trex.y-100;
    restart.x=trex.x;
    restart.y=trex.y-50;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (camera.position.x %500===0) {
    var cloud = createSprite(trex.x+1025,windowHeight/25 ,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
   // cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 400;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(camera.position.x %500===0) {
    var obstacle = createSprite(trex.x+1000,windowHeight/5.5,10,40);
    //obstacle.debug = true;
    //obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.scale=1;
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale=1;
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale=1;
              break;
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale=1;
              break;
      case 5: obstacle.addImage(obstacle5);
              obstacle.scale=0.5
              break;
      case 6: obstacle.addImage(obstacle6);
              obstacle.scale=0.25
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  ground.x=trex.x;
  invisibleGround.x=trex.x;
 
  
  score = 0;
  
}