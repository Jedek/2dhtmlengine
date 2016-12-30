"use strict"; // Operate in strict mode

var gEngine = gEngine || { };
    // Initialize the variable while ensuring it is not redefined
    
gEngine.Core = (function() {
    // Instance variable: the graphical context for drawing
    var mGL = null;
    
    // Accessor of the webgl context
    var getGL = function() { return mGL; };
    
    // Initialize the WebGL
    var _initializeWebGL = function(htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);
        
        // Get the standard or experimental webgl and binds to the Canvas area
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        
        if(mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
        }
    }
    
    var startScene = function (myGame) {
        myGame.loadScene.call(myGame); // Called in this way to keep correct context
        gEngine.GameLoop.start(myGame); // start the game loop after initialization is done
    };

    // initialize all of the EngineCore components
    var initializeEngineCore = function (htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        gEngine.AudioClips.initAudioContext();

        // Inits DefaultResources, when done, invoke the anonymous function to call startScene(myGame).
        gEngine.DefaultResources.initialize(function () { startScene(myGame); });
    };
    
    var clearCanvas = function(color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]); // Set the color to be cleared
        mGL.clear(mGL.COLOR_BUFFER_BIT); // Clear to the color previously set
    }
    
    var inheritPrototype = function(subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };
    
    // Contains the functions and variables that will be accessible
    var mPublic = {
        getGL : getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        inheritPrototype: inheritPrototype,
        startScene: startScene
    };
   
    return mPublic;
}());
