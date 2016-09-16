/**
 * Authors:
 * Andreas Andersson n9795383
 * Li-Fu Hsu n9380418
 */
function render(booli) {
    loop=booli;

    if (loop) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    else if(!loop){
        tempModelColors=null;
        tempModelColors=[];
        for(var k=0;k<modelColors.length; k++) {
            tempModelColors.push(modelColors[k]);
        }
    }
    renderObj1();
    renderObj2();
    renderCube1();
    renderCube2();
    renderCube3();
    renderCube4();

    rotate();

    if (loop){
    translate();
        requestAnimFrame(render);
    }

    loop=true;
}

function renderObj1() {
    //Update variables
    if(loop) {
        var colorUpdate = translations[0][0] + 0.4;
        modelColors[0] = [0.5, colorUpdate, 0, 1];
    }
    setDrawColor(modelColors[0]);
    setUniforms(thetaLocs[0],thetas[0],translationLocs[0],translations[0]);
    bufferAndPointerObj();
    gl.drawArrays(gl.TRIANGLES, 0, size );

}
function renderObj2(){
    //Update variables
    if(loop) {
        var colorUpdate = translations[1][0]  + 0.4;
        modelColors[1] = [0, 0.5, colorUpdate, 1];
    }
    setDrawColor(modelColors[1]);
    setUniforms(thetaLocs[1],thetas[1],translationLocs[1],translations[1]);
        bufferAndPointerObj();
        gl.drawArrays(gl.TRIANGLES, 0, size);

}

function renderCube1(){
    setDrawColor(modelColors[2]);
    setUniforms(thetaLocs[2],thetas[2],translationLocs[2],translations[2]);
        bufferAndPointerCube();
        gl.drawArrays(gl.TRIANGLES, 0, points.length);

}
function renderCube2(){
    setDrawColor(modelColors[3]);
    setUniforms(thetaLocs[3],thetas[3],translationLocs[3],translations[3]);
        bufferAndPointerCube();
        gl.drawArrays(gl.TRIANGLES, 0, points.length);

}
function renderCube3(){
    setDrawColor(modelColors[4]);
    setUniforms(thetaLocs[4],thetas[4],translationLocs[4],translations[4]);
        bufferAndPointerCube();
        gl.drawArrays(gl.TRIANGLES, 0, points.length);

}
function renderCube4() {
    setDrawColor(modelColors[5]);
    setUniforms(thetaLocs[5], thetas[5], translationLocs[5], translations[5]);
    bufferAndPointerCube();
    gl.drawArrays(gl.TRIANGLES, 0, points.length);

}

function bufferAndPointerCube(){
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexCubeBuffer);
    gl.vertexAttribPointer(
        program.positionAttribute, 3, gl.FLOAT, gl.FALSE,
        0 , 0);
}
function bufferAndPointerObj(){
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(
        program.positionAttribute, 3, gl.FLOAT, gl.FALSE,
        Float32Array.BYTES_PER_ELEMENT * 6, 0);
}

function setDrawColor(drawColor){
    vColor = gl.getUniformLocation(program, "vColor");
    gl.uniform4fv( vColor, new Float32Array(drawColor) );
}
function setUniforms(thetaLocation,thetaValue,
                     translationLocation,translationValue){
    gl.uniform3fv(thetaLocation, thetaValue);
    gl.uniform3fv(translationLocation, translationValue);
}

function translate() {

    //Object Model 1
    if(leftRight[0] && translations[0][0]<0.2) {
        translations[0][0] += updateTrans[0];
    }
    else if (leftRight[0]){
        leftRight[0]=false;
    }
    if(!leftRight[0] && translations[0][0]> -0.2) {
        translations[0][0] -= updateTrans[0];
    }
    else if (!leftRight[0]){
        leftRight[0]=true;
    }

    //Object Model 2
    if(leftRight[1] && translations[1][0]<0.6) {
        translations[1][0] += updateTrans[1];
    }
    else if (leftRight[1]){
        leftRight[1]=false;
    }
    if(!leftRight[1] && translations[1][0]> -0.6) {
        translations[1][0] -= updateTrans[1];
    }
    else if (!leftRight[1]){
        leftRight[1]=true;
    }

    //Cubes
    for(var a=0;a<updateTrans.length;a++){
        if(leftRight[a] && translations[a][0]<1) {
            translations[a][0] += updateTrans[a];
        }
        else if (leftRight[a]){
            leftRight[a]=false;
        }
        if(!leftRight[a] && translations[a][0]> -1) {
            translations[a][0] -= updateTrans[a];
        }
        else if (!leftRight[a]){
            leftRight[a]=true;
        }
    }
}
function rotate() {
    for(var y=0;y<updateRotation.length;y++){
        thetas[y][0]+=updateRotation[y][0];
        thetas[y][1]+=updateRotation[y][1];
        thetas[y][2]+=updateRotation[y][2];
    }
}