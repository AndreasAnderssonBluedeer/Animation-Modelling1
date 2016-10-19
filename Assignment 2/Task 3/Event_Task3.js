/**
 * Created by Andreas on 18/10/2016.
 */
$(document).keydown(function(event){
    if(!fall) {
        //Go Left
        if ("A" == String.fromCharCode(event.which)) {
            if (transX > -0.8) {
                transX -= 0.04;
            }

        }
        //Go Up/Forward
        if ("S" == String.fromCharCode(event.which)) {
            if (transY < 0.8) {
                transY += 0.04;
            }
        }
        //Go Right
        if ("D" == String.fromCharCode(event.which)) {
            if (transX < 0.8) {
                transX += 0.04;
            }
        }

        //Fall down
        if ("Z" == String.fromCharCode(event.which)) {
            fall = true;
        }

    }
});