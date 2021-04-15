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
var backgroundImg2;

function preload() {
   // getBackgroundImg();
   backgroundImg = loadImage(bg);
   backgroundImg2 = loadImage("sprites/background2.png");

   candy1I = loadImage("sprites/candy1.png");
   candy2I = loadImage("sprites/candy2.png");
   candy3I = loadImage("sprites/candy3.png");

   stoneImg = loadImage("sprites/Bomb.png");

   cartImg = loadImage("sprites/bowl.png");
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    candiesGroup = new Group();
    stonesGroup = new Group();

    gameState = "serve";

    ground = createSprite(600,height,1200,20);

    cart = createSprite(550,540,5,20);
    cart.addImage(cartImg);
    cart.scale = 0.3;




    
}

function draw(){
    if(gameState === "serve"){
        background(backgroundImg);
        fill("black");
        textSize(30);
        text("Welcome to Catching Candies", 400, 100);

        fill("black");
        textSize(20);
        text("-We need someone to catch candies for our king.",425,200);
        text("-Can you do it please? We know you will.",425,220);
        text("-Use the 'LEFT' and 'RIGHT' arrow key to move our basket.",425,240);
        text("-Catch as many candies you can.",425,260);
        text("-But beware of the bombs falling. If you catch any of them you will lose.",425,280);
        textSize(30);
        text("-GOOD LUCK!",425,330);

        strokeWeight(15);
        textSize(30);
        text("Press 'Space' to start", 500,400);

        cart.visible = false;
        ground.visible = false;

        if(keyDown("space")){
            gameState = "start";
        }

    }

    if(gameState === "start"){
        background(backgroundImg2);

        cart.visible = true;
        ground.visible = true;

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

        if(stonesGroup.isTouching(ground)){
            stonesGroup.destroyEach();

        }
        if(stonesGroup.isTouching(cart)){
            stonesGroup.destroyEach();
            gameState = "over";

        }

    }

    if(gameState === "over"){
        background("pink");
        fill("black");
        textSize(50);
        text("YOU LOSE THE GAME",300,300);

        // textSize(30);
        // text("Press 'Shift' to play again",300,200);

        // if(keyDown("shift")){
        //     gameState = "start";
        // }

        cart.destroy();
        candies.destroyEach();
        rock.destroyEach();
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

            candy.lifetime = 150;
        }
        candiesGroup.add(candy);
    }
}

function rock(){
    if(frameCount % 100 === 0){
        var stone = createSprite(0,0,50,50);
        stone.addImage(stoneImg);
        stone.x = random(10,1100);
        stone.y = random(100,100);
        stone.velocityY = 6;
        stone.scale = 0.1;

        var rand = Math.round(random(1,3));
        switch(rand){
            case 1: stone.addImage(stoneImg);
                    break;
            case 2: stone.addImage(stoneImg);
                    break;
            case 3: stone.addImage(stoneImg);
                    break;
            default: break;

            stone.lifetime = 150;

        
        }
        stonesGroup.add(stone);
}
}
