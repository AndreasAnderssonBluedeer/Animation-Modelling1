/**
 * Authors:
 * Andreas Andersson n9795383
 * Li-Fu Hsu n9380418
 */

var gl;
var theta = [ 0, 0, 0 ]; //x,y,z
var thetaLoc;
// var translationLoc;
var translation=0.0;
var leftToRight=true;
var size;
var index=0;
var storeIndex=0;
var translations=[];
var translationLocs=[];
var rotations=[];
var rotationLocs=[];
var transX=0.0,transY=0.0;
var fall=false;
var flapLeft=true, flapRight=false;

var program;
var modelList=[];

//Buffers
var leftWingBuffer, leftLegBuffer, leftArmBuffer,leftEarBuffer,
    rightWingBuffer, rightLegBuffer, rightArmBuffer, rightEarBuffer,
    bellyBuffer, eyesMouthBuffer,planeBuffer;

//Indexes
var leftWing=0, leftLeg=1, leftArm=2, leftEar=3, rightWing=4,
    rightLeg=5, rightArm=6, rightEar=7, belly=8, eyesMouth=9, plane=10;

function initArrays(){
    for(var i=0;i<modelList.length-1;i++){
        translations.push([0.0, 0.0, 0.0]);
        translationLocs[i]= gl.getUniformLocation(program, "translation");
        rotations.push([0.0, 270.0, 0.0]);
        rotationLocs[i] =gl.getUniformLocation(program, "theta");
    }
    translations.push([1.0, -2.0, 0.0]);
    translationLocs[i]= gl.getUniformLocation(program, "translation");
    rotations.push([90.0, 0.0, 0.0]);
    rotationLocs[i] =gl.getUniformLocation(program, "theta");
}

