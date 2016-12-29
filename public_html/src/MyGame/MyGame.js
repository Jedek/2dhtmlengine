"use strict";

function MyGame(htmlCanvasID) {
    // Step A: Initialize the webGL Context and the VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);
    
    this.mRenderables = [];
    
    // Step B: Setup the camera
    this.mCamera = new Camera(
            vec2.fromValues(20, 60), // center of the World Coordinate System
            20, // Width of the WC
            [20, 40, 600, 300]); // viewport (orgX, orgY, width, height)
    
    // Step C: Create the shader
    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader
            "src/GLSLShaders/SimpleFS.glsl"); // Path to the FragmentShader
    
    // Step C: Generate the Renderable objects and store them in an array
    this.generateRenderable([0.25,0.25,0.95,1], [20, 60], [5,5]); // Big blue sqare
    this.generateRenderable([0.9, 0.1, 0.1, 1], [20, 60], [2,2]); // Little red square
    this.generateRenderable([0.9, 0.1, 0.1, 1], [10, 65]); // Top left
    this.generateRenderable([0.1, 0.9, 0.1, 1], [30, 65]); // Top right
    this.generateRenderable([0.1, 0.1, 0.9, 1], [30, 55]); // bottom left
    this.generateRenderable([0.1, 0.1, 0.1, 1], [10, 55]); // bottom right
    
    // Step E: Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]); // Clear the canvas
    
    // Step F: Start drawing by activating the camera
    this.mCamera.setupViewProjection();
    var vpMatrix = this.mCamera.getVPMatrix();

    // Step G: Run through the renderables array and draw away!
    for(var i=0; i < this.mRenderables.length; i++) {
        this.mRenderables[i].draw(vpMatrix);
    }
}

MyGame.prototype.generateRenderable = function(color, position, size) {
    var mRenderable = new Renderable(this.mConstColorShader);
    mRenderable.setColor(color);
    
    if(position) {
        mRenderable.getXform().setPosition(position[0], position[1]);
    }
    
    if(size) {
        mRenderable.getXform().setSize(size[0], size[1]);
    }
    
    this.mRenderables.push(mRenderable);
};