function SCENE2()
{

    // GAME VARIABLES -----------------------------------//
    var screenWidth = 569;
    var screenHeight = 320;

    console.log("%cSCREEN DIMENSIONS:" + screenWidth +"x"+ screenHeight,"color:#DC143C");

    var keyboard = null;
	var mouse = null;
    var touch = null;

    var time = null;

    var screenFlicker = null;
    
    var cactusGameObject = null;
    var cactusPosition = null;

    var bushGameObject = null;
    var bushPosition = null;

    var tileGround = null;
    var tileGroundSize = null;
   
    
    var tileGroundPosition = null;
    var tileGroundPositionLength = null;
    var ground = null;
    var groundVelocity = 0;
    var groundSpeed = 30;

    var birdGameObject = null;
 	var birdPosition = null;
    var birdSize =  null;


    var gravity = 50;
    var flapAnimationSpeedHigh = 5;
    var flapAnimationSpeedMedium = 15;
 	var startFlap = false;
 	var flapVelocity = 0;
    var flapAccentSpeed = 80;
 	var momentum = 0;
   
 	var movementSpeed = 50; 
 	var movementVelocity = 0;

    var speedFar = 1;
    var speedNear = 0; 

    var index = 0;

    var scene1 = new CGameScene;

    scene1.initScene = INIT;
    scene1.startScene = LOOP;
    scene1.endScene = END;

    return scene1;


    function INIT(){
        console.log("%cINITIALIZING GAME SCENE","color:#DC143C");
        SIB.SCREENMANAGER.createLayer(['foreground-layer','background-layer'],screenWidth,screenHeight);
        SIB.SCREENMANAGER.assignLayerToDivElement(['foreground-layer','background-layer'],'screen');

        SIB.SCREENMANAGER.setLayerBackgroundColor('foreground-layer','transparent');

        SIB.SCREENMANAGER.setLayerBackgroundColor('background-layer','#CFCFCF');

        // SIB.SCREENMANAGER.setLayerBackgroundColor('background-layer','#E6E6E6');
        // SIB.SCREENMANAGER.setLayerBackgroundColor('background-layer','#191919');


        SIB.SCREENMANAGER.setLayerZIndex('foreground-layer',2);
        SIB.SCREENMANAGER.setLayerZIndex('background-layer',0);

        SIB.SCREENMANAGER.enableLayerClearEachObject(false);
        SIB.SCREENMANAGER.enableLayerClearUpdate('background-layer',false);



        // SETUP SOUND EFFECTS
        
        SIB.SOUNDMANAGER.loadSound('flap_fast','sound/fly/BirdFlap.ogg');
        // SIB.SOUNDMANAGER.loadSound('film_rolling','sound/filmrolling.ogg');
        // SIB.SOUNDMANAGER.loadSound('music','music/IFoundAMillionDollarBaby.ogg');
        
        // SIB.SOUNDMANAGER.enableLoop('film_rolling',true);
        // SIB.SOUNDMANAGER.playSound('film_rolling');

        // SIB.SOUNDMANAGER.enableLoop('music',true);
        // SIB.SOUNDMANAGER.playSound('music');


        // SETUP SPRITES -----------------------------------//
        SIB.SPRITEMANAGER.loadSpriteSheet('Spritesheet','spritesheet.png');
        SIB.SPRITEMANAGER.loadSpriteSheet('FlickerSpritesheet','flickerspritesheet.png');

        SIB.SPRITEMANAGER.createSprite('bird32Sprite','Spritesheet').addFrame('fly',[{"x":76,"y":171,"w":32,"h":28},{"x":129,"y":210,"w":32,"h":28}]);
        SIB.SPRITEMANAGER.createSprite('groundSprite','Spritesheet').addFrame('ground',[{"x":186,"y":212,"w":61,"h":64}]); 
        SIB.SPRITEMANAGER.createSprite('mountain','Spritesheet').addFrame('mountain',[{"x":0,"y":288,"w":640,"h":182}]);
        SIB.SPRITEMANAGER.createSprite('cactus','Spritesheet').addFrame('cactus',[{"x":0,"y":105,"w":75,"h":104}]);
        SIB.SPRITEMANAGER.createSprite('bush','Spritesheet').addFrame('bush',[{"x":0,"y":210,"w":128,"h":77}]);
        SIB.SPRITEMANAGER.createSprite('coin','Spritesheet').addFrame('coin',[
            {"x":105,"y":138,"w":32,"h":32},
            {"x":109,"y":105,"w":28,"h":32},
            {"x":159,"y":138,"w":20,"h":32},
            {"x":162,"y":239,"w":7,"h":32},
            {"x":138,"y":138,"w":20,"h":32},
            {"x":76,"y":138,"w":28,"h":32},
            {"x":76,"y":105,"w":32,"h":32}]);

        SIB.SPRITEMANAGER.createSprite('sun','Spritesheet').addFrame('sun',[{"x":279,"y":129,"w":128,"h":128}]);
        SIB.SPRITEMANAGER.selectSprite('sun').addFrame('sunBlink',[{"x":279,"y":0,"w":128,"h":128}]);

        SIB.SPRITEMANAGER.createSprite('screenFlicker','FlickerSpritesheet').addFrame('flicker',[
            {"x":0,"y":0,"w":569,"h":320},
            {"x":0,"y":321,"w":569,"h":320}]);


        // SETUP GAMEOBJECTS -----------------------------------//
        SIB.GAMEOBJECTMANAGER.createGameObject('bird32');
        SIB.SPRITEMANAGER.registerGameObjectForSprite('bird32','bird32Sprite',true);
        SIB.GAMEOBJECTMANAGER.selectGameObject('bird32').requestSprite.setIdleSprite('fly',1);

        SIB.GAMEOBJECTMANAGER.createGameObject('ground');
        SIB.SPRITEMANAGER.registerGameObjectForSprite('ground','groundSprite',false);
        SIB.GAMEOBJECTMANAGER.selectGameObject('ground').requestSprite.setIdleSprite('ground',1);

        SIB.GAMEOBJECTMANAGER.createGameObject('mountain');
        SIB.SPRITEMANAGER.registerGameObjectForSprite('mountain','mountain',false);
        SIB.GAMEOBJECTMANAGER.selectGameObject('mountain').requestSprite.setIdleSprite('mountain',1);
        SIB.GAMEOBJECTMANAGER.selectGameObject('mountain').setPosition(0,75);

        SIB.GAMEOBJECTMANAGER.createGameObject('sun');
        SIB.SPRITEMANAGER.registerGameObjectForSprite('sun','sun',false);
        SIB.GAMEOBJECTMANAGER.selectGameObject('sun').requestSprite.setIdleSprite('sun',1);
        SIB.GAMEOBJECTMANAGER.selectGameObject('sun').setPosition(330,10);

        SIB.GAMEOBJECTMANAGER.createGameObject('cactus');
        SIB.SPRITEMANAGER.registerGameObjectForSprite('cactus','cactus',false);
        SIB.GAMEOBJECTMANAGER.selectGameObject('cactus').requestSprite.setIdleSprite('cactus',1);
        SIB.GAMEOBJECTMANAGER.selectGameObject('cactus').setPosition(200,152);

        SIB.GAMEOBJECTMANAGER.createGameObject('bush');
        SIB.SPRITEMANAGER.registerGameObjectForSprite('bush','bush',false);
        SIB.GAMEOBJECTMANAGER.selectGameObject('bush').requestSprite.setIdleSprite('bush',1);
        SIB.GAMEOBJECTMANAGER.selectGameObject('bush').setPosition(300,178);
     
        SIB.GAMEOBJECTMANAGER.createGameObject('coin');
        SIB.SPRITEMANAGER.registerGameObjectForSprite('coin','coin',true);
        SIB.GAMEOBJECTMANAGER.selectGameObject('coin').requestSprite.setIdleSprite('coin',1);
        SIB.GAMEOBJECTMANAGER.selectGameObject('coin').setPosition(200,100);
        SIB.GAMEOBJECTMANAGER.selectGameObject('coin').requestSprite.playSpriteAnimation('coin',10);
        SIB.GAMEOBJECTMANAGER.selectGameObject('coin').requestSprite.tileEnable();
        SIB.GAMEOBJECTMANAGER.selectGameObject('coin').requestSprite.tileSetAmount(3);
        

        SIB.GAMEOBJECTMANAGER.createGameObject('screenFlicker');
        SIB.SPRITEMANAGER.registerGameObjectForSprite('screenFlicker','screenFlicker',true);
        SIB.GAMEOBJECTMANAGER.selectGameObject('screenFlicker').requestSprite.setIdleSprite('flicker',1);
        SIB.GAMEOBJECTMANAGER.selectGameObject('screenFlicker').requestSprite.setSpriteAnimationOverlayFrame('flicker',2);
        SIB.GAMEOBJECTMANAGER.selectGameObject('screenFlicker').requestSprite.playSpriteAnimationOverlay('flicker',4);

        SIB.GAMEOBJECTMANAGER.setGameObjectsLayer(['bird32','ground','screenFlicker','cactus','bush','coin'],'foreground-layer');
        SIB.GAMEOBJECTMANAGER.setGameObjectsLayer(['sun','mountain'],'background-layer');

        SIB.GAMEOBJECTMANAGER.setGameObjectZIndex('bird32',5);
        SIB.GAMEOBJECTMANAGER.setGameObjectZIndex('screenFlicker',50);
        SIB.GAMEOBJECTMANAGER.setGameObjectZIndex('mountain',20);
        SIB.GAMEOBJECTMANAGER.setGameObjectZIndex('coin',4);




        // SETUP INPUTS -----------------------------------//
        SIB.INPUTMANAGER.addKey('arrowLeft',37);
        SIB.INPUTMANAGER.addKey('arrowRight',39);
        SIB.INPUTMANAGER.addKey('arrowUp',38);
        SIB.INPUTMANAGER.addKey('arrowDown',40);
        SIB.INPUTMANAGER.addKey('spaceBar',32);

        




        // SETUP GAME VARIABLES-----------------------------------//
        keyboard = SIB.INPUTMANAGER.getKeyboard();
        mouse = SIB.INPUTMANAGER.getMouse();
        touch = SIB.INPUTMANAGER.getTouch();

        time = SIB.TIMEMANAGER.getTime();

        screenFlicker = SIB.GAMEOBJECTMANAGER.selectGameObject('screenFlicker');
        
        cactusGameObject = SIB.GAMEOBJECTMANAGER.selectGameObject('cactus');
        cactusPosition = cactusGameObject.getPosition();

        bushGameObject = SIB.GAMEOBJECTMANAGER.selectGameObject('bush');
        bushPosition = bushGameObject.getPosition();

        tileGround = SIB.GAMEOBJECTMANAGER.selectGameObject('ground');
        tileGroundSize = tileGround.requestSprite.getSpriteSize();
        tileGround.setPosition(0,screenHeight-tileGroundSize.h);
        tileGround.requestSprite.tileEnable(); 
        tileGround.requestSprite.tileSetAmount(Math.ceil(screenWidth/tileGroundSize.w)+1);
        tileGround.requestSprite.tileSetPosition(0,screenHeight-tileGroundSize.h);
        
        tileGroundPosition = tileGround.requestSprite.tileGetPosition();
        tileGroundPositionLength = tileGroundPosition.length;
        ground = screenHeight - tileGroundSize.h;
        groundVelocity = 0;
        groundSpeed = 30;

        birdGameObject = SIB.GAMEOBJECTMANAGER.selectGameObject('bird32');
        birdPosition = SIB.GAMEOBJECTMANAGER.selectGameObject('bird32').getPosition();
        birdSize =  birdGameObject.requestSprite.getSpriteSize();
        birdPosition.x = 100;
        birdPosition.y = 30;
    }

    function LOOP(){

        movementVelocity = Math.round(movementSpeed/time.deltaTime);
        groundVelocity = Math.round(groundSpeed/time.deltaTime);

        if(keyboard.arrowLeft){
            birdPosition.x -= movementVelocity;
            birdGameObject.requestSprite.playSpriteAnimation('fly',flapAnimationSpeedHigh);
            birdGameObject.requestSprite.flipHorizontal(true);
 
        }

        if(keyboard.arrowRight){
            birdPosition.x += movementVelocity;
            birdGameObject.requestSprite.playSpriteAnimation('fly',flapAnimationSpeedHigh);
            birdGameObject.requestSprite.flipHorizontal(false); 
        }

        if(keyboard.arrowUp){
            birdPosition.y -= movementVelocity;
        }

        if(keyboard.arrowDown){
            birdPosition.y += movementVelocity;
        }

        if(!keyboard.spaceBar){
            birdGameObject.requestSprite.playSpriteAnimation('fly',flapAnimationSpeedMedium);
        }

		if(keyboard.spaceBar||touch.touchStart){
            SIB.SOUNDMANAGER.playSound('flap_fast');

            birdGameObject.requestSprite.playSpriteAnimation('fly',flapAnimationSpeedHigh);
            flapVelocity = flapAccentSpeed; 
            startFlap = true;
		} 

		if(startFlap){
			flapVelocity -= gravity/time.deltaTime;
			birdPosition.y -= flapVelocity/time.deltaTime;
						
			if((birdPosition.y+birdSize.h) >= ground){
				birdPosition.y = ground-birdSize.h;
				flapVelocity = 0;
				momentum = 0;
				startFlap = false;
			}
			
		}    

        // if(birdPosition.x+birdSize.w < 0)
        //     birdPosition.x = screenWidth;
        // else if(birdPosition.x>screenWidth)
        //     birdPosition.x = -birdSize.w;


        for(index = 0; index < tileGroundPositionLength; index++){

            tileGroundPosition[index].x -= groundVelocity;

            if((tileGroundPosition[index].x+tileGroundSize.w) < 0){
                index == 0 ? tileGroundPosition[index].x = tileGroundPosition[tileGroundPositionLength-1].x+tileGroundSize.w-groundVelocity
                :tileGroundPosition[index].x = tileGroundPosition[index-1].x+tileGroundSize.w;
            }

        }
		
    }
 
 	function END(){
        console.log("%cENDING GAME SCENE","color:#DC143C");

        scene1 = null;
    }

};   