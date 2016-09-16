/**
 * Authors:
 * Andreas Andersson n9795383
 * Li-Fu Hsu n9380418
 */

//Change translate speed.
$(document).keydown(function(event){
    if(modelSelected) {
        if ("W" == String.fromCharCode(event.which)) {
            if (updateTrans[match] < 0.1) {
                updateTrans[match] += 0.004;
            }
        }
        if ("S" == String.fromCharCode(event.which)) {
            if (updateTrans[match] >= 0.0041) {
                updateTrans[match] -= 0.004;
            } else {
                updateTrans[match] = 0;
            }
        }
        $("#Translate").text("Object" + match + " Translate-Speed:" + updateTrans[match]);
    }
});

//Picking Function
function picking(){

    $( "#Translate").text("Picking Function called.");
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
        alert("this combination of attachments does not work");
        return;
    }

    //Bind the buffer to draw the "Invisible" buffer.
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.viewport(0, 0, 500, 500);

        gl.clear( gl.COLOR_BUFFER_BIT);
        render(false);
    //Get coordinates
    var x = event.clientX;
    var y = canvas.height -event.clientY;
    //Get colour values from the picker, bind them to the "color" variable.
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, colorPick);
    $( "#Translate").text("Picking Color:"+colorPick[0]+","+colorPick[1]+","+colorPick[2]+","+colorPick[3]);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    modelSelected=false;
    
    for (var x=0;x<modelColors.length;x++){
        if(colorPick[0] == Math.round(tempModelColors[x][0]*255) && colorPick[1] == Math.round(tempModelColors[x][1]*255)
                && colorPick[2] == Math.round(tempModelColors[x][2]*255) && colorPick[3] == Math.round(tempModelColors[x][3]*255))
             {
                 modelSelected=true;
                 match=x;

                 $( "#info").text("Object picked "+x+"!");
            console.log("MATCH! Object: "+x +", AS INT:"+parseInt(tempModelColors[x][0]*255)+", "
                +parseInt(tempModelColors[x][1]*255)+", "
                +parseInt(tempModelColors[x][2]*255)+", "+parseInt(tempModelColors[x][3]*255));

        }

        console.log("AS INT:"+Math.round(tempModelColors[x][0]*255)+", "
            +Math.round(tempModelColors[x][1]*255)+", "+Math.round(tempModelColors[x][2]*255)+", "
            +Math.round(tempModelColors[x][3]*255));
    }
    if(!modelSelected){
        $( "#info").text("Background picked!");
    }
    else{
        $("#y").slider('value',translations[match][1]);
    }
}




