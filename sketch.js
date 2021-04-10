const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var cart,cartImg;
var stone,stoneImg;
var stonesGroup;
var backgroundImg;
var candy,candiesGroup;

var candy1I,candy2I,candy3I;

var gameState;
var score = 0;

//var gameState = "onSling";
var bg = "sprites/background.jpg";
//var score = 0;
var backgroundImg;

function preload() {
   // getBackgroundImg();
   backgroundImg = loadImage(bg);

   candy1I = loadImage("sprites/candy1.png");
   candy2I = loadImage("sprites/candy2.png");
   candy3I = loadImage("sprites/candy3.png");

   stoneImg = loadImage("sprites/rock.png");

   cartImg = loadImage("sprites/bowl.png");
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    candiesGroup = new Group();
    stonesGroup = new Group();

    gameState = "start";

    ground = createSprite(600,height,1200,20);

    cart = createSprite(550,540,5,20);
    cart.addImage(cartImg);
    cart.scale = 0.3;


    
}

function draw(){

    if(gameState === "start"){
        background(backgroundImg);

        noStroke();
        textSize(35)
        fill("red")
        text("Score  " + score, width-300, 50)

        candies();
        rock();

        if(keyDown(RIGHT_ARROW)){
            cart.x = cart.x + 8;
        }
        if(keyDown(LEFT_ARROW)){
            cart.x = cart.x - 8;
        }
    
    if(cart.x > 1100 || cart.x < 5){
        cart.x = 600;
    }

        if(candiesGroup.isTouching(cart)){
            candiesGroup.destroyEach();
            score = score+1;
        }
        if(candiesGroup.isTouching(ground)){
            candiesGroup.destroyEach();

        }

        if(stone.isTouching(ground)){
            stone.destroyEach();

        }

    }
    drawSprites();

    
       
}

function candies(){
    if(frameCount % 80 === 0){
        var candy = createSprite(0,0,50,50);
        candy.x = random(10,1100);
        candy.y = random(100,100);
        candy.velocityY = 6;
        candy.scale = 0.1;

        var rand = Math.round(random(1,3));
        switch(rand){
            case 1: candy.addImage(candy1I);
                    break;
            case 2: candy.addImage(candy2I);
                    break;
            case 3: candy.addImage(candy3I);
                    break;
            default: break;
        }
        candiesGroup.add(candy);
    }
}

function rock(){
    if(frameCount % 50 === 0){
        var stone = createSprite(0,0,50,50);
        stone.addImage(stoneImg);
        stone.x = random(10,1100);
        stone.y = random(100,100);
        stone.velocityY = 6;
        stone.scale = 0.1;

        
        }
        //stonesGroup.add(stone);
}


// function mouseDragged(){
//     //if (gameState!=="launched"){
//         Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
//     //}
// }


// function mouseReleased(){
//     slingshot.fly();
//     gameState = "launched";
// }

// function keyPressed(){
//     if(keyCode === 32 && bird.body.speed<1){
//         bird.trajectory=[];
//         Matter.Body.setPosition(bird.body,{x: 200, y: 50});
//        slingshot.attach(bird.body);
//     }
// }

// async function getBackgroundImg(){
//     var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
//     var responseJSON = await response.json();

//     var datetime = responseJSON.datetime;
//     var hour = datetime.slice(11,13);
    
//     if(hour>=06 && hour<=19){
//         bg = "sprites/background.jpg";
//     }
//     else{
//         bg = "sprites/background.jpg";
//     }

//     backgroundImg = loadImage(bg);
//     console.log(backgroundImg);
// }