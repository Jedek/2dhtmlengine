"use strict";

function MyGame(htmlCanvasID) {
    // Step A: Initialize the webGL Context and the VertexBuffer
    gEngine.Core.initializeWebGL(htmlCanvasID);
    
    // Step B: Create, load and compile the shaders
    this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader
            "src/GLSLShaders/SimpleFS.glsl"); // Path to the FragmentShader
    
    // Step C: Create the Renderable objects
    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1,1,1,1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);
    
    // Step D: Draw!
    gEngine.Core.clearCanvas([0, 0.8, 0, 1]); // Clear the canvas
    
    // Step E: set the white Renderable object's transform
    this.mWhiteSq.getXform().setPosition(-0.25, 0.25);
    this.mWhiteSq.getXform().setRotationInRad(0.2); // in radians
    this.mWhiteSq.getXform().setSize(1.2, 1.2);
    // Step F: draws the white square (transform behavior in the object);
    this.mWhiteSq.draw();
    
    // Step G: sets the red square transform
    this.mRedSq.getXform().setXPos(0.25); // to show alternative to setPosition
    this.mRedSq.getXform().setYPos(-0.25); // it is possible to set setX/Y seperately
    this.mRedSq.getXform().setRotationInDegree(45); // This is in Degree
    this.mRedSq.getXform().setWidth(0.4); // To show alternative to setSize
    this.mRedSq.getXform().setHeight(0.4); // That it is possible to width/ehgith seperately
    
    // Step H: draw the red square (transform behavior in the object);
    this.mRedSq.draw();
    
}