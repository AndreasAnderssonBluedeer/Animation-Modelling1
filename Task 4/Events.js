/**
 * Created by Andreas on 9/09/2016.
 */
//KeyEvent
$(document).keydown(function(event){
    //Object 1
    if ("W"== String.fromCharCode(event.which)){
        if (updateTrans1 < 0.1) {
            updateTrans1 += 0.004;
        }
    }
    if ("S"== String.fromCharCode(event.which)){
        if(updateTrans1>=0.0041){
            updateTrans1-=0.004;
        }else{
            updateTrans1=0;
        }
    }

    //Object 2
    if ("R"== String.fromCharCode(event.which)) {
        if (updateTrans2 < 0.1) {
            updateTrans2 += 0.004;
        }
    }
    if ("F"== String.fromCharCode(event.which)){
        if(updateTrans2>=0.0041){
            updateTrans2-=0.004;
        }
        else{
            updateTrans2=0;
        }

    }
    $( "#Translate").text("Object1 Translate-Speed:"+updateTrans1
        +" Object2 Translate-Speed:"+updateTrans2);
});

//Picking Function
function picking(){

    $( "#Translate").text("Picking Function called.");
    //Bind the buffer to draw the "Invisible" buffer.
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    // gl.clear( gl.COLOR_BUFFER_BIT);
    // mode=false;
    // gl.uniform3fv(thetaLoc, theta);
    // for(var i=0; i<6; i++) {
        //Bind variables to program/HTML
        //Loops through the colours and draws one face for each colour. 
        //Create a color list and a theta list?
        // gl.uniform1i(gl.getUniformLocation(program, "i"), i+1);

        //Renders the colours for the picker.
        // gl.drawArrays( gl.TRIANGLES, 6*i, 6 );
    // }
    //Get coordinates
    var x = event.clientX;
    var y = canvas.height -event.clientY;
    //Get colour values from the picker, bind them to the "color" variable.
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, colorPick);
    $( "#Translate").text("Picking Color:"+colorPick[0]+","+colorPick[1]+","+colorPick[2]+","+colorPick[3]);
    //Statements to determine objects compared to colour.
    // But how do they work? Doesn't compare colour value..
    // if(color[0]==255)
    //     if(color[1]==255) elt.innerHTML = "<div> cyan </div>";
    //     else if(color[2]==255) elt.innerHTML = "<div> magenta </div>";
    //     else elt.innerHTML = "<div> red </div>";
    // else if(color[1]==255)
    //     if(color[2]==255) elt.innerHTML = "<div> blue </div>";
    //     else elt.innerHTML = "<div> yellow </div>";
    // else if(color[2]==255) elt.innerHTML = "<div> green </div>";
    // else elt.innerHTML = "<div> background </div>";

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // mode=true;
    // render(true);
    // gl.uniform1i(gl.getUniformLocation(program, "i"), 0);
    // gl.clear( gl.COLOR_BUFFER_BIT );
    // // gl.uniform3fv(thetaLoc, theta);
    // gl.drawArrays(gl.TRIANGLES, 0, 36);
}