function render() {
    //Clear canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Draw
    // gl.drawArrays(gl.TRIANGLES, 0,size  );
    //Calculate our new rotation and position/translation1.
    // calculations();
    if (fall){
        falldown();
    }
    //-1, we don't wanna tranlate the plane
    for (var i=0;i<translations.length-1;i++){
        translations[i][0]=transX;
        translations[i][1]=transY;

    }
    //Draw functions
    rotations[leftWing]= leftWingFlap(rotations[leftWing]);
    // rotations[rightWing]= rightWingFlap(rotations[rightWing]);
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
    drawPlane();

    // wingFlap();
    // theta[1] += 2.0;    //temp

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

function falldown(){
    if (transY >-0.65){
        transY-=0.05;
    }else{
        fall=false;
    }

}

function drawLeftWing(){
    //bind buffer & pointer

    calculations(leftWing);
    setUniforms(rotationLocs[leftWing], rotations[leftWing], translationLocs[leftWing], translations[leftWing]);
    bindBufferAndPointer(leftWingBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftWing].vertexCount);

}
function drawLeftLeg(){
    calculations(leftLeg);
    setUniforms(rotationLocs[leftLeg], rotations[leftLeg], translationLocs[leftLeg], translations[leftLeg]);
    bindBufferAndPointer(leftLegBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftLeg].vertexCount);

}
function drawLeftArm(){
    calculations(leftArm);
    setUniforms(rotationLocs[leftArm], rotations[leftArm], translationLocs[leftArm], translations[leftArm]);
    bindBufferAndPointer(leftArmBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftArm].vertexCount);

}
function drawLeftEar(){
    calculations(leftEar);
    setUniforms(rotationLocs[leftEar], rotations[leftEar], translationLocs[leftEar], translations[leftEar]);
    bindBufferAndPointer(leftEarBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftEar].vertexCount);

}
function drawRightWing(){

    calculations(rightWing);
    setUniforms(rotationLocs[rightWing], rotations[rightWing], translationLocs[rightWing], translations[rightWing]);
    bindBufferAndPointer(rightWingBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightWing].vertexCount);

}
function drawRightLeg(){
    calculations(rightLeg);
    setUniforms(rotationLocs[rightLeg], rotations[rightLeg], translationLocs[rightLeg], translations[rightLeg]);
    bindBufferAndPointer(rightLegBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightLeg].vertexCount);

}
function drawRightArm(){
    calculations(rightArm);
    setUniforms(rotationLocs[rightArm], rotations[rightArm], translationLocs[rightArm], translations[rightArm]);
    bindBufferAndPointer(rightArmBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightArm].vertexCount);

}
function drawRightEar(){
    calculations(rightEar);
    setUniforms(rotationLocs[rightEar], rotations[rightEar], translationLocs[rightEar], translations[rightEar]);
    bindBufferAndPointer(rightEarBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightEar].vertexCount);

}
function drawBelly(){
    calculations(belly);
    setUniforms(rotationLocs[belly], rotations[belly], translationLocs[belly], translations[belly]);
    bindBufferAndPointer(bellyBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[belly].vertexCount);

}
function drawEyesAndMouth(){
    calculations(eyesMouth);
    setUniforms(rotationLocs[eyesMouth], rotations[eyesMouth], translationLocs[eyesMouth], translations[eyesMouth]);
    bindBufferAndPointer(eyesMouthBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[eyesMouth].vertexCount);

}
function drawPlane(){
    setUniforms(rotationLocs[plane], rotations[plane], translationLocs[plane], translations[plane]);
    bindBufferAndPointer(planeBuffer);
    gl.drawArrays(gl.TRIANGLES, 0, modelList[plane].vertexCount);
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

    //Plane
    planeBuffer = gl.createBuffer(); //create Buffer variable
    gl.bindBuffer(gl.ARRAY_BUFFER, planeBuffer); //Bind buffer to the created variable
    gl.bufferData(gl.ARRAY_BUFFER, modelList[10].vertices, gl.STATIC_DRAW); //Fill buffer with data
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

function rightWingFlap(wing){
    var update=0;
    if (flapRight && wing[1] <= 290){
        update+=2;
    }
    else if (flapRight){
        flapRight=false;
    }

    if (!flapRight && wing[1] >= 230 ){
        update-=2;
    }
    else if(!flapRight){
        flapRight=true;
    }
    wing[1] +=update;
    return wing;

}




function calculations(index) {
    //Rotation
    // rotations[index][1] += 2.0;
    
    // //Translation
    // if (leftToRight && translation <0.6){
    //     translation+=0.007;
    // }
    // else if (leftToRight){
    //     leftToRight=false;
    // }
    //
    // if (!leftToRight && translation > -0.6){
    //     translation-=0.007;
    // }
    // else if(!leftToRight){
    //     leftToRight=true;
    // }

    //Update variables
    // gl.uniform3fv(thetaLoc, theta);
    // gl.uniform1f(translationLoc, translation);
//
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

    //Create a WebGl buffer
    // var vertexBuffer = gl.createBuffer();
    // //Bind buffer to the created variable
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    createBuffers();
    initArrays();

    //Bind position from variable in HTML to Webgl.
    program.positionAttribute = gl.getAttribLocation(program, 'pos');
    gl.enableVertexAttribArray(program.positionAttribute);
    //Set position to variable.
   

    //Rotation and Translation positions/values.
    // thetaLoc = gl.getUniformLocation(program, "theta");
    // translationLoc = gl.getUniformLocation(program, "translation");

    //Render                [3]=vertexCount
    // size=modelObj.objects[6][3];
    // size= modelObj.vertexCount;
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

function loadMeshDataSeparateObjects (string) {
    var lines = string.split("\n");
    var objects = [];
    var index = -1; //becomes 0 at first push to list. "case: 'o'"
    var totalVertexCount=0;

    for ( var i = 0 ; i < lines.length ; i++ ) {
        var parts = lines[i].trimRight().split(' ');
        if ( parts.length > 0 ) {
            switch(parts[0]) {

                case 'o':
                    console.log("Object:"+parts[1]);
                    var positions = [];
                    var normals = [];
                    var vertices = [];
                    var list = [];

                    objects.push(list);
                    index++;
                    objects[index].push(positions);  // index=0,positions
                    objects[index].push(normals); //index=1, normals
                    objects[index].push(vertices); //index=2, vertices
                    break;

                case 'v':  objects[index][0].push(
                    vec3.fromValues(
                        parseFloat(parts[1]),
                        parseFloat(parts[2]),
                        parseFloat(parts[3])
                    ));
                    break;
                case 'vn':
                    objects[index][1].push(
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
                        objects[index][2], objects[index][0][parseInt(f1[0]) - 1]);
                    Array.prototype.push.apply(
                        objects[index][2],objects[index][1][parseInt(f1[2]) - 1]);
                    Array.prototype.push.apply(
                        objects[index][2], objects[index][0][parseInt(f2[0]) - 1]);
                    Array.prototype.push.apply(
                        objects[index][2], objects[index][1][parseInt(f2[2]) - 1]);
                    Array.prototype.push.apply(
                        objects[index][2], objects[index][0][parseInt(f3[0]) - 1]);
                    Array.prototype.push.apply(
                        objects[index][2], objects[index][1][parseInt(f3[2]) - 1]);
                    break;
                }
            }
        }
    }
    var verticesList=[];
    for(var x=0;x<objects.length;x++){
        //Calculate total number fo vertexes.
        totalVertexCount+=objects[x][2].length / 6;
        var vertexCount=0;
        //Calculate number of vertexes for that specific object.
        vertexCount= objects[x][2].length / 6;
        objects[x].push(vertexCount); //Index=3
        //Convert all of them to float.
        verticesList.push(objects[x][2]);
        objects[x].push= new Float32Array(objects[x][2]);

    }
    console.log("Loaded mesh with " + (totalVertexCount) + " vertices");

    return {
        primitiveType: 'TRIANGLES',
        objects:objects,
        vertices: new Float32Array(verticesList) ,
        totalVertexCount: totalVertexCount,
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
    loadMesh('../Resources/plane.obj');
    console.log("model-List load ["+5+"]:"+modelList[5].vertexCount);


}

$(document).ready(function() {
    load();
    init();


    // loadMesh('http://hygienspelet.se/triangles');
});
