/**
 * Authors:
 * Andreas Andersson n9795383
 * Li-Fu Hsu n9380418
 */

var gl;
var size;
var program;
var vColor;
var frameBuffer;
var colorPick = new Uint8Array(4);
var texture;
var tempModelColors=[];
var canvas;
var match;
var modelSelected=false;
var loop=true;

//Model Arrays
var modelColors=[];
var thetas=[];
var thetaLocs=[];
var translations=[];
var translationLocs=[];
var updateTrans=[];
var leftRight=[];



function init(object) {
    //Bind and set up Canvas.
    canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl');
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    //Init Webgl with shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    program.positionAttribute = gl.getAttribLocation(program, 'pos');
    gl.enableVertexAttribArray(program.positionAttribute);

    //Init our Picking "Layer".
    initTextureAndFrameBuffer();
    //Init and bind our models to buffers.
    initObject(object);
    //Create Model Arrays (Arrays with Theta,Colours,Translation
    //And binds uniforms.
    initModelArrays();

    //Add Event listener that calls our picking function
    canvas.addEventListener("mousedown", function (event) {
        picking(event);
    });
    //Render
    render(true);
}


function initModelArrays() {
    //Colours
    modelColors.push([0.5, 0, 0, 1]);
    modelColors.push([0, 0, 0.5, 1]);

    //UpdateTrans
    updateTrans.push(0.009);
    updateTrans.push(0.004);

    //Thetas and Uniform binding.
    for (var z=0;z<2;z++){
        leftRight.push(false);
        thetas.push([ 0, 0, 0 ]);
        translations.push(0.0);
        thetaLocs[z]=gl.getUniformLocation(program, "theta");
        translationLocs[z]= gl.getUniformLocation(program, "translation");
    }
}

function initTextureAndFrameBuffer(){
    //Create Texture for the picking
    texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 512, 0,
        gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.generateMipmap(gl.TEXTURE_2D);

    // Allocate a frame buffer object
    frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer( gl.FRAMEBUFFER, frameBuffer);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

}

function initObject(object){
    //Create a Object Model Buffer
    vertexBuffer = gl.createBuffer();
    //Bind buffer to the created variable
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //Fill buffer with data
    gl.bufferData(gl.ARRAY_BUFFER, object.vertices, gl.STATIC_DRAW);
    //Set the size for our Model Object (used in drawArrays as limit).
    size=object.vertexCount;
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
    // loadMesh('../Resources/triangles.obj');
    loadMesh('http://hygienspelet.se/triangles');
});

