"use strict";

function SimpleShader(vertexShaderID, fragmentShaderID){
    // Instance variables (convention: all instance variables: mVariables
    this.mCompiledShader = null;
        // Reference to the compiled shader in webgl context
    this.mShaderVertexPositionAttribute = null;
        // Reference to SquareVertexPosition in shader
    this.mPixelColor = null;
        // Reference to the pixelColor uniform in the fragment shader
    this.mModelTransform = null;
        // Reference to the uModelTransform matrix in the vertex shader
    this.mViewProjTransform = null;
        // Reference to the uViewProjTransform in the vertex shader
        
    var gl = gEngine.Core.getGL();
    
    // Start of constructor code
    //
    // Step A: Load and compile Vertex and fragment shaders
    var vertexShader = this._compileShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = this._compileShader(fragmentShaderID, gl.FRAGMENT_SHADER);
    
    // Step B: Create and link shaders into a program
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader,fragmentShader);
    gl.linkProgram(this.mCompiledShader);
    
    // Step C: Checck for error
    if(!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shaders");
        return null;
    }
    
    // Step D: Gets a reference to the aSquareVertexPosition attribute
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");
    
    // Step E: Activates the vertex buffer loaded in Engine.Core_VertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    
    // Step F: Describe the characteristic of the vertex position attribute
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,          // each element is a 3 float (x, y, z)
        gl.FLOAT,   // data type is FLOAT
        false,      // if the content is normalized vectors
        0,          // numbers of bytes to skip in between elements
        0);          // offsets first element
        
    // Step G: Gets a reference to the uniform variable uPixelColor in the fragment shader
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
};

  // Returns a compiled shader from a shader in the dom
    // The id is the id of the script html tag
    SimpleShader.prototype._compileShader = function(filePath, shaderType) {
        var gl = gEngine.Core.getGL();
        var shaderSource = null, compiledShader = null;

        // Step A: Access the shader textfile
        shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);

        if (shaderSource === null) {
            alert("WARNING: Loading of:" + filePath + " Failed!");
            return null;
        }

        // Step B: Create the shader based on the shader type: vertex or fragment
        compiledShader = gl.createShader(shaderType);

        // Step C: Compile the created shader
        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);

        // Step D: check for errors and return results (null if error)
        // The log info is how shader compilation errors are typically displayed.
        // This is useful for debugging the shaders.
        if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
        }

        return compiledShader;
    };
    
    SimpleShader.prototype.activateShader = function(pixelColor, vpMatrix){
        var gl = gEngine.Core.getGL();
        gl.useProgram(this.mCompiledShader);
        gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
        gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
        gl.uniform4f(this.mPixelColor, pixelColor[0], pixelColor[1], pixelColor[2], pixelColor[3]);
    };
    
    SimpleShader.prototype.getShader = function() { return this.mCompiledShader; };
    
    // Loads per-object model transform to the vertex shader
    SimpleShader.prototype.loadObjectTransform = function (modelTransform) {
        var gl = gEngine.Core.getGL();
        gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
    }