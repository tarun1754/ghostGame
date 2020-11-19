var towerImg, tower;
var c, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    door=createSprite(200,150,10,10);
    door.addImage(doorImg);
    door.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    door.x=Math.round(random(100,500));
    climber=createSprite(200,200,10,10);
    climber.x=door.x; 
    climber.addImage(climberImg);
    climber.velocityY=1;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlock=createSprite(200,205,10,2);
    invisibleBlock.velocityY=1;
    invisibleBlock.visible=false;
    invisibleBlock.debug=true;
    invisibleBlock.x=climber.x;
    invisibleBlock.width=climber.width;
    invisibleBlockGroup.add(invisibleBlock);
  }
}

