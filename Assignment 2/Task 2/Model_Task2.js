/**
 * Created by Andreas on 21/10/2016.
 */
function drawLeftWing(){
    bindBufferAndPointer(leftWingBuffer);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftWing].vertexCount);
}
function drawLeftLeg(){
    bindBufferAndPointer(leftLegBuffer);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftLeg].vertexCount);
}
function drawLeftArm(){
    bindBufferAndPointer(leftArmBuffer);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftArm].vertexCount);
}
function drawLeftEar(){
    bindBufferAndPointer(leftEarBuffer);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, modelList[leftEar].vertexCount);
}
function drawRightWing(){
    bindBufferAndPointer(rightWingBuffer);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightWing].vertexCount);
}
function drawRightLeg(){
    bindBufferAndPointer(rightLegBuffer);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightLeg].vertexCount);
}
function drawRightArm(){
    bindBufferAndPointer(rightArmBuffer);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightArm].vertexCount);

}
function drawRightEar(){
    bindBufferAndPointer(rightEarBuffer);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, modelList[rightEar].vertexCount);

}
function drawBelly(){
    bindBufferAndPointer(bellyBuffer);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, modelList[belly].vertexCount);
}
function drawEyesAndMouth(){
    bindBufferAndPointer(eyesMouthBuffer);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, modelList[eyesMouth].vertexCount);
}

function createModelBuffers(){
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