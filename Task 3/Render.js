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

    if (loop){
    translate();
        requestAnimFrame(render);
    }

    loop=true;
}

function renderObj1() {
    //Update variables
    if(loop) {
        thetas[0][1] += 1.0;
        var colorUpdate = translations[0] + 0.4;
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
        thetas[1][1] += 5.0;
        var colorUpdate = translations[1]  + 0.4;
        modelColors[1] = [0, 0.5, colorUpdate, 1];
    }
    setDrawColor(modelColors[1]);
    setUniforms(thetaLocs[1],thetas[1],translationLocs[1],translations[1]);
        bufferAndPointerObj();
        gl.drawArrays(gl.TRIANGLES, 0, size);

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
    gl.uniform1f(translationLocation, translationValue);
}

function translate() {

    //Object Model 1
    if(leftRight[0] && translations[0]<0.2) {
        translations[0] += updateTrans[0];
    }
    else if (leftRight[0]){
        leftRight[0]=false;
    }
    if(!leftRight[0] && translations[0]> -0.2) {
        translations[0] -= updateTrans[0];
    }
    else if (!leftRight[0]){
        leftRight[0]=true;
    }

    //Object Model 2
    if(leftRight[1] && translations[1]<0.6) {
        translations[1] += updateTrans[1];
    }
    else if (leftRight[1]){
        leftRight[1]=false;
    }
    if(!leftRight[1] && translations[1]> -0.6) {
        translations[1] -= updateTrans[1];
    }
    else if (!leftRight[1]){
        leftRight[1]=true;
    }
}