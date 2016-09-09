/**
 * Created by Andreas on 9/09/2016.
 */
function render(normalMode) {
    //Clear canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Draw
    renderObj1(normalMode);
    renderObj2(normalMode);
    renderCube1(normalMode);
    renderCube2(normalMode);
    renderCube3(normalMode);
    renderCube4(normalMode);

    //Calculate our new rotation and position/translation1 (For next Render).
    translate();
    
        requestAnimFrame(render);

}

function renderObj1(normalMode) {
    //Update variables
    thetas[0][1] += 1.0;
    var colorUpdate=translations[0]+0.4;
    modelColors[0]= [0.5, colorUpdate, 0, 1];
    setDrawColor(modelColors[0]);
    setUniforms(thetaLocs[0],thetas[0],translationLocs[0],translations[0]);
    bufferAndPointerObj(normalMode);
    gl.drawArrays(gl.TRIANGLES, 0, size );
}
function renderObj2(normalMode){
    //Update variables
    thetas[1][1] += 5.0;
    var colorUpdate=translations[1]+0.4;
    modelColors[1]= [0, 0.5 , colorUpdate, 1];
    setDrawColor(modelColors[1]);
    setUniforms(thetaLocs[1],thetas[1],translationLocs[1],translations[1]);
        bufferAndPointerObj(normalMode);
        gl.drawArrays(gl.TRIANGLES, 0, size);

}

function renderCube1(normalMode){
    thetas[2][1] += 5.0;
    setDrawColor(modelColors[2]);
    setUniforms(thetaLocs[2],thetas[2],translationLocs[2],translations[2]);
        bufferAndPointerCube(normalMode);
        gl.drawArrays(gl.TRIANGLES, 0, points.length);

}
function renderCube2(normalMode){
    thetas[3][1] += -5.0;
    setDrawColor(modelColors[3]);
    setUniforms(thetaLocs[3],thetas[3],translationLocs[3],translations[3]);
        bufferAndPointerCube(normalMode);
        gl.drawArrays(gl.TRIANGLES, 0, points.length);

}
function renderCube3(normalMode){
    thetas[4][1] += 2.0;
    setDrawColor(modelColors[4]);
    setUniforms(thetaLocs[4],thetas[4],translationLocs[4],translations[4]);
        bufferAndPointerCube(normalMode);
        gl.drawArrays(gl.TRIANGLES, 0, points.length);

}
function renderCube4(normalMode) {
    thetas[5][1] += -2.0;
    setDrawColor(modelColors[5]);
    setUniforms(thetaLocs[5], thetas[5], translationLocs[5], translations[5]);
    bufferAndPointerCube(normalMode);
    gl.drawArrays(gl.TRIANGLES, 0, points.length);

}

function bufferAndPointerCube(normalMode){
    if (normalMode) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexCubeBuffer);
    }
    gl.vertexAttribPointer(
        program.positionAttribute, 3, gl.FLOAT, gl.FALSE,
        0 , 0);
}
function bufferAndPointerObj(normalMode){
    if (normalMode) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    }
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
    //****** Object 1 ******
    //Translation
    if (leftToRight1 && translations[0] <0.2){
        translations[0]+=updateTrans1;
    }
    else if (leftToRight1){
        leftToRight1=false;
    }

    if (!leftToRight1 && translations[0] > -0.2){
        translations[0]-=updateTrans1;
    }
    else if(!leftToRight1){
        leftToRight1=true;
    }
    //****** Object 2 ******
    //Translation
    if (leftToRight2 && translations[1] <0.6){
        translations[1]+=updateTrans2;
    }
    else if (leftToRight2){
        leftToRight2=false;
    }

    if (!leftToRight2 && translations[1]> -0.6){
        translations[1]-=updateTrans2;
    }
    else if(!leftToRight2){
        leftToRight2=true;
    }
}