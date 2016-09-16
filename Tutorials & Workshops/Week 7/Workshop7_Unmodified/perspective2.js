var canvas;
var gl;

var shadowPointsArray = [];

var near = -4;
var far = 4;

var theta  = 0.0;

var left = -2.0;
var right = 2.0;
var ytop = 2.0;
var bottom = -2.0;

var shadowModelViewMatrix, shadowProjectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var fColor;

var eye, at, up;
var light;

var m;

var red;
var black;


//***************






//*****************
var program;

var NumVertices  = 36;
var vBuffer;
var shadowBuffer;


var pointsArray = [];
var colorsArray = [];
var cBuffer;

var vertices = [
    vec4(-0.5, -0.5,  1.5, 1.0),
    vec4(-0.5,  0.5,  1.5, 1.0),
    vec4(0.5,  0.5,  1.5, 1.0),
    vec4(0.5, -0.5,  1.5, 1.0),
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5,  0.5, 0.5, 1.0),
    vec4(0.5,  0.5, 0.5, 1.0),
    vec4( 0.5, -0.5, 0.5, 1.0)
];
//
var vertexColors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
];
//

// var near = 0.3;
// var far = 3.0;
var radius = 4.0;
// var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect = 1.0;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
// var modelViewMatrixLoc, projectionMatrixLoc;

// var shadowModelViewMatrix, shadowProjectionMatrix;
var shadowModelViewMatrixLoc, shadowProjectionMatrixLoc;

// var eye;
// const at = vec3(0.0, 0.0, 0.0);
// const up = vec3(0.0, 1.0, 0.0);



function quad(a, b, c, d) {
     pointsArray.push(vertices[a]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[b]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[c]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[a]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[c]);
     colorsArray.push(vertexColors[a]);
     pointsArray.push(vertices[d]);
     colorsArray.push(vertexColors[a]);
}
//
function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}
//************
window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 0.9, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    aspect =  canvas.width/canvas.height;


    colorCube();

    // light = vec3(0.0, 2.0, 0.0);

// matrix for shadow projection

    // m = mat4();
    // m[3][3] = 0;
    // m[3][1] = -1/light[1];


    at = vec3(0.0, 0.0, 0.0);
    up = vec3(0.0, 1.0, 0.0);
    eye = vec3(1.0, 1.0, 1.0);

    // color square red and shadow black

    // red = vec4(1.0, 0.0, 0.0, 1.0);
    black = vec4(0.0, 0.0, 0.0, 1.0);

    // square

    shadowPointsArray.push(vec4( -0.5, 0.5,  -0.5, 1.0 ));
    shadowPointsArray.push(vec4( -0.5,  0.5,  0.5, 1.0 ));
    shadowPointsArray.push(vec4( 0.5, 0.5,  0.5, 1.0 ));
    shadowPointsArray.push(vec4( 0.5,  0.5,  -0.5, 1.0 ));

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, null);

    shadowCBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, shadowCBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(black), gl.STATIC_DRAW );

    //
    // var vColor = gl.getAttribLocation( program, "vColor" );
    // gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vColor);

    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    

    var shadowVBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, shadowVBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(shadowPointsArray), gl.STATIC_DRAW );



    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    fColor = gl.getUniformLocation(program, "fColor");

    //Cube Uniforms
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) ); //OBS undefined

    //Shadow Uniforms
    shadowModelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    shadowProjectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    shadowProjectionMatrix = ortho(left, right, bottom, ytop, near, far);
    gl.uniformMatrix4fv( shadowProjectionMatrixLoc, false, flatten(shadowProjectionMatrix) );

    // sliders for viewing parameters

    document.getElementById("zFarSlider").onchange = function() {
        far = event.srcElement.value;
    };
    document.getElementById("zNearSlider").onchange = function() {
        near = event.srcElement.value;
    };
    document.getElementById("radiusSlider").onchange = function() {
       radius = event.srcElement.value;
    };
    document.getElementById("thetaSlider").onchange = function() {
        theta = event.srcElement.value* Math.PI/180.0;
    };
    document.getElementById("phiSlider").onchange = function() {
        phi = event.srcElement.value* Math.PI/180.0;
    };
    document.getElementById("aspectSlider").onchange = function() {
        aspect = event.srcElement.value;
    };
    document.getElementById("fovSlider").onchange = function() {
        fovy = event.srcElement.value;
    };


    render();

}
//**********

