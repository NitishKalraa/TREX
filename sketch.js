  var gameState=1;
  var trex,treximg;
  var ground,groundimg;
  var invisibleGround;
  var cloudimg;
  var r;
  var score;
  var o1,o2,o3,o4,o5,o6;
  var oGroup,cGroup;
  var trexcollide;
  var gameOver,reset;
  var g,r,a,a1;
  var bot,manual;
 var flag=0;
 var die,checkPoint,jump;
 var high,secondhigh;
  function preload(){
    treximg=loadAnimation( 'trex1.png','trex2.png','trex3.png');
    groundimg=loadImage('ground2.png');
    cloudimg=loadImage('cloud.png');
    o1=loadImage('obstacle1.png');
    o2=loadImage('obstacle2.png');
    o3=loadImage('obstacle3.png');
    o4=loadImage('obstacle4.png');
    o5=loadImage('obstacle5.png');
    o6=loadImage('obstacle6.png');
    trexcollide=loadAnimation('trex_collided.png');
   // reset=loadImage('restart.png');
    gameOver=loadImage('gameOver.png');
    a=loadImage('reset.png');
    die=loadSound('die.mp3');
    checkPoint=loadSound('checkPoint.mp3');
    jump=loadSound('jump.mp3');
    
  }
  function setup(){
    createCanvas(1200,500)
    trex=createSprite(60,460,10,10);
    high=0;
    //trex.debug=true;
    trex.setCollider("circle",0,0,45);
    trex.addAnimation("trex",treximg);
    trex.addAnimation("collide",trexcollide);
    ground=createSprite(600,480,1200,20);
    ground.addImage("ground",groundimg);
    ground.x=ground.width/2;
    trex.scale=0.8;
    invisibleGround=createSprite(600,490,1200,10); 
    invisibleGround.visible=false;
    score=0;
    oGroup=new Group();
    
    cGroup=new Group();
    g=createSprite(600,100,10,10);
    g.addImage("a",gameOver);
   // r=createSprite(600,350,10,10);
    a1=createSprite(600,350,10,10);
    a1.addImage("b",a);
    a1.visible=false;
    a1.scale=0.2;
   // r.addImage("b",reset);
    //r.scale=0.2;
    //r.visible=false;
    g.visible=false;
    bot=createSprite(150,50,30,30);
    bot.shapeColor="green";
    manual=createSprite(200,50,30,30);
    manual.shapeColor="red";
    flag=0;
    secondhigh=0;
  }
  
  function draw(){
    background(200); 
  
    if(gameState===1){
      ground.velocityX=-(6+score*2/100);
      score+=Math.round(getFrameRate()/60);
      spawnClouds();
      createObstacles();
      if(flag===0){
        trex.setCollider("circle",0,0,45);

      }
      if(mousePressedOver(bot)){
        flag=1;
        
      }
      if(mousePressedOver(manual)){
        flag=0;
        trex.setCollider("circle",0,0,45);
        
      }
      if(trex.isTouching(oGroup)){
      if(flag===0){
       die.play();
        gameState=0;
      }
     if(flag===1){
      trex.setCollider("circle",50,0,45);
    trex.velocityY=-12;

     }
      }
      if(ground.x<0){
        ground.x=ground.width/2;

    
      }
      if(score%100==0&&score>0){
     checkPoint.play();
      }
      if(keyDown("space")&&trex.y>=447.4){
        trex.velocityY=-10;
        jump.play();
       
        }
    }else if(gameState===0){
      a1.visible=true;
      g.visible=true;
      ground.velocityX=0;
      oGroup.setVelocityXEach(0);
      cGroup.setVelocityXEach(0);
      trex.changeAnimation("collide",trexcollide);
      trex.velocityY=0;
      oGroup.setLifetimeEach(-1);

      cGroup.setLifetimeEach(-1);
      if(high<score){
    secondhigh=high;
    high=score;
      }
      
      
    }
  

  
  
  textSize(30);
  text("score:"+score,1000,100);
  textSize(22);
  text("Highest score:"+high,900,40);
  text("Second highest:"+secondhigh,900,70);
  
  trex.velocityY=trex.velocityY+0.5;
  trex.collide(invisibleGround);
  
  drawSprites();
  if(mousePressedOver(a1)){
  reset();
  }
  }
  function spawnClouds(){
    if(frameCount%80==0){
      r=Math.round(random(50,400));
    var cloud=createSprite(1200,r,10,10);
    
    cloud.addImage("user",cloudimg);
    cloud.velocityX=-4;
    
    cloud.depth=trex.depth;
    //console.log(cloud.depth);
    trex.depth++;
    cGroup.add(cloud);
    cloud.lifetime=1200/4;
  // console.log("t"+trex.depth);
    }
  }
  function createObstacles(){
  if(frameCount%80==0){
    var obstacle =createSprite(1200,463,10,10);
    obstacle.scale=0.5;
  obstacle.velocityX=-(6+score*2/100)
  var r=Math.round(random(1,6));
  obstacle.lifetime=1200/6;
  //obstacle.debug=true;
  oGroup.add(obstacle);
  //console.log(r);
  switch(r){
  case 1:obstacle.addImage(o1);
  break
  case 2:obstacle.addImage(o2);
  break
  case 3:obstacle.addImage(o3);
  break
  case 4:obstacle.addImage(o4);
  break
  case 5:obstacle.addImage(o5);
  break
  case 6:obstacle.addImage(o6);
  break
  default:break;
    }
    }
    
  }
  function reset(){
  gameState=1;
  g.visible=false;
  a1.visible=false;
  trex.changeAnimation("trex",treximg);
  score=0;
  oGroup.destroyEach();
  cGroup.destroyEach();
  }