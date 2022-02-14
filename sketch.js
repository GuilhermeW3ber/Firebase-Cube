var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("cube.png");
  }

function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("cube",balloonImage1);
  balloon.scale=0.2;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);

  textSize(20); 
}

function draw() {
  background("gray");

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("USE ARROW KEYS TO MOVE THE CUBE",40,40);
}

 function updateHeight(x,y){
   database.ref('balloon/height').set({
     'x': height.x + x ,
     'y': height.y + y
   })
 }

 function readHeight(data){
   height = data.val();
   balloon.x = height.x;
   balloon.y = height.y;
 }



function showError(){
  console.log("Erro ao escrever no banco de dados");
}
