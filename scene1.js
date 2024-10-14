function SCENE1() {
  // GAME VARIABLES -----------------------------------//
  var screenWidth = 569;
  var screenHeight = 320;

  console.log(
    "%cSCREEN DIMENSIONS:" + screenWidth + "x" + screenHeight,
    "color:#DC143C"
  );

  var keyboard = null;
  var mouse = null;
  var touch = null;

  var time = null;

  var screenFlicker = null;

  var layerForegroundID = 0;
  var layerBackgroundID = 0;

  var mountainID = 0;
  var mountainSpriteID = 0;
  var mountainFrameID = 0;

  var sunID = 0;
  var sunSpriteID = 0;
  var sunFrameID = 0;

  var screenFlickerID = 0;
  var screenFlickerSpriteID = 0;
  var screenFlickerFrameID = 0;

  var cactusID = 0;
  var cactusSpriteID = 0;
  var cactusFrameID = 0;
  var cactusGameObject = null;
  var cactusPosition = null;
  var cactusSize = null;

  var bushID = 0;
  var bushSpriteID = 0;
  var bushFrameID = 0;
  var bushGameObject = null;
  var bushPosition = null;
  var bushSize = null;

  var tileGroundID = 0;
  var tileGroundSpriteID = 0;
  var tileGroundFrameID = 0;
  var tileGround = null;
  var tileGroundSize = null;

  var tileGroundPosition = null;
  var tileGroundPositionLength = null;
  var ground = null;
  var groundVelocity = 0;
  var groundSpeed = 30;

  var birdID = 0;
  var birdSpriteID = 0;
  var birdFrameID = 0;
  var birdGameObject = null;
  var birdPosition = null;
  var birdSize = null;

  var coinID = 0;
  var coinSpriteID = 0;
  var coinFrameID = 0;
  var coinTiledPosition = null;
  var coinTiledSize = null;
  var coinTiledLength = 0;
  var randomYIndex = 0;
  var randomY = [];

  var gravity = 70;
  var momentum = 0;

  var flapAnimationSpeedHigh = 5;
  var flapAnimationSpeedMedium = 15;
  var flapStart = false;
  var flapVelocity = 0;
  var flapAccentSpeed = 80;

  var soundBirdFlapping = null;
  var soundCoinCollect = null;
  var soundFilmRolling = null;
  var soundMusic = null;
  var soundBackgroundState = false;

  var movementSpeed = 50;
  var movementVelocity = 0;

  var speedFar = 1;
  var speedNear = 0;

  var isPlayerFirstKeyPress = false;

  var scene1 = new CScene();

  scene1.initScene = INIT;
  scene1.startScene = LOOP;
  scene1.endScene = END;

  return scene1;

  function coinCollissionBehavior(ct, o1, o2) {
    if (ct === COLLISSION_TYPE_TILE) {
      o1._position.x = screenWidth;
      o1._position.y = randomY[randomYIndex++];
      randomYIndex %= randomY.length;
    }
    soundCoinCollect.playSound();
  }

  function INIT() {
    console.log("%cINITIALIZING GAME SCENE", "color:#DC143C");
    layerForegroundID = SIB_ScreenManager.createScreen(
      screenWidth,
      screenHeight
    );
    SIB_ScreenManager.assignScreenToDivElement(layerForegroundID, "screen");
    layerBackgroundID = SIB_ScreenManager.createScreen(
      screenWidth,
      screenHeight
    );
    SIB_ScreenManager.assignScreenToDivElement(layerBackgroundID, "screen");

    SIB_ScreenManager.setScreenBackgroundColor(
      layerForegroundID,
      "transparent"
    );

    // SIB_ScreenManager.setScreenBackgroundColor('background-screen','#AFEEEE');
    SIB_ScreenManager.setScreenBackgroundColor(layerBackgroundID, "#CFCFCF");
    // SIB_ScreenManager.setScreenBackgroundColor('background-screen','#E6E6E6');
    // SIB_ScreenManager.setScreenBackgroundColor('background-screen','#191919');

    SIB_ScreenManager.setScreenZIndex(layerForegroundID, 2);
    SIB_ScreenManager.setScreenZIndex(layerBackgroundID, 0);

    SIB_ScreenManager.enableScreenClearEachObject(false);
    SIB_ScreenManager.enableScreenClearUpdate(layerBackgroundID, false);

    SIB_ScreenManager.setScreenSize(screenWidth, screenHeight);

    // SETUP SOUND EFFECTS

    soundBirdFlapping = SIB_SoundManager.createSound("sound/birdflap.ogg");
    soundCoinCollect = SIB_SoundManager.createSound("sound/coin.ogg", 4);
    soundFilmRolling = SIB_SoundManager.createSound("sound/filmrolling.ogg");
    soundMusic = SIB_SoundManager.createSound("music/milliondollarbaby.ogg");

    soundMusic.adjustVolume(0.2);
    soundFilmRolling.adjustVolume(0.2);
    soundBirdFlapping.adjustVolume(0.09);
    soundCoinCollect.adjustVolume(1.0);

    soundFilmRolling.enableLoop(true);
    // soundFilmRolling.playSound();

    soundMusic.enableLoop(true);
    // soundMusic.playSound();

    // SETUP SPRITES -----------------------------------//
    SIB_SpriteManager.loadSpriteSheet("Spritesheet", "art/spritesheet-bw.png");
    SIB_SpriteManager.loadSpriteSheet(
      "FlickerSpritesheet",
      "art/flickerspritesheet.png"
    );

    birdSpriteID = SIB_SpriteManager.createSprite("Spritesheet");
    birdFrameID = SIB_SpriteManager.selectSprite(birdSpriteID).addFrame([
      { x: 76, y: 171, w: 32, h: 28 },
      { x: 129, y: 210, w: 32, h: 28 },
    ]);

    tileGroundSpriteID = SIB_SpriteManager.createSprite("Spritesheet");
    tileGroundFrameID = SIB_SpriteManager.selectSprite(
      tileGroundSpriteID
    ).addFrame([{ x: 186, y: 212, w: 61, h: 64 }]);

    mountainSpriteID = SIB_SpriteManager.createSprite("Spritesheet");
    mountainFrameID = SIB_SpriteManager.selectSprite(mountainSpriteID).addFrame(
      [{ x: 0, y: 288, w: 640, h: 182 }]
    );

    cactusSpriteID = SIB_SpriteManager.createSprite("Spritesheet");
    cactusFrameID = SIB_SpriteManager.selectSprite(cactusSpriteID).addFrame([
      { x: 0, y: 105, w: 75, h: 104 },
    ]);

    bushSpriteID = SIB_SpriteManager.createSprite("Spritesheet");
    bushFrameID = SIB_SpriteManager.selectSprite(bushSpriteID).addFrame([
      { x: 0, y: 210, w: 128, h: 77 },
    ]);

    coinSpriteID = SIB_SpriteManager.createSprite("Spritesheet");
    coinFrameID = SIB_SpriteManager.selectSprite(coinSpriteID).addFrame([
      { x: 105, y: 138, w: 32, h: 32 },
      { x: 109, y: 105, w: 28, h: 32 },
      { x: 159, y: 138, w: 20, h: 32 },
      { x: 162, y: 239, w: 7, h: 32 },
      { x: 138, y: 138, w: 20, h: 32 },
      { x: 76, y: 138, w: 28, h: 32 },
      { x: 76, y: 105, w: 32, h: 32 },
    ]);

    sunSpriteID = SIB_SpriteManager.createSprite("Spritesheet");
    sunFrameID = SIB_SpriteManager.selectSprite(sunSpriteID).addFrame([
      { x: 279, y: 129, w: 128, h: 128 },
    ]);

    // SIB_SpriteManager.selectSprite('sun').addFrame('sunBlink',[{"x":279,"y":0,"w":128,"h":128}]);

    screenFlickerSpriteID =
      SIB_SpriteManager.createSprite("FlickerSpritesheet");
    screenFlickerFrameID = SIB_SpriteManager.selectSprite(
      screenFlickerSpriteID
    ).addFrame([
      { x: 0, y: 0, w: 569, h: 320 },
      { x: 0, y: 321, w: 569, h: 320 },
    ]);

    // SETUP GAMEOBJECTS -----------------------------------//
    birdID = SIB_GameObjectManager.createGameObject();
    SIB_SpriteManager.registerGameObjectForSpriteRequest(
      birdID,
      birdSpriteID,
      true
    );
    SIB_SpriteManager.spriteRequest(birdID).setIdleSpriteFrame(birdFrameID, 1);

    tileGroundID = SIB_GameObjectManager.createGameObject();
    SIB_SpriteManager.registerGameObjectForSpriteRequest(
      tileGroundID,
      tileGroundSpriteID,
      false
    );
    SIB_SpriteManager.spriteRequest(tileGroundID).setIdleSpriteFrame(
      tileGroundFrameID,
      1
    );

    mountainID = SIB_GameObjectManager.createGameObject();
    SIB_SpriteManager.registerGameObjectForSpriteRequest(
      mountainID,
      mountainSpriteID,
      false
    );
    SIB_SpriteManager.spriteRequest(mountainID).setIdleSpriteFrame(
      mountainFrameID,
      1
    );
    SIB_GameObjectManager.selectGameObject(mountainID).setPosition(0, 75);

    sunID = SIB_GameObjectManager.createGameObject();
    SIB_SpriteManager.registerGameObjectForSpriteRequest(
      sunID,
      sunSpriteID,
      false
    );
    SIB_SpriteManager.spriteRequest(sunID).setIdleSpriteFrame(sunFrameID, 1);
    SIB_GameObjectManager.selectGameObject(sunID).setPosition(330, 10);

    cactusID = SIB_GameObjectManager.createGameObject();
    SIB_SpriteManager.registerGameObjectForSpriteRequest(
      cactusID,
      cactusSpriteID,
      false
    );
    SIB_SpriteManager.spriteRequest(cactusID).setIdleSpriteFrame(
      cactusFrameID,
      1
    );
    SIB_GameObjectManager.selectGameObject(cactusID).setPosition(200, 152);

    bushID = SIB_GameObjectManager.createGameObject();
    SIB_SpriteManager.registerGameObjectForSpriteRequest(
      bushID,
      bushSpriteID,
      false
    );
    SIB_SpriteManager.spriteRequest(bushID).setIdleSpriteFrame(bushFrameID, 1);
    SIB_GameObjectManager.selectGameObject(bushID).setPosition(300, 179);

    coinID = SIB_GameObjectManager.createGameObject();
    SIB_SpriteManager.registerGameObjectForSpriteRequest(
      coinID,
      coinSpriteID,
      true
    );
    SIB_SpriteManager.spriteRequest(coinID).setIdleSpriteFrame(coinFrameID, 1);
    SIB_SpriteManager.spriteRequest(coinID).playSpriteAnimationFrame(
      coinFrameID,
      10
    );
    SIB_GameObjectManager.selectGameObject(coinID).setPosition(200, 100);
    SIB_SpriteManager.spriteRequest(coinID).tileEnable();
    SIB_SpriteManager.spriteRequest(coinID).tileSetAmount(5);

    screenFlickerID = SIB_GameObjectManager.createGameObject();
    SIB_SpriteManager.registerGameObjectForSpriteRequest(
      screenFlickerID,
      screenFlickerSpriteID,
      true
    );
    SIB_SpriteManager.spriteRequest(screenFlickerID).setIdleSpriteFrame(
      screenFlickerFrameID,
      1
    );
    SIB_SpriteManager.spriteRequest(
      screenFlickerID
    ).setSpriteAnimationOverlayFrame(screenFlickerFrameID, 2);
    SIB_SpriteManager.spriteRequest(screenFlickerID).playSpriteAnimationOverlay(
      4
    );

    SIB_GameObjectManager.setGameObjectsLayer(
      [birdID, tileGroundID, screenFlickerID, cactusID, bushID, coinID],
      layerForegroundID
    );
    SIB_GameObjectManager.setGameObjectsLayer(
      [sunID, mountainID],
      layerBackgroundID
    );

    SIB_GameObjectManager.setGameObjectZIndex(birdID, 5);
    SIB_GameObjectManager.setGameObjectZIndex(screenFlickerID, 50);
    SIB_GameObjectManager.setGameObjectZIndex(mountainID, 20);
    SIB_GameObjectManager.setGameObjectZIndex(coinID, 4);

    // SETUP INPUTS -----------------------------------//
    SIB_InputManager.addKey("arrowLeft", 37);
    SIB_InputManager.addKey("arrowRight", 39);
    SIB_InputManager.addKey("arrowUp", 38);
    SIB_InputManager.addKey("arrowDown", 40);
    SIB_InputManager.addKey("spaceBar", 32);

    // SETUP GAME VARIABLES-----------------------------------//
    keyboard = SIB_InputManager.getKeyboard();
    mouse = SIB_InputManager.getMouse();
    touch = SIB_InputManager.getTouch();

    time = SIB_TimeManager.getTime();

    screenFlicker = SIB_GameObjectManager.selectGameObject(screenFlickerID);

    cactusGameObject = SIB_GameObjectManager.selectGameObject(cactusID);
    cactusPosition = cactusGameObject.getPosition();
    cactusSize = SIB_SpriteManager.spriteRequest(cactusID).getSpriteSize();

    bushGameObject = SIB_GameObjectManager.selectGameObject(bushID);
    bushPosition = bushGameObject.getPosition();
    bushSize = SIB_SpriteManager.spriteRequest(bushID).getSpriteSize();

    tileGround = SIB_GameObjectManager.selectGameObject(tileGroundID);
    tileGroundSpriteRequest = SIB_SpriteManager.spriteRequest(tileGroundID);
    tileGroundSize = tileGroundSpriteRequest.getSpriteSize();
    tileGround.setPosition(0, screenHeight - tileGroundSize.h);
    tileGroundSpriteRequest.tileEnable();
    tileGroundSpriteRequest.tileSetAmount(
      Math.ceil(screenWidth / tileGroundSize.w) + 1
    );
    tileGroundSpriteRequest.tileSetPosition(0, screenHeight - tileGroundSize.h);
    tileGroundPosition = tileGround.getPosition();
    tileGroundPositionLength = tileGroundPosition.length;
    ground = screenHeight - tileGroundSize.h;
    groundVelocity = 0;
    groundSpeed = 30;

    birdGameObject = SIB_GameObjectManager.selectGameObject(birdID);
    birdSpriteRequest = SIB_SpriteManager.spriteRequest(birdID);
    birdPosition = SIB_GameObjectManager.selectGameObject(birdID).getPosition();
    birdSize = birdSpriteRequest.getSpriteSize();
    birdPosition.x = 100;
    birdPosition.y = 30;

    SIB_CollissionManager.registerGameObjectForCollissionRequest(
      birdID,
      true,
      true,
      true
    );
    SIB_CollissionManager.registerGameObjectForCollissionRequest(
      coinID,
      false,
      true,
      true
    );

    coinTiledPosition =
      SIB_GameObjectManager.selectGameObject(coinID).getPosition();
    coinTiledSize = SIB_SpriteManager.spriteRequest(coinID).getSpriteSize();
    coinTiledLength = coinTiledPosition.length;

    coinHitInfo = SIB_CollissionManager.getCollissionInfo(coinID);

    for (var i = 0; i < 10; i++) {
      randomY[i] = Math.random() * (screenHeight - 100);
      if (randomY[i] < 0) randomY[i] = Math.random() * (screenHeight - 100);
    }

    coinHitInfo.setCollissionBehavior(coinCollissionBehavior);
  }

  function LOOP() {
    var i = 0,
      len = 0;

    // movementVelocity = Math.floor(movementSpeed/time.deltaTime);
    // groundVelocity = Math.floor(groundSpeed/time.deltaTime);

    // (0.5 + n) << 0;
    // ~~ (0.5 + n);
    movementVelocity = ~~(0.5 + movementSpeed / time.deltaTime);
    groundVelocity = ~~(0.5 + groundSpeed / time.deltaTime);

    if (keyboard.arrowLeft) {
      birdPosition.x -= movementVelocity;
      birdSpriteRequest.playSpriteAnimationFrame(
        birdFrameID,
        flapAnimationSpeedHigh
      );
      birdSpriteRequest.flipHorizontal(true);
    }

    if (keyboard.arrowRight) {
      birdPosition.x += movementVelocity;
      birdSpriteRequest.playSpriteAnimationFrame(
        birdFrameID,
        flapAnimationSpeedHigh
      );
      birdSpriteRequest.flipHorizontal(false);
    }

    if (keyboard.arrowUp) {
      birdPosition.y -= movementVelocity;
    }

    if (keyboard.arrowDown) {
      birdPosition.y += movementVelocity;
    }

    if (!keyboard.spaceBar) {
      birdSpriteRequest.playSpriteAnimationFrame(
        birdFrameID,
        flapAnimationSpeedMedium
      );
    }

    if (keyboard.spaceBar || touch.touchStart) {
      if (soundBackgroundState == false) {
        isPlayerFirstKeyPress = true;
        soundBackgroundState = true;
        soundMusic.playSound();
        soundFilmRolling.playSound();
      }

      soundBirdFlapping.playSound();

      birdSpriteRequest.playSpriteAnimationFrame(
        birdFrameID,
        flapAnimationSpeedHigh
      );
      flapVelocity = flapAccentSpeed;
      flapStart = true;
    }

    if (flapStart) {
      flapVelocity -= gravity / time.deltaTime;
      birdPosition.y -= flapVelocity / time.deltaTime;

      if (birdPosition.y + birdSize.h >= ground) {
        birdPosition.y = ground - birdSize.h;
        flapVelocity = 0;
        momentum = 0;
        flapStart = false;
      }
    }

    if (isPlayerFirstKeyPress) {
      cactusPosition.x -= 1;
      bushPosition.x -= 1;

      if (bushPosition.x + bushSize.w < 0) bushPosition.x = screenWidth;

      if (cactusPosition.x + cactusSize.w < 0) cactusPosition.x = screenWidth;

      len = tileGroundPositionLength;
      i = 0;
      do {
        tileGroundPosition[i]._position.x -= groundVelocity;

        if (tileGroundPosition[i]._position.x + tileGroundSize.w < 0) {
          tileGroundPosition[i]._position.x = screenWidth - groundVelocity;
          i == 0
            ? (tileGroundPosition[i]._position.x =
                tileGroundPosition[tileGroundPositionLength - 1]._position.x +
                tileGroundSize.w -
                groundVelocity)
            : (tileGroundPosition[i]._position.x =
                tileGroundPosition[i - 1]._position.x + tileGroundSize.w);
        }
        i++;
      } while (--len);

      len = coinTiledLength;
      i = 0;
      do {
        coinTiledPosition[i]._position.x -= groundVelocity;

        if (coinTiledPosition[i]._position.x + coinTiledSize.w < 0) {
          coinTiledPosition[i]._position.x = screenWidth;

          coinTiledPosition[i]._position.y = Math.random() * screenHeight - 100;
          if (coinTiledPosition[i]._position.y <= 0) {
            coinTiledPosition[i]._position.y = 10;
          }

          if (coinTiledPosition[i]._hide) coinTiledPosition[i]._hide = false;
        }
        i++;
      } while (--len);
    }
  }

  function END() {
    console.log("%cENDING GAME SCENE", "color:#DC143C");
    keyboard = null;
    mouse = null;
    touch = null;
    time = null;
    screenFlicker = null;
    cactusGameObject = null;
    cactusPosition = null;
    bushGameObject = null;
    bushPosition = null;
    tileGround = null;
    tileGroundSize = null;
    tileGroundPosition = null;
    tileGroundPositionLength = null;
    ground = null;
    birdGameObject = null;
    birdPosition = null;
    birdSize = null;
    scene1 = null;
  }
}