// window.onload = function init() {

//     // var cBuffer = gl.createBuffer();
//     // gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
//     // gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
//     //
//     // var vColor = gl.getAttribLocation( program, "vColor" );
//     // gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
//     // gl.enableVertexAttribArray( vColor);
//     //
//     // vBuffer = gl.createBuffer();
//     // gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
//     // gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
//
//     var vBuffer = gl.createBuffer();
//     gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
//     gl.bufferData( gl.ARRAY_BUFFER, flatten(shadowArray), gl.STATIC_DRAW );
//
//     var vPosition = gl.getAttribLocation( program, "vPosition" );
//     gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
//     gl.enableVertexAttribArray( vPosition );
//
//     // shadowBuffer = gl.createBuffer();
//     // gl.bindBuffer( gl.ARRAY_BUFFER, shadowBuffer );
//     // gl.bufferData( gl.ARRAY_BUFFER, flatten(shadowArray), gl.STATIC_DRAW );
//     //
//     // var vPosition = gl.getAttribLocation( program, "vPosition" );
//     // gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
//     // gl.enableVertexAttribArray( vPosition );
//
//     // program.positionAttribute = gl.getAttribLocation(program, 'vPosition');
//     // gl.enableVertexAttribArray(program.positionAttribute);
//
//     fColor = gl.getUniformLocation(program, "fColor");
//
//
//
//
//
//
//
//     // gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
//
//
//
//     render();
// }

//******
var render = function() {

    // theta += 0.1;
    // if(theta > 2*Math.PI) theta -= 2*Math.PI;

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // model-view matrix for square

    shadowModelViewMatrix = lookAt(eye, at, up);

    // send color and matrix for square then render

    // gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    // gl.uniform4fv(fColor, flatten(red));
    // gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    // rotate light source
    //
    // light[0] = Math.sin(theta);
    // light[2] = Math.cos(theta);

    // model-view matrix for shadow then render

    // modelViewMatrix = mult(modelViewMatrix, translate(light[0], light[1], light[2]));
    // modelViewMatrix = mult(modelViewMatrix, m);
    // modelViewMatrix = mult(modelViewMatrix, translate(-light[0], -light[1],
    //     -light[2]));

    // gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    // gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    // send color and matrix for shadow

    gl.uniformMatrix4fv( shadowModelViewMatrixLoc, false, flatten(shadowModelViewMatrix) );
    // gl.bindBuffer( gl.ARRAY_BUFFER, null);
    // gl.bufferData( gl.ARRAY_BUFFER, flatten(black), gl.STATIC_DRAW );
    // gl.uniform4fv(fColor, flatten(black));
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    requestAnimFrame(render);
}
//*******

// var render = function(){
//
//     gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//
//     // eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
//     //     radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
//     // modelViewMatrix = lookAt(eye, at , up);
//     // projectionMatrix = perspective(fovy, aspect, near, far);
//     //
//     // gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
//     // gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
//     //
//     // gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
//     // gl.vertexAttribPointer(
//     //     program.positionAttribute, 4, gl.FLOAT, false, 0, 0);
//     //
//     // gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
//
//     // gl.uniformMatrix4fv( shadowModelViewMatrixLoc, false, flatten(shadowModelViewMatrix) );
//     // gl.uniformMatrix4fv( shadowProjectionMatrixLoc, false, flatten(shadowProjectionMatrix) );
//
//     // gl.bindBuffer(gl.ARRAY_BUFFER, shadowBuffer);
//     // gl.vertexAttribPointer(
//     //     program.positionAttribute, 4, gl.FLOAT, false, 0, 0);
//
//     // gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
//     gl.uniform4fv(fColor, flatten(black));
//     gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
//
//     requestAnimFrame(render);
// }

