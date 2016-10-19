/**
 * Authors:
 * Andreas Andersson n9795383
 * Li-Fu Hsu n9380418
 */

var gl;
var index=0;
var storeIndex=0;
var translations=[];
var translationLocs=[];
var rotations=[];
var rotationLocs=[];
var transX=0.0,transY=0.0;
var fall=false;
var flapLeft=true;

var program;
var modelList=[];

//Buffers
var leftWingBuffer, leftLegBuffer, leftArmBuffer,leftEarBuffer,
    rightWingBuffer, rightLegBuffer, rightArmBuffer, rightEarBuffer,
    bellyBuffer, eyesMouthBuffer;

//Indexes
var leftWing=0, leftLeg=1, leftArm=2, leftEar=3, rightWing=4,
    rightLeg=5, rightArm=6, rightEar=7, belly=8, eyesMouth=9;

function initArrays(){
    for(var i=0;i<modelList.length;i++){
        translations.push([0.0, 0.0, 0.0]);
        translationLocs[i]= gl.getUniformLocation(program, "translation");
        rotations.push([0.0, 270.0, 0.0]);
        rotationLocs[i] =gl.getUniformLocation(program, "theta");
    }
}

function render() {
    //Clear canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Draw
    for (var i=0;i<translations.length;i++){
        translations[i][0]=transX;
        translations[i][1]=transY;

    }
    //Draw functions
    rotations[leftWing]= leftWingFlap(rotations[leftWing]);
    drawLeftWing();
    drawRightWing();

    drawLeftLeg();
    drawLeftArm();
    drawLeftEar();


    drawRightLeg();
    drawRightArm();
    drawRightEar();

    drawBelly();
    drawEyesAndMouth();

    requestAnimFrame( render );
}
function setUniforms(thetaLocation,thetaValue,
                     translationLocation,translationValue){
    gl.uniform3fv(thetaLocation, thetaValue);
    gl.uniform3fv(translationLocation, translationValue);
}

function bindBufferAndPointer(buffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(
        program.positionAttribute, 3, gl.FLOAT, gl.FALSE,
        Float32Array.BYTES_PER_ELEMENT * 6, 0);
}

function drawLeftWing(){
    //bind buffer & pointer
    setUniforms(rotationLocs[leftWing], rotations[leftWing], translationLocs[leftWing], translations[leftWing]);
    bindBufferAndPointer(leftWingBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftWing].vertexCount);

}
function drawLeftLeg(){

    setUniforms(rotationLocs[leftLeg], rotations[leftLeg], translationLocs[leftLeg], translations[leftLeg]);
    bindBufferAndPointer(leftLegBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftLeg].vertexCount);

}
function drawLeftArm(){

    setUniforms(rotationLocs[leftArm], rotations[leftArm], translationLocs[leftArm], translations[leftArm]);
    bindBufferAndPointer(leftArmBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftArm].vertexCount);

}
function drawLeftEar(){

    setUniforms(rotationLocs[leftEar], rotations[leftEar], translationLocs[leftEar], translations[leftEar]);
    bindBufferAndPointer(leftEarBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftEar].vertexCount);

}
function drawRightWing(){
    setUniforms(rotationLocs[rightWing], rotations[rightWing], translationLocs[rightWing], translations[rightWing]);
    bindBufferAndPointer(rightWingBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightWing].vertexCount);

}
function drawRightLeg(){

    setUniforms(rotationLocs[rightLeg], rotations[rightLeg], translationLocs[rightLeg], translations[rightLeg]);
    bindBufferAndPointer(rightLegBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightLeg].vertexCount);

}
function drawRightArm(){

    setUniforms(rotationLocs[rightArm], rotations[rightArm], translationLocs[rightArm], translations[rightArm]);
    bindBufferAndPointer(rightArmBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightArm].vertexCount);

}
function drawRightEar(){

    setUniforms(rotationLocs[rightEar], rotations[rightEar], translationLocs[rightEar], translations[rightEar]);
    bindBufferAndPointer(rightEarBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightEar].vertexCount);

}
function drawBelly(){

    setUniforms(rotationLocs[belly], rotations[belly], translationLocs[belly], translations[belly]);
    bindBufferAndPointer(bellyBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[belly].vertexCount);

}
function drawEyesAndMouth(){

    setUniforms(rotationLocs[eyesMouth], rotations[eyesMouth], translationLocs[eyesMouth], translations[eyesMouth]);
    bindBufferAndPointer(eyesMouthBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[eyesMouth].vertexCount);

}

