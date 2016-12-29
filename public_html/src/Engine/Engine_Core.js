"use strict"; // Operate in strict mode

var gEngine = gEngine || { };
    // Initialize the variable while ensuring it is not redefined
    
gEngine.Core = (function() {
    // Instance variable: the graphical context for drawing
    var mGL = null;
    
    // Accessor of the webgl context
    var getGL = function() { return mGL; };
    
    // Initialize the WebGL, the vertex buffer and compile the shaders
    var initializeWebGL = function(htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);
        
        // Get the standard or experimental webgl and binds to the Canvas area
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        
        if(mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
        
        // Now initialize the VertexBuffer
        gEngine.VertexBuffer.initialize();
    }
    
    var clearCanvas = function(color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]); // Set the color to be cleared
        mGL.clear(mGL.COLOR_BUFFER_BIT); // Clear to the color previously set
    }
    
    // Contains the functions and variables that will be accessible
    var mPublic = {
        getGL : getGL,
        initializeWebGL: initializeWebGL,
        clearCanvas: clearCanvas
    };
   
    return mPublic;
}());
