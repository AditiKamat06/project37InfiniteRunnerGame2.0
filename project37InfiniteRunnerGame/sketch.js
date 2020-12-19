var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,obstacle1,obstacle6,obstacle2,obstacle3,obstacle4,obstacle5;
var ObstaclesGroup,cloudsGroup,cloudImage;
var count = 0;
var gameState = "start";

function preload(){
  trex_running  = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  cloudImage=loadImage("cloud.png");
}

function setup() {
  canvas = createCanvas(displayWidth-20, displayHeight-30);

  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  ObstaclesGroup = new Group();
  cloudsGroup = new Group();

  restart = createButton("restart the game");
  restart.position(700,95);
  restart.mousePressed(restart);
}

function draw() {
  background("white");
  //gameState starts 
  if(gameState==="start"){
    spawnClouds();
    spawnObstacles();
  
    if(keyDown("space")&&trex.y>=130) {
      trex.velocityY = -10;
      gameState==="play"
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if(ground.x < 0){
      ground.x = ground.width/2;
    }

    if(trex.collide(ObstaclesGroup) && gameState === "play"){
      gameState = "end";
    } 

    if(gameState==="end"){
      trex.velocityX=0;
      trex.velocityY=0;
    }
  
    count = count+Math.round(getFrameRate()/20);
    text("Score: "+ count, 250, 100);

    camera.position.x-displayWidth/2;
    camera.position.y = trex.y;
  }
 //  gameState ends
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(camera.x+width/2,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    var rand = Math.round(random(1,6));
   
    switch (rand){
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
      default : break
    }
        
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
  }
}

function restart(){
  if(mousePressed(restart)){
    gameState==="start";
    count=0;
  }
}