function createBuffers(){
    //Left wing
    leftWingBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, leftWingBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[0].vertices, gl.STATIC_DRAW); //Fill buffer with data

    //Left Leg
    leftLegBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, leftLegBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[1].vertices, gl.STATIC_DRAW); //Fill buffer with data

    //Left Arm
    leftArmBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, leftArmBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[2].vertices, gl.STATIC_DRAW); //Fill buffer with data

    //Left Ear
    leftEarBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, leftEarBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[3].vertices, gl.STATIC_DRAW); //Fill buffer with data

    //Right wing
    rightWingBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, rightWingBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[4].vertices, gl.STATIC_DRAW); //Fill buffer with data

    //Right Leg
    rightLegBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, rightLegBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[5].vertices, gl.STATIC_DRAW); //Fill buffer with data

    //Right Arm
    rightArmBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, rightArmBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[6].vertices, gl.STATIC_DRAW); //Fill buffer with data

    //Right Ear
    rightEarBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, rightEarBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[7].vertices, gl.STATIC_DRAW); //Fill buffer with data

    //Belly
    bellyBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, bellyBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[8].vertices, gl.STATIC_DRAW); //Fill buffer with data

    //Eyes and Mouth
    eyesMouthBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, eyesMouthBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[9].vertices, gl.STATIC_DRAW); //Fill buffer with data
}

function leftWingFlap(wing){
    var update=0;
    if (flapLeft && wing[0] <=50){
        update+=2;
    }
    else if (flapLeft){
        flapLeft=false;
    }

    if (!flapLeft && wing[0] >= 10){
        update-=2;
    }
    else if(!flapLeft){
        flapLeft=true;
    }
    rotations[rightWing][0] +=update;
        wing[0] +=update;
    return wing;

}

function init() {



    console.log("Init:"+modelList[8].vertexCount);
    //Bind and set up Canvas.
    var canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl');
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);
    //Init Webgl with shaders
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);

    createBuffers();
    initArrays();

    //Bind position from variable in HTML to Webgl.
    program.positionAttribute = gl.getAttribLocation(program, 'pos');
    gl.enableVertexAttribArray(program.positionAttribute);
    //Set position to variable.

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

function storeMesh(mesh){
    modelList.push(mesh);
    console.log("storeMesh:"+modelList[storeIndex++].vertexCount);
}

function loadMesh(filename) {
    $.ajax({
        url: filename,
        dataType: 'text',
        async:false
    }).done(function(data) {
        // init(loadMeshData(data));
        // init(loadMeshDataSeparateObjects(data));
        storeMesh(loadMeshData(data));
        console.log("model-List ["+index+"]:"+modelList[index++].vertexCount);
    }).fail(function() {
        alert('Failed to retrieve [' + filename + "]");
    });
}

function load(){

    //Left part of body
    loadMesh('../Resources/left_wing.obj');    //index 0
    loadMesh('../Resources/left_leg.obj');
    loadMesh('../Resources/left_arm.obj');
    loadMesh('../Resources/left_ear.obj');     //index 3
    //Right part of body
    loadMesh('../Resources/right_wing.obj');   //index 4
    loadMesh('../Resources/right_leg.obj');
    loadMesh('../Resources/right_arm.obj');
    loadMesh('../Resources/right_ear.obj');    //index 7
    //Belly, eyes and mouth.
    loadMesh('../Resources/body.obj');         //index 8
    loadMesh('../Resources/eyes_and_mouth.obj');   //index 9
    console.log("model-List load ["+5+"]:"+modelList[5].vertexCount);


}

$(document).ready(function() {
    load();
    init();


    // loadMesh('http://hygienspelet.se/triangles');
});
