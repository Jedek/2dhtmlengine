uniform mat4 uModelTransform; // to transform the vertex position
attribute vec3 aSquareVertexPosition; // Expects one vertex position

void main(void) {
    gl_Position = uModelTransform * vec4(aSquareVertexPosition, 1.0);
}