var path,coin,policecar,policecar2,policecar3,maincar,energydrink, missile;
var pathImg,coinImg,policecarImg,policecar2Img,policecar3Img,maincarImg,energydrinkImg,missileImg;
var HISCORE=300;
var Score=0;
var policecarG,policecar2G,policecar3G,energydrinkG,coinG,missileG;
var gameoverImg,gameover;
var restart,restartImg,fuel;
var life=0;
var life,reset;
var attack,attackImg;
var balls=[];
//Game States
var form,game;
var PLAY=2;
var END=3;
var WAIT=1;
var gameState=PLAY;
var WIN=4;
var fuel = 185;


function preload(){
  pathImg = loadImage("Road.png");
  policecarImg = loadImage("policecar.png");
  maincarImg = loadImage("maincar.png");
  policecar2Img = loadImage("policecar2.jpg");
  policecar3Img = loadImage("policecar3.jpg");
  coinImg = loadImage("goldCoin.png");
  energydrinkImg = loadImage("fuel.png");
  gameoverImg=loadImage("gameOver.png");
  restartImg=loadImage("reset.png");
  
 
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);

  
  game = new Game();
  game.start();

  
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;

restart=createSprite(width/2,300);
restart.addImage(restartImg);
restart.scale=0.3;
restart.visible=false;


maincar = createSprite(width/2,height-20,20,20);
maincar.addImage("maincarRunning",maincarImg);
maincar.scale=0.09;

gameover = createSprite(650,150);
gameover.addImage(gameoverImg);
gameover.scale = 0.8;
gameover.visible = false;  

policecarG= new Group();
policecar2G= new Group()
policecar3G= new Group();
coinG = new Group();
energydrinkG = new Group();

fuels = new Group();
}


function draw() {
  
if(gameState===WAIT){

  game = new Game();
  game.start();

   path.velocityY= 0;
    maincar.velocityY = 0;


}

  
  else if(gameState===PLAY){
    
  background(0);

  maincar.x = World.mouseX;
  

  if(maincar.fuel>0&&this.maincarMoving){
    fuel-=0.3
  }
  if(maincar.fuel<=0){
    gameState=END;
    this.gameOver();
  }


  
  edges= createEdgeSprites();
  maincar.collide(edges);
 
  
  path.velocityY = +(4 + 3* Score/40)
  maincar.velocityY = maincar.velocityY + 10
  
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
  
  createCoin();
    createPolicecar2();
    createPolicecar3();
    createEnergydrink();
    createPolicecar();
  
 
    if(coinG.isTouching(maincar)) {
      coinG.destroyEach();
      Score= Score +50;
    }

     if(energydrinkG.isTouching(maincar)){
      energydrinkG.destroyEach();
      Score = Score +30;
    }


     if(policecar2G.isTouching(maincar)) {
     policecar2G.destroyEach();
      policecar2G.velocityY=0;
      gameState=END;
     }

     if(policecar3G.isTouching(maincar)) {
      policecar3G.destroyEach();
      policecar3G.velocityY=0;
      gameState=END;
     }

     if(policecarG.isTouching(maincar)) {
      policecarG.destroyEach();
      policecarG.velocityY=0
      gameState=END;
     }
    }
    
     else if(gameState===END){
       gameover.visible=true;
       restart.visible=true;
       
       
       
       
      
      policecar2G.destroyEach();
      policecarG.destroyEach();
      policecar3G.destroyEach();
      coinG.destroyEach();
      energydrinkG.destroyEach();
     

      policecarG.setVelocityYEach(0);
      policecar2G.setVelocityYEach(0);
   policecar3G.setVelocityYEach(0);
   coinG.setVelocityYEach(0);
   energydrinkG.setVelocityYEach(0);

   path.velocityY= 0;
    maincar.velocityY = 0;

    
    if(mousePressedOver(restart)) {
      reset();
  }
 
}


    drawSprites();

    textSize(20);
    fill("orange");
    text("HI SCORE:"+ HISCORE,width-250,90);


  

    textSize(20);
    fill("yellow");
    
    text("Score:" + Score,width-250,50);

    
    if(Score >=300){
      maincar.visible =true;
      textSize(30);
      stroke("black");
      fill("skyblue");
      text("Congragulations!! You win the game!! ", 500,100);
      gameState = WIN;
      gameover.visible = true;
    restart.visible =true;
    
  }
  
   
  }   
   
  
    
   

  function createCoin() {
    if (World.frameCount % 500 == 0) {
     // Modify the positions of cash 
      var coin = createSprite(Math.round(random(50, width-50),40, 10, 10));
      
      coin.addImage(coinImg);
    coin.scale=0.14;
    coin.velocityY= +(5 + Score/30);
    coin.lifetime = 200;
    coinG.add(coin);
    }
  }
  function createPolicecar() {
    if (World.frameCount % 150 == 0) {
     // Modify the positions of cash 
      var policecar = createSprite(Math.round(random(50, width-30),40, 10, 10));
      policecar.addImage(policecarImg);
      policecar.scale=0.31;
      policecar.velocityY= +(6 + Score/30);
      policecar.lifetime = 200;
      policecarG.add(policecar);
    }
  }

 


  function createPolicecar2() {
    if (World.frameCount % 120 == 0) {
     // Modify the positions of cash 
      var policecar2 = createSprite(Math.round(random(50, width-50),40, 10, 10));
      policecar2.addImage(policecar2Img);
      policecar2.scale=0.31;
      policecar2.velocityY= +(6 + Score/30);
      policecar2.lifetime = 200;
      policecar2G.add(policecar2);
    }
  }

 
  
  function createPolicecar3() {
    if (World.frameCount % 200 == 0) {
     // Modify the positions of cash 
      var policecar3 = createSprite(Math.round(random(30, width-70),40, 10, 10));
      policecar3.addImage(policecar3Img);
      policecar3.scale=0.31;
      policecar3.velocityY= +(5 + Score/30);
      policecar3.lifetime = 200;
      policecar3G.add(policecar3);
    }
  }
  function createEnergydrink() {
    if (World.frameCount % 250 == 0) {
     // Modify the positions of cash 
      var energydrink = createSprite(Math.round(random(50, width-60),40, 10, 10));
      energydrink.addImage(energydrinkImg);
      energydrink.scale=0.028;
      energydrink.velocityY= +(5 + Score/40);
      energydrink.lifetime = 200;
      energydrinkG.add(energydrink);
    }
  }
  function reset(){
    gameState = 2;
    gameover.visible = false;
   maincar.addImage(maincarImg);
    restart.visible=false;
   policecarG.destroyEach();
    policecar2G.destroyEach();
    policecar3G.destroyEach();
    
    Score = 0}
   

    
   
   
  
