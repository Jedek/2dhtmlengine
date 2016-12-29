"use strict";

function MyGame(htmlCanvasID) {
    // Step A: Initialize the webGL Context and the VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);
    
    // Step B: Setup the camera
    this.mCamera = new Camera(
            vec2.fromValues(20, 60), // center of the World Coordinate System
            20, // Width of the WC
            [20, 40, 600, 300]); // viewport (orgX, orgY, width, height)
    
    // Step C: Create the shader
    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader
            "src/GLSLShaders/SimpleFS.glsl"); // Path to the FragmentShader
    
    // Step C: Create the Renderable objects
    this.mBlueSq = new Renderable(this.mConstColorShader);
    this.mBlueSq.setColor([0.25,0.25,0.95,1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0.25, 0.25, 1]);
    this.mTLSq = new Renderable(this.mConstColorShader);
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1]); // Top-left shows red
    this.mTRSq = new Renderable(this.mConstColorShader);
    this.mTRSq.setColor([0.1, 0.9, 0.1, 1]); // Top-right shows green
    this.mBRSq = new Renderable(this.mConstColorShader);
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1]); // Top-right shows green
    this.mBLSq = new Renderable(this.mConstColorShader);
    this.mBLSq.setColor([0.1, 0.1, 0.1, 1]); // Top-right shows green
    
    // Step E: Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]); // Clear the canvas
    
    // Step F: Start drawing by activating the camera
    this.mCamera.setupViewProjection();
    var vpMatrix = this.mCamera.getVPMatrix();
  
    // Step G: Draw the blue square
    this.mBlueSq.getXform().setPosition(20, 60); // to show alternative to setPosition
    this.mBlueSq.getXform().setRotationInRad(0.2); // This is in Degree
    this.mBlueSq.getXform().setSize(5,5); // To show alternative to setSize
    this.mBlueSq.draw(vpMatrix);
    
    // Step H: Draw with the red shader
    // Center red square
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2,2);
    this.mRedSq.draw(vpMatrix);
    
    // Top left
    this.mTLSq.getXform().setPosition(10,65);
    this.mTLSq.draw(vpMatrix);
    
    // Top right
    this.mTRSq.getXform().setPosition(30,65);
    this.mTRSq.draw(vpMatrix);
    
    // Bottom left
    this.mBLSq.getXform().setPosition(30,55);
    this.mBLSq.draw(vpMatrix);
    
    // Bottom right
    this.mBRSq.getXform().setPosition(10,55);
    this.mBRSq.draw(vpMatrix);
}