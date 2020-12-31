//Create variables here
var dog, dogImg;
var happyDog, happyDogImg;
var database;
var foodS, foodStock;

function preload()
{
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(250, 250, 75, 75);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  
}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }



  drawSprites();
  
  textSize(20);
  fill("blue");
  stroke("black");
  text("Press the UP arrow key to feed Drago milk!", 60, 50);
  text("Food: " + foodS, 220, 440);

}



function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if (x <= 0){
    x = 0;
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}