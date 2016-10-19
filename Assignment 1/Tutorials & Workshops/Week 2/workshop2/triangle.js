var gl;
var points;
function initWebGL(canvas) {
 gl = null;
 try {
 // Try to grab the standard context. If it fails, fallback to experimental.
 gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
 }
 catch(e) {}
 // If we don't have a GL context, give up now
 if (!gl) {
 alert("Unable to initialize WebGL. Your browser may not support it.");
 gl = null;
 }
 return gl;
}
window.onload = function init() {
 var canvas = document.getElementById( "gl-canvas" );
 //gl = WebGLUtils.setupWebGL( canvas );
 gl = initWebGL(canvas);
 if ( !gl ) { alert( "WebGL isn't available" );
 }
 // Three Vertices
 var vertices = [
 vec2( -0.2, -0.2 ),
 vec2( 0, 0.2 ),
 vec2( 0.2, -0.2 ),
 // Three other Vertices
  vec2( 0.6, 0.6 ),
 vec2( 0.8, 1.0 ),
 vec2( 1.0, 0.6 )
 ];




  // Configure WebGL
 //
 gl.viewport( 0, 0, canvas.width, canvas.height );
 gl.clearColor( 0.5, 0.5, 1.0, 1.0 );
 // Load shaders and initialize attribute buffers
 var program = initShaders( gl, "vertex-shader", "fragment-shader" );
 gl.useProgram( program );
 // Load the data into the GPU
 var bufferId = gl.createBuffer();
 gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
 gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );


 // Associate out shader variables with our data buffer
 var vPosition = gl.getAttribLocation( program, "vPosition" );
 gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
 gl.enableVertexAttribArray( vPosition );
 render();
};
function render() {
 gl.clear( gl.COLOR_BUFFER_BIT );
 gl.drawArrays( gl.TRIANGLES, 0, 6 );
 
}