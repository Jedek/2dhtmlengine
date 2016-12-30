"use strict"

function Scene() {} // The constructor
Scene.prototype.initialize = function() {
    // Called from GameLoop after loading is done
};
Scene.prototype.loadSCene = function() {
    // Called from EngineCore.startScene();
};
Scene.prototype.unloadScene = function() {};
Scene.prototype.update = function() {};
Scene.prototype.draw = function() {};