/**
 * Authors:
 * Andreas Andersson n9795383
 * Li-Fu Hsu n9380418
 */

var gl;
var size;
var program;

//Object 1
var theta1 = [ 0, 0, 0 ]; //x,y,z
var thetaLoc1;
var translationLoc1;
var translation1=0.0;
var leftToRight1=true;
var color1=[0.5, 0, 0, 1];

//Object 2
var theta2 = [ 0, 0, 0 ]; //x,y,z
var thetaLoc2;
var translationLoc2;
var translation2=0.0;
var leftToRight2=false;
var color2=[0, 0, 0.5, 1];

var vColor;

function render() {
    //Clear canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Draw
    renderObj1();
    renderObj2();

    //Calculate our new rotation and position/translation1 (For next Render).
    calculations();


    requestAnimFrame( render );
}

function renderObj1() {
    //Update variables
    vColor = gl.getUniformLocation(program, "vColor");
    gl.uniform4fv( vColor, new Float32Array(color1) );

    gl.uniform3fv(thetaLoc1, theta1);
    gl.uniform1f(translationLoc1, translation1);
    gl.drawArrays(gl.TRIANGLES, 0, size );
}
function renderObj2(){
    //Update variables
    
    vColor = gl.getUniformLocation(program, "vColor");
    gl.uniform4fv( vColor, new Float32Array(color2) );

    gl.uniform3fv(thetaLoc2, theta2);
    gl.uniform1f(translationLoc2, translation2);
    gl.drawArrays(gl.TRIANGLES, 0, size );


}

function calculations() {

    //****** Object 1 ******
    //Rotation
    theta1[1] += 1.0;
    
    //Translation
    if (leftToRight1 && translation1 <0.4){
        translation1+=0.007;
    }
    else if (leftToRight1){
        leftToRight1=false;
    }

    if (!leftToRight1 && translation1 > -0.4){
        translation1-=0.007;
    }
    else if(!leftToRight1){
        leftToRight1=true;
    }



    //****** Object 2 ******
    //Rotation
    theta2[1] += 5.0;

    //Translation
    if (leftToRight2 && translation2 <0.6){
        translation2+=0.004;
    }
    else if (leftToRight2){
        leftToRight2=false;
    }

    if (!leftToRight2 && translation2 > -0.6){
        translation2-=0.004;
    }
    else if(!leftToRight2){
        leftToRight2=true;
    }



}

function init(object) {
    //Bind and set up Canvas.
    var canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl');
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);
    //Init Webgl with shaders
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);

    //Create a WebGl buffer
    var vertexBuffer = gl.createBuffer();
    //Bind buffer to the created variable
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //Fill buffer with data
    gl.bufferData(gl.ARRAY_BUFFER, object.vertices, gl.STATIC_DRAW);

    //Bind position from variable in HTML to Webgl.
    program.positionAttribute = gl.getAttribLocation(program, 'pos');
    gl.enableVertexAttribArray(program.positionAttribute);
    //Set position to variable.
    gl.vertexAttribPointer(
        program.positionAttribute, 3, gl.FLOAT, gl.FALSE,
        Float32Array.BYTES_PER_ELEMENT * 6, 0);

    //Object 1- Rotation and Translation positions/values.
    thetaLoc1 = gl.getUniformLocation(program, "theta");
    translationLoc1 = gl.getUniformLocation(program, "translation");

    //Object 2- Rotation and Translation positions/values.
    thetaLoc2 = gl.getUniformLocation(program, "theta");
    translationLoc2 = gl.getUniformLocation(program, "translation");

    
    //Render
    size=object.vertexCount;
    render();

}

/********      Provided code       ********/
function loadMeshData(string) {
    var lines = string.split("\n");
    var positions = [];
    var normals = [];
    var vertices = [];

    for ( var i = 0 ; i < lines.length ; i++ ) {
        var parts = lines[i].trimRight().split(' ');
        if ( parts.length > 0 ) {
            switch(parts[0]) {
                case 'v':  positions.push(
                    vec3.fromValues(
                        parseFloat(parts[1]),
                        parseFloat(parts[2]),
                        parseFloat(parts[3])
                    ));
                    break;
                case 'vn':
                    normals.push(
                        vec3.fromValues(
                            parseFloat(parts[1]),
                            parseFloat(parts[2]),
                            parseFloat(parts[3])));
                    break;
                case 'f': {
                    var f1 = parts[1].split('/');
                    var f2 = parts[2].split('/');
                    var f3 = parts[3].split('/');
                    Array.prototype.push.apply(
                        vertices, positions[parseInt(f1[0]) - 1]);
                    Array.prototype.push.apply(
                        vertices, normals[parseInt(f1[2]) - 1]);
                    Array.prototype.push.apply(
                        vertices, positions[parseInt(f2[0]) - 1]);
                    Array.prototype.push.apply(
                        vertices, normals[parseInt(f2[2]) - 1]);
                    Array.prototype.push.apply(
                        vertices, positions[parseInt(f3[0]) - 1]);
                    Array.prototype.push.apply(
                        vertices, normals[parseInt(f3[2]) - 1]);
                    break;
                }
            }
        }
    }
    console.log("Loaded mesh with " + (vertices.length / 6) + " vertices");

    return {
        primitiveType: 'TRIANGLES',
        vertices: new Float32Array(vertices),
        vertexCount: vertices.length / 6,
        material: {ambient: 0.2, diffuse: 0.5, shininess: 10.0}
    };
}

function loadMesh(filename) {
    $.ajax({
        url: filename,
        dataType: 'text'
    }).done(function(data) {
        init(loadMeshData(data));
    }).fail(function() {
        alert('Failed to retrieve [' + filename + "]");
    });
}

$(document).ready(function() {
    // loadMesh('../Resources/triangles.obj')
    loadMesh('http://hygienspelet.se/triangles');
});
