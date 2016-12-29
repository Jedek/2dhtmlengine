"use strict";

function MyGame(htmlCanvasID) {
    // The shader for drawing
    this.mShader = null;
    
    // Step A: Initialize the webGL Context and the VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);
    
    // Step B: Create, load and compile the shaders
    this.mShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", 
            "src/GLSLShaders/SimpleFS.glsl");
    
    // Step C: Draw!
    // Step C1: Clear the canvas
    gEngine.Core.clearCanvas([0,0.8,0,1]);
    
    // Step C2: Activate proper shader
    this.mShader.activateShader([0,1,1,1]);
    
    // Step C3: Draw the currently activated geometry and the activated shader
    var gl = gEngine.Core.getGL();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}