var mainCharacter, mainCharacterImg;
var ground;
var bgImg;
var blocker1, blocker2;
var scene, sceneIMG;

var gameState = 1;
var PLAY = 1;
var END = 0;

var score = 0;
var coin1, coin2, coin3, coinImg;
var blockerIMG;

var GRAVITY = 2;
var JUMP = 15;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	mainCharacterImg = loadImage("assets/character.png");
	coinImg = loadImage("assets/coin.png")
	sceneIMG = loadImage("assets/background.jpg");
	blockerIMG = loadImage("assets/blocker.png")
}

function setup() {
	mainCharacterGroup = new Group();
	groundGroup = new Group();
	blockerGroup = new Group();
	coinGroup = new Group();

	createCanvas(windowWidth, windowHeight);

	engine = Engine.create();
	world = engine.world;

	//Sprite Area.

	scene = createSprite(windowWidth/2, windowHeight/2);
	scene.addImage(sceneIMG);
	scene.scale = 1.35

	mainCharacter = createSprite(windowWidth / 15, windowHeight / 1.16, 40, 60);
	mainCharacter.addImage(mainCharacterImg);
	mainCharacter.scale = 0.3
	mainCharacterGroup.add(mainCharacter);
	mainCharacter.debug = true;
	mainCharacter.setCollider("rectangle", -50, 50, 100, 200)

	ground = createSprite(0, windowHeight / 1.1, 5000, 20)
	groundGroup.add(ground);

	blocker1 = createSprite(windowWidth / 1.013, windowHeight / 2, 20, 1000)

	blocker2 = createSprite(windowWidth / 2, windowHeight / 1.12, 20, 20)
	blockerGroup.add(blocker2);
	Engine.run(engine);

	blocker3 = createSprite(windowWidth / 1.3, windowHeight / 1.12, 20, 20)
	blockerGroup.add(blocker3);

	blocker4 = createSprite(windowWidth / 4, windowHeight / 1.12, 20, 20)
	blockerGroup.add(blocker4);

	coin1 = createSprite(windowWidth/2.8, windowHeight/1.15, 20, 20);
	coin1.addImage(coinImg);
	coin1.scale = 0.060
	coinGroup.add(coin1);

	coin2 = createSprite(windowWidth/1.5, windowHeight/1.15, 20, 20);
	coin2.addImage(coinImg);
	coin2.scale = 0.060
	coinGroup.add(coin2);

	coin3 = createSprite(windowWidth/1.2, windowHeight/1.15, 20, 20);
	coin3.addImage(coinImg);
	coin3.scale = 0.060
	coinGroup.add(coin3);

	//Create the Bodies Here.
	
}


function draw() {
	background(0);
	camera.positionX = mainCharacter.positionX;
	gameState = PLAY;
	mainCharacter.collide(ground);
	mainCharacter.velocityX = 6;

	mainCharacter.velocity.y += GRAVITY;

  if(mainCharacter.collide(ground)) {
    mainCharacter.velocity.y = 0;
  }

  if(keyWentDown("space") || mouseWentDown(LEFT)){
    mainCharacter.velocity.y = -JUMP;
  }

    function keyReleased() {
        if (key != ' '){
            mainCharacter.setDir(0);
        }
    }

	if (mainCharacter.collide(blockerGroup)) {
		gameState = END;
		defeat();
	}

	coinCollision();

	if (mainCharacter.collide(blocker1)) {
		gameState = END;
		victory();
	}

	if(gameState === END){
		mainCharacter.destroy();
		blockerGroup.destroy();
	}

	drawSprites();

	fill("yellow");
	textSize(50)
	text("Score: " + score, windowWidth/1.18, windowHeight/15);
	fill("white")
	textSize(30)
	text("Press 'Space' or 'Left Mouse Button' to Jump", windowWidth/20, windowHeight/18);

}

function victory() {
	textSize(80);
	fill("yellow");
	text("Victory!", windowWidth/2.5, windowHeight/2);
}

function defeat() {
	textSize(80);
	fill("red");
	text("You Lose!!", windowWidth/2.5, windowHeight/1.9);
}

function coinCollision(){
	if(mainCharacter.collide(coin1)){
		coin1.destroy();
		score = 30
	}

	if(mainCharacter.collide(coin2)){
		coin2.destroy();
		score = 60
	}

	if(mainCharacter.collide(coin3)){
		coin3.destroy();
		score = 90
	}
}