/**
 * Created by Andreas on 18/10/2016.
 */
$(document).keydown(function(event){
    //Rotate Left
    if(!fall) {
        if ("A" == String.fromCharCode(event.which)) {
            theta[belly] -= 10;
            console.log("rotation:" + theta[belly]);

        }
        //Go Forward /Speed Up
        if ("S" == String.fromCharCode(event.which)) {
            if(moveY<=-1){
                rise=true;
            }
            moveSpeed += 0.01;
        }
        //Rotate Right
        if ("D" == String.fromCharCode(event.which)) {
            theta[belly] += 10;
            console.log("rotation:" + theta[belly]);
        }
        if (theta[belly] >= 360 || theta[belly] <= -360) {
            theta[belly] = 0;
            console.log("rotation:" + theta[belly]);
        }

        if("Z" == String.fromCharCode(event.which)) {
            fall=true;
        }
    }
});