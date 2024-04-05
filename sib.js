//
// PROTOTYPE CODE
// WRITTEN BY: LEMARK SIBALA "AKA kamidojin/mr.mcbyte"
//

"use strict";

//START     CScene//
/*-----------------------------------------------------------*/
function CScene(){

    this.initScene = null;
    this.startScene = null;
    this.endScene = null;
}
CScene.prototype = Object.create(null);
CScene.prototype.constructor = CScene;

var COLLISSION_TYPE_GAMEOBJECT = 1001;
var COLLISSION_TYPE_TILE       = 1002;  

///////////////////////////////////////////////////////////////
//START     SIB CLOSURE//
/*-----------------------------------------------------------*/
var SIB = (function(){

var ATTRIB_NONE =                   parseInt('0000000000',2);
var ATTRIB_VISIBLE =                parseInt('0000000001',2);
var ATTRIB_HIDDEN =                 parseInt('0000000010',2);
var ATTRIB_SPRITEREQUEST =          parseInt('0000000100',2);
var ATTRIB_COLLISSIONREQUEST =      parseInt('0000001000',2);
var ATTRIB_TILEMAPREQUEST =         parseInt('0000010000',2);
var ATTRIB_TILED =                  parseInt('0000100000',2);
                

var INDEX_SPRITEREQUEST = 0;
var INDEX_COLLISSIONREQUEST = 1;
var INDEX_TILEMAPREQUEST = 2;

/*-----------------------------------------------------------*/

function _checkValidValue(value){
     if(value === undefined || value === "" || value == null)
        return false;
    return true;
}

function _arrayNew(size){
    var a = [];
    var i =0;
    for(;i<size;i++)
        a[i] = 0;

    return a;
}

function _arrayInsert(array,element){
    var len = array.length;

    if(len == 0)
        array[0] = element;
    else
        array[len+1] = element;
}

function _arrayChop(array){

}

// FASTER THAN MATH.min/Math.max!!
function _collissionCheckRect(min0,max0,min1,max1){
    return ((min0 > max0 ? min0 : max0) >= (min1 < max1 ? min1 : max1)) && ((min0 < max0 ? min0 : max0) <= (min1 > max1 ? min1 : max1));
} 

/*-----------------------------------------------------------*/

function Point(x,y){
    this.x = x||0;
    this.y = y||0;
}

function FrameSize(width,height){
    this.w = width||0;
    this.h = height||0;
}
FrameSize.prototype = Object.create(null);
FrameSize.prototype.constructor = FrameSize;

function Vector(x,y){
    this.x = x||0;
    this.y = y||0;
    this.z = 0;

}
Vector.prototype = Object.create(null);
Vector.prototype.constructor = Vector;

function Velocity(x,y){
    this.x = x||0;
    this.y = y||0;
    this.z = 0;
}
Velocity.prototype = Object.create(null);
Velocity.prototype.constructor = Velocity;


//START Input//
/*-----------------------------------------------------------*/
function CSib(){
    this._id = 0;
}

CSib.prototype = Object.create(null);
CSib.prototype.constructor = CSib;
CSib.prototype.clean = function(){
    var type = null;
    var value = null;

    for(var key in this){
        value = this[key];
        if(value === null || value === undefined)
            continue;

        if(key === 'constructor')
            continue;
        if(key === '_clean')
            continue;

        type = typeof value;
        
        if(type === 'function')
            continue;

        if(type === 'object'){
            this[key] = null;
        }
    }
};

CSib.prototype.cleanAll = function(){

};

CSib.prototype.setID = function(id){
    this._id = id;
};

CSib.prototype.getID = function(){
    return this._id;
};



function CKeyboardKeyCode(n,c){
    this.keyName = n;
    this.keyCode = c;
}

CKeyboardKeyCode.prototype = Object.create(null);
CKeyboardKeyCode.prototype.constructor = CKeyboardKeyCode;


function CMouse(){
	this.coordinate;
}
CMouse.prototype = Object.create(null);
CMouse.prototype.constructor = CMouse;



//START     CLayer//
/*-----------------------------------------------------------*/
function CLayer(){
    CSib.call(this);
    this._canvas = null;
    this._context = null;
    this._updateEnabled = true;
    this._updateFrequency = 1;
}

CLayer.prototype = Object.create(CSib.prototype);
CLayer.prototype.constructor = CLayer;




//START     CTime//
/*-----------------------------------------------------------*/
function CTime(){
    this.deltaTime = 60/1000;
    this.deltaTimeFraction = 0.0;
    this._milliSeconds = 0;
    this._newTime = 0;
    this._oldTime = 0;
    this.fps = 0;
    this._fpsAverage = 0;
    this._fpsHistoryMaxSamples = 100;
    this._fpsHistoryTicks = 0;
    this._fpsHistoryTemp = 0;
}

CTime.prototype.startTime = function(seed){
    this._newTime = seed;
    this.deltaTime = (this._newTime - this._oldTime);
    this.deltaTimeFraction = 0.001 * this.deltaTime;
    this.fps = 1000/this.deltaTime;
    
    if(this._fpsHistoryTicks < this._fpsHistoryMaxSamples){
        
        this._fpsHistoryTemp += this.fps;
        this._fpsHistoryTicks++;

    }else{
        this._fpsAverage = this._fpsHistoryTemp/this._fpsHistoryMaxSamples;
        this._fpsHistoryTicks = 0;
        this._fpsHistoryTemp = 0;
    }
};

CTime.prototype.endTime = function(){
    this._oldTime = this._newTime;
};



//START     CCamera//
/*-----------------------------------------------------------*/
function CCamera(width,height){
    var _position = new Vector;
    var _frame = new FrameSize(width,height);
}
CCamera.prototype = Object.create(null);
CCamera.prototype.constructor = CCamera;


//START CSound//
/*-----------------------------------------------------------*/
function CSound(filename,bufferSize){
    this._len = 0;
    this._soundIndex = 0;
    this._sounds = [];

    if(filename){
        if(bufferSize){
            for(var i = 0;i < bufferSize;i++)
                this._len = this._sounds.push(new Audio(filename));
            return;
        }

        this._len = this._sounds.push(new Audio(filename));
    }
}

CSound.prototype = Object.create(null);
CSound.prototype.constructor = CSound;


CSound.prototype.enableLoop = function(yes){
    var i = 0;
    for(;i< this._len;i++)
        this._sounds[i].loop = yes;
 
};

CSound.prototype.enableAutoplay = function(name,yes){
      var i = 0;
    for(;i< this._len;i++)
        this._sounds[i].autoplay = yes;
};

CSound.prototype.playSound = function(){
    this._soundIndex++;
    this._soundIndex %= this._len;
    this._sounds[this._soundIndex].muted = false;
    this._sounds[this._soundIndex].play();
};

CSound.prototype.stopSound = function(){
    var i = 0;
    for(;i < this._len; i++){
        this._sounds[i].muted = true;
        this._sounds[i].currentTime = 0;
    }
};

CSound.prototype.adjustVolume = function(v){    
    var i = 0;
    if(v > 1)
        return;

    for(;i<this._len;i++)
        this._sounds[i].volume = v;
};


//START     CCollissionRequest//
/*-----------------------------------------------------------*/
function CCollissionRequest(){
    CSib.call(this);
    this._isActive = null;
    this._isPassive = null;
    this._canSendInfo = true;
    this._canReceiveInfo = false;
    this._executeBehavior = function(){};
    this.collided = false;
}
CCollissionRequest.prototype = Object.create(CSib.prototype);
CCollissionRequest.prototype.constructor = CCollissionRequest;

CCollissionRequest.prototype.setCollissionBehavior = function(callback){
    this._executeBehavior = callback;
};




//START     CTileMapRequest//
/*-----------------------------------------------------------*/
function CTileMapRequest(){
    CSib.call(this);
    this._gameObject = null;
    this._coordinates = null;
}

CTileMapRequest.prototype = Object.create(CSib.prototype);
CTileMapRequest.prototype.constructor = CTileMapRequest;



//START     CTile//
/*-----------------------------------------------------------*/
function CTile(x,y){
    CSib.call(this);
    this._hide = false;
    this._hit = false;
    this._position = new Vector(x,y);
    this._tileFrameSize = null;
}

CTile.prototype = Object.create(CSib.prototype);
CTile.prototype.constructor = CTile;
CTile.prototype.hide = function(yes){
    if(yes)
        this._hide = true;
    else
        this._hide = false;
};



//START     CSpriteTile//
/*-----------------------------------------------------------*/
function CSpriteTile(){
    CSib.call(this);
    this._gameObjectPosition = null;

    this._tileAmount = 2;
    this._tileFrameSize = null;
    this._tilePositionsLength = 0;
    this._tilePositions = [];

    this._tileRightLeft = true;
    this._tileUpDown = false;
    this._tileVerticalOn = false;
    this._tileHorizontalOn = true;
}

CSpriteTile.prototype = Object.create(CSib.prototype);
CSpriteTile.prototype.constructor = CSpriteTile;

CSpriteTile.prototype._tileCalculateNewPositions = function(){
    var tileID = 0;
    var x = 0;
    var y = 0;

    for(var i=0; i < this._tileAmount; i++){
        if(this._tilePositions.length == 0){
            this._tilePositionsLength = this._tilePositions.push(new CTile(this._gameObjectPosition.x,this._gameObjectPosition.y));
            tileID = this._tilePositionsLength-1;

        }else{

            x = this._tileRightLeft ? 
            (this._tilePositions[this._tilePositionsLength-1]._position.x+this._tileFrameSize.w) 
            : (this._tilePositions[this._tilePositionsLength-1]._position.x-this._tileFrameSize.w);
            
            y = this._tilePositions[this._tilePositionsLength-1]._position.y;

            this._tilePositionsLength = this._tilePositions.push(new CTile(x,y));
            tileID =  this._tilePositionsLength-1;
        }

        this._tilePositions[tileID]._id = tileID;
        this._tilePositions[tileID]._tileFrameSize = this._tileFrameSize;
    }
};

CSpriteTile.prototype._tileRecalculateTilePositions = function(){

    var x = 0;
    var y = 0;

    if(this._tileAmount == this._tilePositionsLength){
        for(var i=0; i < this._tileAmount; i++){
            if(i == 0){
                this._tilePositions[i]._position.x = this._gameObjectPosition.x;
                this._tilePositions[i]._position.y = this._gameObjectPosition.y;
        
            }else{

                if(this._tileHorizontalOn){
                    x = this._tileRightLeft ? (this._tilePositions[i-1]._position.x+this._tileFrameSize.w) : (this._tilePositions[i-1]._position.x-this._tileFrameSize.w);
                }else{
                    x = this._gameObjectPosition.x;
                }
                
                if(this._tileVerticalOn){
                    y = this._tileUpDown ? (this._tilePositions[i-1]._position.y-this._tileFrameSize.h) : (this._tilePositions[i-1]._position.y+this._tileFrameSize.h);
                }else{
                    y = this._gameObjectPosition.y;
                }
      
                this._tilePositions[i]._position.x = x;
                this._tilePositions[i]._position.y = y;
            }
        }
    }else{
        this._tilePositions.splice(0,this._tilePositions.length);
        this._tileCalculateNewPositions();
    }
};



//START     CSpriteAnimation//
/*-----------------------------------------------------------*/

function CSpriteAnimation(){
        CSib.call(this);
        this._frameID = 0;
        this._animate = false;
        this._counter = 0;
        this._speed = 0;
        this._loop = false;
        this._frameIndex = 0;
        this._idleFrame = null;
        this._overlayEnabled = false;
        this._overlaySpriteFrame = null;
        this._overlayDuration = 0;
}

CSpriteAnimation.prototype = Object.create(CSib.prototype);
CSpriteAnimation.prototype.constructor = CSpriteAnimation;



//START     CSpriteRequest//
/*-----------------------------------------------------------*/

function CSpriteRequest(animatable){
    CSib.call(this);
    this._animation = null;
    this._flip = false;
    this._flipX = 1;
    this._flipY = 1;
    this._tiled = null;
    this._sprite = null;
    this._gameObject = null;
    this._drawThisSpriteFrame = null;

    if(animatable){
        this._animation = new CSpriteAnimation;
        this._animation._id = this._id;
    }    
}

CSpriteRequest.prototype = Object.create(CSib.prototype);
CSpriteRequest.prototype.constructor = CSpriteRequest;

CSpriteRequest.prototype.setSprite = function(sprite){
    this._sprite = sprite;
};

CSpriteRequest.prototype.setGameObject = function(gameObject){
    this._gameObject = gameObject;
};
            
CSpriteRequest.prototype.setIdleSpriteFrame = function(frameID,frameNum){
    if(this._animation != null){
        this._animation._idleFrame = this._sprite._frames[frameID][frameNum-1];
    }

    this._drawThisSpriteFrame = this._sprite._frames[frameID][frameNum-1];
};

CSpriteRequest.prototype.getSpriteSourcePosition = function(){
    return this._drawThisSpriteFrame;
};

CSpriteRequest.prototype.getSpriteSize = function(){
    return this._drawThisSpriteFrame;
};

CSpriteRequest.prototype.getFlipState = function(){
    return this._flip;
};

CSpriteRequest.prototype.flipHorizontal = function(yes){
    if(yes){
        this._flip = yes;
        this._flipX = -1;
        return;
    }

    if(!yes){
        this._flip = yes;
        this._flipX = 1;
        return;
    }
};

CSpriteRequest.prototype.flipVertical = function(yes){
    if(yes){
        this._flip = yes;
        this._flipY = -1;
        return;
    }

    if(!yes){
        this._flip = yes;
        this._flipY = 1;
        return;
    }
};

CSpriteRequest.prototype.setSpriteAnimationSpeed = function(speed){
    this._animation._animate = true;  
    this._animation._speed = speed;
   
};

CSpriteRequest.prototype.playSpriteAnimationFrame = function(frameID,speed){
    this._animation._animate = true;
    this._animation._speed = speed;
    this._animation._frameID = frameID;
    this._drawThisSpriteFrame = this._sprite._frames[frameID][0];
    this._sprite._width = this._drawThisSpriteFrame.w;
    this._sprite._height = this._drawThisSpriteFrame.h;     
};

CSpriteRequest.prototype.stopSpriteAnimationFrame = function(){
    this._animation._animate = false;
    this._drawThisSpriteFrame = this._idleFrame;
};

CSpriteRequest.prototype.playSpriteAnimationOverlay = function(speed){
    this._animation._overlayEnabled = true;
    this._animation._speed = speed;     
};

CSpriteRequest.prototype.stopSpriteAnimationOverlay = function(speed){
    this._animation._overlayEnabled = false;
};

CSpriteRequest.prototype.setSpriteAnimationOverlayFrame = function(frameID,frameNum){
    this._animation._overlaySpriteFrame = this._sprite._frames[frameID][frameNum-1];
};

CSpriteRequest.prototype.drawSpriteFrame = function(frameID,frameNum){
    if((frameNum-1) < this._sprite._frames[frameID].length)
        this._drawThisSpriteFrame = this._sprite._frames[frameID][frameNum-1]
};


CSpriteRequest.prototype.tileEnable = function(){
    
    this._gameObject._attrib_ |= ATTRIB_TILED;

    if(this._tiled == null){
        this._tiled = new CSpriteTile();
        this._tiled._gameObjectPosition = this._gameObject._position;     
        this._tiled._tileFrameSize = this._drawThisSpriteFrame;
        this._tiled._tileCalculateNewPositions();
    }
};

CSpriteRequest.prototype.tileSetAmount = function(amount){
    this._tiled._tileAmount = amount;
    this._tiled._tileRecalculateTilePositions();
};

CSpriteRequest.prototype.tileSetPosition = function(x,y){
    this._tiled._gameObjectPosition.x = x;
    this._tiled._gameObjectPosition.y = y;
    this._tiled._tileRecalculateTilePositions();
};

CSpriteRequest.prototype.tileGetPosition = function(){
    return this._tiled._tilePositions;
};

CSpriteRequest.prototype.tileHorizontalOn = function(yes){
    if(yes){
        this._tiled._tileHorizontalOn = true;
        this._tiled._tileVerticalOn = false;
    }else if(!yes){
        this._tiled._tileHorizontalOn = false;
        this._tiled._tileVerticalOn = true;
    }

    this._tiled._tileRecalculateTilePositions();
};

CSpriteRequest.prototype.tileVerticalOn = function(yes){
    if(yes){
        this._tiled._tileHorizontalOn = false;
        this._tiled._tileVerticalOn = true;
    }else if(!yes){
        this._tiled._tileHorizontalOn = true;
        this._tiled._tileVerticalOn = false;
    }

    this._tiled._tileRecalculateTilePositions();

};

CSpriteRequest.prototype.tileRight = function(yes){
    if(yes)
        this._tiled._tileRightLeft = true;
    else if(!yes)
        this._tiled.tileRightLeft = false;

    this._tiled._tileRecalculateTilePositions();
};

CSpriteRequest.prototype.tileLeft = function(yes){
    if(yes)
        this._tiled._tileRightLeft = false;
    else if(!yes)
        this._tiled._tileRightLeft = true;

    this._tiled._tileRecalculateTilePositions();
};

CSpriteRequest.prototype.tileUp = function(yes){
    if(yes)
        this._tiled._tileUpDown = true;
    else if(!yes)
        this._tiled._tileUpDown = false;

    this._tiled._tileRecalculateTilePositions();
};

CSpriteRequest.prototype.tileDown = function(yes){
    if(yes)
        this._tiled._tileUpDown = false;
    else if(!yes)
        this._tiled._tileUpDown = true;

    this._tiled._tileRecalculateTilePositions();
};




//START     CSprite//
/*-----------------------------------------------------------*/




function CSprite(){
    CSib.call(this);
    this._frames = [];
    this._imageSource = null;
    this._imageSize = null;
} 

CSprite.prototype = Object.create(CSib.prototype);
CSprite.prototype.constructor = CSprite;

CSprite.prototype.info = function(){
    console.log(this._name);
};

CSprite.prototype.addFrame = function(frames){
    var id = 0,
    len = 0;
    len = this._frames.push(frames);
    id = len - 1;

    console.log("%cADDING FRAMES:","color:#008000");
    console.log("   to sprite ID - " + this._id + ", frame ID - " + id);
    return id;
};

CSprite.prototype.setSpriteSize = function(w,h){
    this._imageSize.w = w;
    this._imageSize.h = h;

    console.log("%cSETTING TILE SIZE:","color:#008000");
    console.log("   to sprite ID - " + this._id + ", dimensions - " + w +"x"+ h);
    return this;
};

// START    CGameObject//
/*-----------------------------------------------------------*/




function CGameObject(){
    CSib.call(this);
    this._attrib_ = ATTRIB_NONE;
    this._layer = "";
    this._static = null;
    this._position = new Vector;
    this._previousPosition = new Vector;
    this.request = _arrayNew(4);

}

CGameObject.prototype = Object.create(CSib.prototype);
CGameObject.prototype.constructor = CGameObject;

CGameObject.prototype.setPosition = function(position){
    this._position = position;
};

CGameObject.prototype.getPosition = function(){
    if(this._attrib_ & ATTRIB_TILED)
        return this.request[INDEX_SPRITEREQUEST]._tiled._tilePositions;
    else
        return this._position;
};

CGameObject.prototype.setPosition = function(x,y){
    this._position.x = x;
    this._position.y = y;

    if(this._attrib_ & ATTRIB_TILED)
        this.request[INDEX_SPRITEREQUEST]._tiled._tileRecalculateTilePositions
};

CGameObject.prototype.setVisible = function(yes){
    if(yes)
        this._attrib_ |= ATTRIB_VISIBLE;
    else if(!yes)
        this._attrib_ ^= ATTRIB_VISIBLE;
};

CGameObject.prototype.hide = function(yes){
    if(yes)
        this._attrib_ |= ATTRIB_HIDDEN;
    else if(!yes)
        this._attrib_ ^= ATTRIB_HIDDEN;
};

CGameObject.prototype.savePosition = function(){
    this._previousPosition.x = this._position.x;
    this._previousPosition.y = this._position.y;
};

    var _DOM_document = document;
    var _DOM_window = window;

    var _time = new CTime();

    var _engineReady = false;
    var _imagesReady = false;
    var _scenesReady = false;
    var _modulesReady = false;

    var _moduleCount = 0;
    var _modules = [];

    var _clearEachGameObject = false;

    var _scenes = Object.create(null);
    var _sceneOnAir = null;
    var _sceneLoadNewScene = false;
    var _sceneLoadNextSceneName = null;

    var _tileMaps = [];

    var _renderStart = null;
    var __renderers = Object.create(null);

    var _camera = null;

    var _cameraX = 0;
    var _cameraY = 0;
    var _cameraW = 0;
    var _cameraH = 0;

    var _screenW = 0;
    var _screenH = 0;

    var _layersScreen = [];
    var _layersImage = Object.create(null);
    var _layersImageName = [];

    var _sprites = [];
    var _spriteCreateWorkload = [];

    var _imageDependentCallbacks = [];

    var _gameObjects = [];

    var _requests = [];
    var _requestsCollissionActive = [];
    var _requestsCollissionPassive = [];
    var _requestsCollissionTile = [];


    var _keyboard = Object.create(null);
    var _keyboardKeyCodes = [];

    var MAX_PRESSED_KEY_BUFFER = 10;
    var _pressedKeyBuffer = new Array(MAX_PRESSED_KEY_BUFFER);
    var _pressedKeyBufferIndex = 0;

    var _mouse = Object.create(null);
    var _touch = Object.create(null);


    var isMobileDevice = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobileDevice.Android() || 
                isMobileDevice.BlackBerry() || 
                isMobileDevice.iOS() || 
                isMobileDevice.Opera() || 
                isMobileDevice.Windows());
        }
    };


    function __keyboardEventHandler(event){
        var i = 0,
        len = _keyboardKeyCodes.length;

        if(event.stopPropagation)
            event.stopPropagation();
        
        if(event.preventDefault)
            event.preventDefault();

        if(event.type == 'keydown'){
            do{
                if(_keyboardKeyCodes[i].keyCode == event.keyCode){
                    _keyboard[_keyboardKeyCodes[i].keyName] = true;
                   
                    _pressedKeyBufferIndex++;
                    _pressedKeyBufferIndex %= MAX_PRESSED_KEY_BUFFER;

                    _pressedKeyBuffer[_pressedKeyBufferIndex] = _keyboardKeyCodes[i].keyName;
                }

                i++;
            }while(--len);
        }

        if(event.type == 'keyup'){
            for(;i<MAX_PRESSED_KEY_BUFFER;i++)
                 if(_keyboard[_pressedKeyBuffer[i]])
                    _keyboard[_pressedKeyBuffer[i]]=false;
        }
    }

    function __mouseEventHandler(event){
        var mouse = _mouse;     
        if(event.stopPropagation)
            event.stopPropagation();
        
        if(event.preventDefault)
            event.preventDefault();

        mouse.x = event.clientX - mouse._canvasBoundingClientRect.left;
        mouse.y = event.clientY - mouse._canvasBoundingClientRect.top;

        if(event.type === 'mousedown'){
            mouse.mouseDown = true;
            return;
        }

        if(event.type === 'mouseup'){
            mouse.mouseUp = false;
            return;
        }
    }

    function __touchEventHandler(event){

        if(event.stopPropagation)
            event.stopPropagation();
        
        if(event.preventDefault)
            event.preventDefault();

        // _touch.x = event.touches[0].clientX;
        // _touch.y = event.touches[0].clientY;
        
        if(event.type === 'touchstart'){
            _touch.touchStart = true;
        }

        if(event.type === 'touchend'){
            _touch.touchStart = false;
        }
    }

    function __assignLayerToDivElement(id,divID){
      
        var element = null;
        if((typeof divID) === "string"){
            element = document.getElementById(divID);
        }
        else return false;


        console.log("%cID: " + _layersScreen[id]._canvas.id + " Node:" + _layersScreen[id]._canvas.tagName,"color:#FF1493"); 
        element.appendChild(_layersScreen[id]._canvas);
        console.log("%cAPPENDING: layer " + id + " to element " + element.tagName,"color:#FF1493");


        return true;
    }

    function __createLayer(w,h){

        var len = 0,
        id = 0;

        len = _layersScreen.push(new CLayer);
        id = len - 1;
        _layersScreen[id].setID(id);
        _layersScreen[id]._canvas = document.createElement('canvas');
        _layersScreen[id]._canvas.id = id;
        _layersScreen[id]._canvas.width = w;
        _layersScreen[id]._canvas.height = h;
        _layersScreen[id]._canvas.style.position = 'absolute';
        _layersScreen[id]._canvas.style.left = '0px';
        _layersScreen[id]._canvas.style.top = '0px';

        _layersScreen[id]._context = _layersScreen[id]._canvas.getContext('2d');

        return id;
    }
    
    function __initSounds(){
        for(var i in _sounds){
            _sounds[i].muted = true;
            _sounds[i].play();
        }

        _DOM_document.removeEventListener('touchstart',__initSounds);
    }

    function __useModule(file){
        var newScriptElement = null;
        var moduleID = null;

        var pattern1 = new RegExp('/');
        var pattern2 = new RegExp('\\\\');
        var splitString = null;

        if(pattern1.test(file)){
            splitString = file.split('/');
            moduleID = splitString[splitString.length-1].replace('.js','');
        }else if(pattern2.test(file)){
            splitString = file.split('\\');
            moduleID = splitString[splitString.length-1].replace('.js','');
        }else{
            moduleID = file.replace('.js','');
        }

        _modules.push(moduleID);

        ++_moduleCount;
        
        console.log("MODULE COUNT: " + _moduleCount);
        console.log("LOADING MODULES");
        
        newScriptElement = _DOM_document.createElement('script');
        
        newScriptElement.id = moduleID;
        newScriptElement.type = 'text/javascript';
        newScriptElement.src = file;

        newScriptElement.onload = function(){
            if(_moduleCount != 0)
                --_moduleCount;
            
            if(_moduleCount == 0){
                _modulesReady = true;
                _moduleCount = null;
            }
        };

        _DOM_document.body.appendChild(newScriptElement);
    }

    function __remModule(file){

        var moduleID = file.replace('.js','');
        var childElement = null;
        var parentElement = null;

        for(var i = 0; i < _modules.length;i++){
            if(_modules[i] == moduleID){
                childElement = _DOM_document.getElementById(moduleID);
                childElement.src = null;
                parentElement = childElement.parentNode;
                parentElement.removeChild(childElement);
            }
        }
    }

    function __sceneLoadNewScene(){
        if(_modulesReady){
            if(!_scenesReady){
                for(var key in _scenes){
                    if(typeof key === 'object')
                        continue;

                    if(typeof key === 'string'){

                        var expression = _scenes[key]+'()';

                        _scenes[key] = eval(expression);
                        expression = null;
                    }
                }
                _scenesReady = true;
            
            }else if(_scenesReady){
                if(_sceneOnAir)
                    _sceneOnAir.endScene();

                _sceneOnAir = _scenes[_sceneLoadNextSceneName];
                _sceneOnAir.initScene();

                _engineSetup();

                _sceneLoadNewScene = false;
                _sceneLoadNextSceneName = null;
            }
        }
    }

    // param: gameObject
    function _visibilityDetection(g){ 
        if(g._attrib_ & ATTRIB_SPRITEREQUEST){
            if(g._attrib_ & ATTRIB_HIDDEN)
                return;
            
            if(g._attrib_ & ATTRIB_VISIBLE){
                //console.log("VISIBLE");
                if(g._position.x + g.request[INDEX_SPRITEREQUEST]._drawThisSpriteFrame.w < _cameraX || g._position.x > _cameraW){
                    g._attrib_ ^= ATTRIB_VISIBLE;
                    return;
                }
                    
                if(g._position.y > _cameraH || g._position.y + g.request[INDEX_SPRITEREQUEST]._drawThisSpriteFrame.h < _cameraY){
                    g._attrib_ ^= ATTRIB_VISIBLE;
                    return;
                }  
            }else{
                //console.log("HIDDEN");
                if(g._position.x > _cameraX || g._position.x  + g.request[INDEX_SPRITEREQUEST]._drawThisSpriteFrame.w < _cameraW){
                    g._attrib_ |= ATTRIB_VISIBLE; 
                    return;
                }
                    
                if(g._position.y + g.request[INDEX_SPRITEREQUEST]._drawThisSpriteFrame.h < _cameraH || g._position.y > _cameraY){
                    g._attrib_ |= ATTRIB_VISIBLE; 
                    return;
                }  
            }
        }
    }

    function _collissionSetup(){
        var i = 0,
        gameObjects = _requests,
        len = gameObjects.length,
        requestID = 0;

        do{
           if(gameObjects[i]._attrib_ & ATTRIB_COLLISSIONREQUEST){
                if(gameObjects[i]._attrib_ & ATTRIB_TILED){
                    requestID = _requestsCollissionTile.push(gameObjects[i]);
                    requestID = requestID-1;
                }else{

                    if(gameObjects[i].request[INDEX_COLLISSIONREQUEST]._isActive){
                        requestID = _requestsCollissionActive.push(gameObjects[i]);
                        requestID = requestID-1;
                    }else if(gameObjects[i].request[INDEX_COLLISSIONREQUEST]._isPassive){
                        requestID = _requestsCollissionPassive.push(gameObjects[i]);
                        requestID = requestID-1;
                    }
                }

                gameObjects[i].request[INDEX_COLLISSIONREQUEST]._id = requestID;
           }

           i++;
        }while(--len);
    }

    // param: requestsCollissionActive, requestsCollisionTiles
    function _collisionDetectionTiles(a,t){
        var indexActive = 0,
        indexTiles = 0,
        indexTilePos = 0,
        lenActive = a.length,
        lenTiles = t.length,
        lenTilePos = 0,
        tiles = null,
        hit = false;

        do{
            if(a[indexActive]._attrib_ & ATTRIB_HIDDEN){
                indexActive++;
                continue;
            }
        
            do{
                tiles = t[indexTiles].request[INDEX_SPRITEREQUEST]._tiled;
                lenTilePos = tiles._tilePositionsLength;

                do{
                    if(tiles._tilePositions[indexTilePos]._hide){
                        indexTilePos++;
                        continue;
                    }

                    hit = _collissionCheckRect(
                        a[indexActive]._position.x,
                        a[indexActive]._position.x+a[indexActive].request[INDEX_SPRITEREQUEST]._sprite._width,
                        tiles._tilePositions[indexTilePos]._position.x,
                        tiles._tilePositions[indexTilePos]._position.x+tiles._tilePositions[indexTilePos]._tileFrameSize.w)
                    &&
                    _collissionCheckRect(
                        a[indexActive]._position.y,
                        a[indexActive]._position.y+a[indexActive].request[INDEX_SPRITEREQUEST]._sprite._height,
                        tiles._tilePositions[indexTilePos]._position.y,
                        tiles._tilePositions[indexTilePos]._position.y+tiles._tilePositions[indexTilePos]._tileFrameSize.h);

                    if(hit){
                        t[indexTiles].request[INDEX_COLLISSIONREQUEST]._executeBehavior(COLLISSION_TYPE_TILE,tiles._tilePositions[indexTilePos],a[indexActive]);
                        // console.log("HIT TILE #" +  tiles._tilePositions[indexTilePos]._id);
                    }

                    indexTilePos++;
                }while(--lenTilePos);


                indexTilePos = 0;
                indexTiles++;
            }while(--lenTiles);

            indexTiles = 0;
            indexActive++;
        }while(--lenActive);
    }

    // param: requestsCollissionActive,requestsCollissionPassive
    function _collissionDetection(a,p){
        var indexActive = 0,
        indexPassive = 0,
        lenActive = a.length,
        lenPassive = p.length,
        hit = false,
        hitX = false,
        hitY = false;

        if(!lenActive)
            return;
        if(!lenPassive)
            return;

       do{
            if(a[indexActive]._attrib_ & ATTRIB_HIDDEN){
                indexActive++;
                continue;
            }

            do{
                if(p[indexPassive]._attrib_ & ATTRIB_HIDDEN){
                    indexPassive++;
                    continue;
                }

                hit = _collissionCheckRect(
                    a[indexActive]._position.x,
                    a[indexActive]._position.x+a[indexActive].request[INDEX_SPRITEREQUEST]._sprite._width,
                    p[indexPassive]._position.x,
                    p[indexPassive]._position.x+p[indexPassive].request[INDEX_SPRITEREQUEST]._sprite._width)
                &&
                _collissionCheckRect(
                    a[indexActive]._position.y,
                    a[indexActive]._position.y+a[indexActive].request[INDEX_SPRITEREQUEST]._sprite._height,
                    p[indexPassive]._position.y,
                    p[indexPassive]._position.y+p[indexPassive].request[INDEX_SPRITEREQUEST]._sprite._height);

                if(hit){
                    a[indexActive].request[INDEX_COLLISSIONREQUEST]._executeBehavior(COLLISSION_TYPE_GAMEOBJECT,a[indexActive],p[indexPassive]);
                    p[indexPassive].request[INDEX_COLLISSIONREQUEST]._executeBehavior(COLLISSION_TYPE_GAMEOBJECT,p[indexActive],a[indexPassive]);
                }

                indexPassive++;
            }while(--lenPassive);

            indexPassive = 0;
            indexActive++;
        } while(--lenActive);
    }

    // param: gameObject
    function _rendererWithTiling (g){
        var i = 0, 
        len = 0,
        spriteRequest = g.request[INDEX_SPRITEREQUEST],
        spriteRequestDrawSpriteFrame = spriteRequest._drawThisSpriteFrame,
        animation = spriteRequest._animation,
        animationFrameID = 0,
        sprite = spriteRequest._sprite,
        spriteImageSource = sprite._imageSource,
        flipX = spriteRequest._flipX,
        flipY = spriteRequest._flipY;

        if(!(g._attrib_ & ATTRIB_VISIBLE) || (g._attrib_ & ATTRIB_HIDDEN)){
            return;
        }


        if(animation && animation._animate){
            animationFrameID = animation._frameID;

            if(animation._counter >= (animation._speed-1)){
                
                animation._frameIndex++;
                animation._frameIndex %= sprite._frames[animationFrameID].length;
                
                spriteRequestDrawSpriteFrame = sprite._frames[animationFrameID][animation._frameIndex];
            }else{
                spriteRequestDrawSpriteFrame = sprite._frames[animationFrameID][animation._frameIndex];
            }

            ++animation._counter;
             animation._counter %= animation._speed;
        }
        

        if(spriteRequest._flip){
            g._layer.save();
            g._layer.scale(flipX,flipY);
            g._layer.translate(sprite._width*flipX,0);
        }

        if(g._attrib_ & ATTRIB_TILED){
            len = spriteRequest._tiled._tilePositionsLength;
            i = 0;

            do{
                if(spriteRequest._tiled._tilePositions[i]._hide){
                    i++;
                    continue;
                }

                g._layer.drawImage(
                    spriteImageSource.canvas,
                    spriteRequestDrawSpriteFrame.x,
                    spriteRequestDrawSpriteFrame.y,
                    spriteRequestDrawSpriteFrame.w,
                    spriteRequestDrawSpriteFrame.h,
                    spriteRequest._tiled._tilePositions[i]._position.x*flipX,
                    spriteRequest._tiled._tilePositions[i]._position.y*flipY,
                    spriteRequestDrawSpriteFrame.w,
                    spriteRequestDrawSpriteFrame.h);

                i++;
            }while(--len);

        }else{
            g._layer.drawImage(
                spriteImageSource.canvas,
                spriteRequestDrawSpriteFrame.x,
                spriteRequestDrawSpriteFrame.y,
                spriteRequestDrawSpriteFrame.w,
                spriteRequestDrawSpriteFrame.h,
                g._position.x*flipX,
                g._position.y*flipY,
                spriteRequestDrawSpriteFrame.w,
                spriteRequestDrawSpriteFrame.h);
        }


        if(animation && animation._overlayEnabled){

            if(animation._counter >= (animation._speed-1)){
                g._layer.drawImage(
                    spriteImageSource.canvas,
                    animation._overlaySpriteFrame.x,
                    animation._overlaySpriteFrame.y,
                    animation._overlaySpriteFrame.w,
                    animation._overlaySpriteFrame.h,
                    g._position.x*flipX,
                    g._position.y*flipY,
                    animation._overlaySpriteFrame.w,
                    animation._overlaySpriteFrame.h);
            }

            ++animation._counter;
             animation._counter %= animation._speed;
        }

        if(spriteRequest._flip){
            g._layer.restore();
        }

        g.savePosition();
    }
  
    // param: request,screen(layer)
    function _renderUpdate(r,s){
        var i = 0,
        len = 0,
        gameObject = null;
   
        if(_clearEachGameObject){

            len = r.length;

            do{
                gameObject = r[i];

                if(!(gameObject._attrib_ & ATTRIB_VISIBLE)){
                    i++;
                    continue;
                }

                gameObject._layer.clearRect(
                    gameObject._previousPosition.x-1,
                    gameObject._previousPosition.y-1,
                    gameObject.request[INDEX_SPRITEREQUEST]._drawThisSpriteFrame.w+2,
                    gameObject.request[INDEX_SPRITEREQUEST]._drawThisSpriteFrame.h+2);

                i++;
            }while(--len);
        }else{

            len = s.length;
            do{
                if(s[i]._updateEnabled)
                    s[i]._context.clearRect(0,0,s[i]._canvas.width,s[i]._canvas.height);
                i++;
            }while(--len);
        }   

    }

    function _engineSetup(){

        console.log("%cRENDERER: initializing","color:#C71585")
        
        __renderers['default'] = _rendererWithTiling;

        if(!_renderStart)
            _renderStart = __renderers['default'];

        _requests.sort(function(a,b){
            if(a._position.z < b._position.z)
                return -1;
            else if(a._position.z > b._position.z)
                return 1;
            return 0;
        });

        _collissionSetup();

        _engineReady = true;
    }

    // param: time
    function _engineStart(t){
        var i = 0,
        requests = _requests,
        len = requests.length;

        _time.startTime(t);
       
        requestAnimationFrame(_engineStart);

        if(_sceneLoadNewScene){
            __sceneLoadNewScene();
        }
        
        if(_engineReady && _imagesReady){
            _sceneOnAir.startScene();
            _collisionDetectionTiles(_requestsCollissionActive,_requestsCollissionTile);
            _collissionDetection(_requestsCollissionActive,_requestsCollissionPassive);
            _renderUpdate(requests,_layersScreen);          

            do{
                _visibilityDetection(requests[i]);
                _renderStart(requests[i]);
                i++;
            }while(--len);
        }

         _time.endTime();
    }


    //START OF RETURNED SEALED OBJECT.
    return Object.seal({
        
        //START ENGINE/////////////////////////////////////////////////////////////////////////////////////////
        ENGINE:{
            start:function(){
                console.log("SIB-ENGINE STARTING");

                (function(){
                    if(isMobileDevice.any()){
                        _DOM_document.addEventListener('touchstart',__initSounds);
                }})();
            
                _DOM_window.onload = _engineStart;
            },

            useModules:function(filename){
                if(Array.isArray(filename)){
                    for(var i = 0; i < filename.length;i++)
                        __useModule(filename[i]);
                }else{
                    __useModule(filename);
                }
            },

            remModule:function(filename){
                __remModule(filename);
            }
        },//END of ENGINE



        //START SCENEMANAGER///////////////////////////////////////////////////////////////////////////////////
        SCENEMANAGER:{
            addScene:function(name,gameScene){
                _scenes[name] = gameScene;
                _scenesReady = false;
            },

            delScene:function(name){
                _scenes[name] = null;
                delete _scenes[name];
            },

            loadScene:function(name){
                _sceneLoadNextSceneName = name;
                _sceneLoadNewScene = true;

                _engineReady = false;
                _imagesReady = false;
            }
        },//END of SCENEMANAGER



        //START TILEMANAGER////////////////////////////////////////////////////////////////////////////////////
        TILEMAPMANAGER:{
            generateTileID:function(object){
                var tileID = 0; 

                if(typeof object === 'CGameObject'){
                    tileID = _tileMaps.push( new CTileMapRequest);
                    _tileMaps[tileID]._gameObject = object;
                    return tileID;
                }else if(typeof object === 'CSprite'){
                    tileID = _tileMaps.push(object);
                    return tileID;
                }
            },

            addCoordinatesToTileID:function(id,coordinates){
                if(!Array.isArray(coordinates)){
                    console.log("TILEMAPMANAGER: addTileMap - please provide array.");
                    return;
                }

                _tileMaps[id]._coordinates = coordinates;
            }

        },//END of TILEMANAGER

        //START CAMERAMANAGER//////////////////////////////////////////////////////////////////////////////////
        CAMERAMANAGER:{


        },//END of CAMERAMANAGER

        //START TIMEMANAGER////////////////////////////////////////////////////////////////////////////////////
        TIMEMANAGER:{
            getTime:function(){
                return Object.seal(_time);
            }
        },//END of TIMEMANAGER

		

        //START COLLISSIONMANAGER//////////////////////////////////////////////////////////////////////////////
        COLLISSIONMANAGER:{
            registerGameObjectForCollissionRequest:function(id,isActive,canSendInfo,canReceiveInfo){
                var len = null;
                var requestID = 0;

                var gameObject = _gameObjects[id];
                
                var request = gameObject.request;

                if(gameObject._attrib_ & ATTRIB_COLLISSIONREQUEST){

                    if(request[INDEX_COLLISSIONREQUEST]){
                        throw id + " already registered for sprite request";
                        return;
                    }
                }

                gameObject._attrib_ |= ATTRIB_COLLISSIONREQUEST;
                request[INDEX_COLLISSIONREQUEST] = new CCollissionRequest;
                request = request[INDEX_COLLISSIONREQUEST];
                request._canSendInfo = canSendInfo;
                request._canReceiveInfo = canReceiveInfo;

                if(isActive){
                    request._isActive = true;
                }else{
                    request._isActive = false;
                    request._isPassive = true;
                }
            },

            unregisterGameObjectForCollissionRequest:function(name){

              
            },

            getCollissionInfo:function(id){
                return _gameObjects[id].request[INDEX_COLLISSIONREQUEST];
            }
        },//END of CollissionManager



        //START SOUNDMANAGER///////////////////////////////////////////////////////////////////////////////////
        SOUNDMANAGER:{

            createSound:function(filename,bufferSize){
                return new CSound(filename,bufferSize);
            }


        },//END of SoundManager



        //START SCREENMANAGER//////////////////////////////////////////////////////////////////////////////////
        SCREENMANAGER:{
            selectScreen:function(id){
                return _layersScreen[id]._canvas;
            },

            assignScreenToDivElement:function(id,divID){
                __assignLayerToDivElement(id,divID);
            },

            createScreen:function(w,h){
                return __createLayer(w,h);
            },

            setScreenSize:function(w,h){
                _cameraW  = _screenW = w;
                _cameraH = _screenH = h;
                console.log("SETTING SCREEN WIDTH " + _screenW + " AND HEIGHT " + _screenH);
            },

            setScreenBackgroundColor:function(id,color){
                _layersScreen[id]._canvas.style.background = color;

            },

            setScreenZIndex:function(id,zIndex){
                _layersScreen[id]._canvas.style.zIndex = zIndex.toString();
            },

            getScreenContext:function(id){
                return _layersScreen[id]._context;
            },

            enableScreenClearUpdate:function(id,yes){
                _layersScreen[id]._updateEnabled = yes;
            },

            enableScreenClearEachObject:function(yes){
                _clearEachGameObject = yes;
            }
        },//END of ScreenManager



        //START INPUTMANAGER///////////////////////////////////////////////////////////////////////////////////
        INPUTMANAGER:{

            getKeyboard:function(){
                _DOM_window.addEventListener('keydown',__keyboardEventHandler,false);
                _DOM_window.addEventListener('keyup',__keyboardEventHandler,false);
                return _keyboard;
            },

            addKey:function(name,code){
                _keyboard[name] = false;
                var len = _keyboardKeyCodes.push(new CKeyboardKeyCode(name,code));
                console.log("%cADDING KEYS TO KEYBOARD: " + _keyboardKeyCodes[len-1].keyName + " KEYCODE: " + _keyboardKeyCodes[len-1].keyCode,"color:#008000");

            },

            getMouse:function(){
            	var zIndexes = [];
      
                for(var key in _layersScreen){
                zIndexes.push({'canvas':_layersScreen[key]._canvas,'zindex':_layersScreen[key]._canvas.style.zIndex});
                }
            	
            	zIndexes.sort(function(a,b){
                    if(a.zindex<b.zindex)
                        return 1;
                    else if(a.zindex < b.zindex)
                        return -1

                    return 0;
                });
            	
            	zIndexes[0].canvas.addEventListener('mousedown',__mouseEventHandler);
                zIndexes[0].canvas.addEventListener('mouseup',__mouseEventHandler);

                _mouse._canvasBoundingClientRect = zIndexes[0].canvas.getBoundingClientRect();
                _mouse.mouseDown = false;
                _mouse.mouseUp = false;
                _mouse.x = 0;
                _mouse.y = 0;

                return _mouse;
            },

            getTouch:function(){
                var zIndexes = [];
     
                for(var key in _layersScreen){
                zIndexes.push({'canvas':_layersScreen[key]._canvas,'zindex':_layersScreen[key]._canvas.style.zIndex});
                }
                
                zIndexes.sort(function(a,b){
                    if(a.zindex<b.zindex)
                        return 1;
                    else if(a.zindex < b.zindex)
                        return -1

                    return 0;
                });         

                zIndexes[0].canvas.addEventListener('touchstart',__touchEventHandler);
                zIndexes[0].canvas.addEventListener('touchend',__touchEventHandler);

                _touch.touchStart = false;
                _touch.touchEnd = false;
                _touch.x = 0;
                _touch.y = 0;

                return _touch;
            }
        },//END of InputManager



        //START SPRITEMANAGER//////////////////////////////////////////////////////////////////////////////////
        SPRITEMANAGER:{


            loadSpriteSheet:function(name,filename){

                var image = new Image();
                image.src = filename;
	
                image.onload = function(){
                    
					console.log("IMAGE SOURCE FOR LOADING: " + image.src);
                    _layersImage[name] = new CLayer;
                    _layersImageName.push(name);

                    var layerImage = _layersImage[name];

                    layerImage._canvas = _DOM_document.createElement('canvas');
                    layerImage._canvas.id = name;
                    layerImage._canvas.width = image.width;
                    layerImage._canvas.height = image.height;
                    layerImage._context = layerImage._canvas.getContext('2d');
                    layerImage._context.drawImage(image,0,0);

                    image = null;

                    console.log("%cLOADING SPRITESHEET: " + filename,"color:#008000");
                    console.log("   to canvas name - " + layerImage._canvas.id + ", dimensions - " + layerImage._canvas.width + "x" + layerImage._canvas.height);
                    
                    var length = _spriteCreateWorkload ? _spriteCreateWorkload.length:0;
                    var newSprite = null;
                    var i=0;

                    if(length != 0){
                        do{
                            
                            if(_spriteCreateWorkload[i] == null){
                                i++;
                                continue;
                            }

                        	if(name === _spriteCreateWorkload[i]._sheet){
                        	
    						newSprite = _spriteCreateWorkload[i];
    						_sprites[newSprite._id]._imageSource = _layersImage[newSprite._sheet]._context;

                            _spriteCreateWorkload[i] = null;

                            console.log("%cCREATING SPRITE: " + newSprite._id,"color:#008000");
                            console.log("   from sheet - " + _sprites[newSprite._id]._imageSource.canvas.id);
                            
                            }

                            i++;
                        }while(--length);
                    }

                    newSprite = null;
                    
                    length = _spriteCreateWorkload.length;

                    for(i=0; i < length;){
                        if(_spriteCreateWorkload[i] == null){
                            _spriteCreateWorkload.splice(i,1);
                            length = _spriteCreateWorkload.length;
                            continue;
                        }
                        else if(_spriteCreateWorkload[i] != null){
                            break;
                        }

                        i++;
                    }
           
                    if(length == 0){
                        console.log("%cCREATE SPRITE: all images loaded successfully.","color:#DAA520");
                        console.log("%cCALLING ALL IMAGE-DEPENDENT CALLBACKS.","color:#DAA520");

                        for(i=0;i<_imageDependentCallbacks.length;i++){
                            _imageDependentCallbacks[i]();
                            _imageDependentCallbacks[i] = null;
                        }

                        _imageDependentCallbacks = null;
                        _spriteCreateWorkload = null;
                        _imagesReady = true;
                    }

                };

              
            },


            createSprite:function(spriteSheetName){
                var id = 0,
                len = 0;

                len = _sprites.push(new CSprite);
                id = len - 1;
                _sprites[id]._id = id;

                if(_layersImage[spriteSheetName] === undefined)
                    console.log("%cCREATE SPRITE: waiting for all images to load.","color:#DAA520");

                 _arrayInsert(_spriteCreateWorkload,{_id:id,_sheet:spriteSheetName});

                return id;
            },


            selectSprite:function(id){
                if(_sprites[id] !== undefined){
                    return  _sprites[id];
                    console.warn("SELECT SPRITE: " + id + undefined);
                }

            },


            registerGameObjectForSpriteRequest:function(id,spriteID,animatable){
                var len = null;
                var requestID = 0;

                var gameObject = _gameObjects[id];

                gameObject._attrib_ |= ATTRIB_VISIBLE;
                
                var request = gameObject.request;

                if(gameObject._attrib_ & ATTRIB_SPRITEREQUEST){

                    if(request[INDEX_SPRITEREQUEST]){
                        throw id + " already registered for sprite request";
                        return;
                    }
                }
                    gameObject._attrib_ |= ATTRIB_SPRITEREQUEST;
        
                    len = _requests.push(gameObject);
                    requestID = len-1;

                    request[INDEX_SPRITEREQUEST] = new CSpriteRequest(animatable);

                    request = request[INDEX_SPRITEREQUEST];
                    request._id = requestID;
                    request._sprite = _sprites[spriteID];
                    request._sprite._imageSize = request._drawThisSpriteFrame;
                    request._gameObject = _gameObjects[id];


                console.log("%cREGISTERING GAMEOBJECT FOR SPRITE:","color:#008000");
                console.log("   gameobject ID - " + request._gameObject._id + ", sprite - " + request._sprite._id);

            },


            unregisterGameObjectForSpriteRequest:function(id,spriteID){


                // console.log("%cUN-REGISTERING GAMEOBJECT FOR SPRITE:","color:#008000");
                // console.log("   gameobject - " + id + ", sprite - " + spriteName);
                // console.warn("  (Remove added-methods references; otherwise a TypeError exception will be thrown.)")
                    
                
            },

            spriteRequest:function(id){
                return _gameObjects[id].request[INDEX_SPRITEREQUEST];
            },

            addToImageDependentCallback:function(callback){
                console.log("%cADDING IMAGE-DEPENDENT CALLBACK:","color:#DAA520");
                _imageDependentCallbacks.push(callback);
            }
        },//END of SpriteManager



        //START GAMEOBJECTMANAGER//////////////////////////////////////////////////////////////////////////////
        GAMEOBJECTMANAGER:{

            createGameObject:function(){
                var len = 0,
                id = 0;
                // _gameObjects[name] = new CGameObject;
                // _gameObjects[name]._name = name;
                len = _gameObjects.push(new CGameObject);
                id = len - 1;
                _gameObjects[id].setID(id);
                return id;
            },

            selectGameObject:function(id){
                return _gameObjects[id];
            },

            setGameObjectsLayer:function(ids,layerID){

                if(Array.isArray(ids) == false)
                    return;

                var i = 0,
                id = 0,
                len = ids.length;

                do{
                    id = ids[i];
                    _gameObjects[id]._layer = _layersScreen[layerID]._context;
                    console.log("%cSETTING GAMEOBJECTS LAYER:","color:#008000");
                    console.log("   gameobject ID - " + id + ", layer - " + _layersScreen[layerID]._context.canvas.id);
                    i++;
                }while(--len);
            },

            setGameObjectZIndex:function(id,zIndex){
                _gameObjects[id]._position.z = zIndex; 
            }
        },//END of GameObjectManager



        //START RENDERER//////////////////////////////////////////////////////////////////////////////////////
        RENDERER:{
            clearEach:function(yes){
                if(yes)
                    _clearEachGameObject = yes;
            },

            addRenderer:function(name,callback){
                __renderers[name] = callback;
                console.log("%cADDING RENDERER: " + name,'color:#663399')
            },

            useRenderer:function(name){
                _renderStart = __renderers[name];
                console.log("%cUSING RENDERER: " + name,'color:#663399')

            }
        },//END of Renderer



        //START ANIMATIONMANAGER//////////////////////////////////////////////////////////////////////////////

        ANIMATIONMANAGER:{
    
        }//END of Renderer
    
    });//END OF RETURNED SEALED OBJECT.
})();// END OF SIB CLOSURE.
///////////////////////////////////////////////////////////////

var SIB_Engine = SIB.ENGINE;
var SIB_ScreenManager = SIB.SCREENMANAGER;
var SIB_SoundManager = SIB.SOUNDMANAGER;
var SIB_SceneManager = SIB.SCENEMANAGER;
var SIB_SpriteManager = SIB.SPRITEMANAGER;
var SIB_InputManager = SIB.INPUTMANAGER;
var SIB_Renderer = SIB.RENDERER;
var SIB_GameObjectManager = SIB.GAMEOBJECTMANAGER;
var SIB_CollissionManager = SIB.COLLISSIONMANAGER;
var SIB_TileManager = SIB.TILEMANAGER;
var SIB_TimeManager = SIB.TIMEMANAGER;
