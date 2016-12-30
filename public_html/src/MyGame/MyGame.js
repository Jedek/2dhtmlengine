"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // scene file name
    this.kSceneFile = "Assets/scene.xml";
    // all squares
    this.mSqSet = new Array(); // These are renderable objects
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.kBgClip = "Assets/Sounds/BGClip.mp3";
    this.kCue = "Assets/Sounds/MyGame_cue.wav";
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function() {
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
                gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};
MyGame.prototype.unloadScene = function() {
    gEngine.AudioClips.stopBackgroundAudio();
    
    // unload the scene resources
    // gEngine.AudioClips.unloadAudio(this.kBgClip);
    // The above line is commented out on purpose because
    // you know this clip will be used elsewhere in the game
    // so you decide to not unload this clip!!
    gEngine.AudioClips.unloadAudio(this.kCue);
    
    var nextLevel = new BlueLevel(); // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);
    
    // Step A: Parse the Camera
    this.mCamera = sceneParser.parseCamera();
    
    // Step B: Parse the squares
    sceneParser.parseSquares(this.mSqSet);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw all squares
    for (var i = 0; i<this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    // For this very simple game, let's move the white square and pulse the red
    var whiteXform = this.mSqSet[0].getXform();
    var deltaX = 0.05;
    
    // Step A: Test for white square movement
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        whiteXform.incXPosBy(-deltaX);
        if (whiteXform.getXPos() < 11) // this is the right-bound of the window
            gEngine.GameLoop.stop();   
    }
    
        // Step A: Test for white square movement
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        whiteXform.incXPosBy(deltaX);
        if (whiteXform.getXPos() > 30) // this is the right-bound of the window
            gEngine.GameLoop.stop();   
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Left) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        gEngine.AudioClips.playACue(this.kCue);
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        gEngine.AudioClips.stopBackgroundAudio();
    }
    
    // Step B: test for white square rotation
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
        whiteXform.incRotationByDegree(1);
    
    var redXform = this.mSqSet[1].getXform();
    // Step C: test for pulsing of the red square
    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (redXform.getWidth() > 5)
            redXform.setSize(2, 2);
        redXform.incSizeBy(0.05);
    }
};
