var dog, normalDog,happyDog, database, foodS, foodStock;

var feed,addFood,fedTime,lastFed,foodObject,player;



function preload()
{
  //load images here
  
  happyDog = loadImage("images/dogImg.png");

  normalDog = loadImage("images/dogImg1.png");


}

function setup() {
  createCanvas(1200,500);
  
  //foodS = 20;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock,showError);
  
  dog = createSprite(180,200,20,20);
  dog.addImage(normalDog);

  dog.scale = 0.25;

  feed = createButton("Feed the dog");
  feed.position(670,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(790,95);
  addFood.mousePressed(addFoods);

 

  player = createButton("Play")
  player.position(1090,95);
  player.mousePressed(play);

  foodObject = new Food();
}


function draw() {  
  background(46, 139, 87);

  //console.log(lastFed);

  //if(keyWentDown(UP_ARROW)){
   // writeStock(foodS);
    //dog.addImage(happyDog);
  //}

  foodObject.display();

  drawSprites();



  //lastFed = foodObject.lastFed;
  fill(255,255,254);
  textSize(15);
  if(foodObject.lastFed >= 12){
    text("Last Feed : " + foodObject.lastFed%12 + " PM", 350,30);
  }else if(foodObject.lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :" + foodObject.lastFed + " AM",350,30);
  }

  fill("white");
  //text("Note: Press the up arrow to feed the dog milk!",130,20)
  text("Food Remaining: " + foodObject.foodStock,550,130);



}






function feedDog(){
  dog.addImage(happyDog);
  foodObject.deductFood();
}

function addFoods(){
  foodObject.foodStock++;
  dog.addImage(normalDog);
  foodObject.updateFoodStock();
}


function showError(){
  console.log("ERROR");
}

function readStock(){
  foodObject.updateFoodStock();
}
