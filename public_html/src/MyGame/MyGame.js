"use strict";

function MyGame(htmlCanvasID) {
    // Step A: Initialize the webGL Context and the VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);
    var gl = gEngine.Core.getGL();
    
    // Step B: Create the shader
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
    
    // Step D: Draw!
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]); // Clear the canvas
    
    // Step E: Setting up the Viewport
    // Step E1: Set up the viewport: area on canvas to be drawn
    gl.viewport(
            20, // The x position of bottom-left corner of the area to be drawn
            40, // The y position of bottom-left corner of the area to be drawn
            600, // Width of the area to be drawn
            300 // Height of the area to be drawn
        ); 
    // Step E2: set up the corresponding scissor area t olimit clear area
    gl.scissor(
            20, // The x position of bottom-left corner of the area to be drawn
            40, // The y position of bottom-left corner of the area to be drawn
            600, // Width of the area to be drawn
            300 // Height of the area to be drawn
        );
    // Step E3: enable the scissor area, clear and then disable the scisssor area
    gl.enable(gl.SCISSOR_TEST);
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]); // Clear the scissor area
    gl.disable(gl.SCISSOR_TEST);
    
    // Step F: set up view and projection matrices
    var viewMatrix = mat4.create();
    var projMatrix = mat4.create();
    // Step F1: define the view matrix
    mat4.lookAt(viewMatrix,
        [20, 60, 10], // camera position
        [20, 60, 0], // look at position
        [0, 1, 0]); // orientation
    // Step F2: define the projection matrix
    mat4.ortho(projMatrix,
        -10, // Distant to left of World Coordinate System
        10, // Distant to right of WC
        -5, // Distant to top of WC
        5, // Distant to bottom of WC
        0, // z-distant to near plane
        1000); // z-distant to far plane
    // Step F3: concatenate to form the View-Projection operator
    var vpMatrix = mat4.create();
    mat4.multiply(vpMatrix, projMatrix, viewMatrix);
    
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