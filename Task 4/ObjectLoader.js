var gl;
var size;
var program;
var vColor;

//Object 1
var theta1 = [ 0, 0, 0 ]; //x,y,z
var thetaLoc1;
var translationLoc1;
var translation1=0.0;
var leftToRight1=true;
var color1=[0.5, 0, 0, 1];
var updateTrans1=0.009;

//Object 2
var theta2 = [ 0, 0, 0 ]; //x,y,z
var thetaLoc2;
var translationLoc2;
var translation2=0.0;
var leftToRight2=false;
var color2=[0, 0, 0.5, 1];
var updateTrans2=0.004;

//Cube
var points = [];
var vertexCubeBuffer;
var vertexBuffer;

//Cube 1
var thetaCube1 = [ 0, 0, 0 ]; //x,y,z
var thetaLocCube1;
var translationLocCube1;
var translationCube1= 0.6;
var colorForCube1=[0, 0, 0.5, 1];
//Cube 2
var thetaCube2 = [ 0, 0, 0 ]; //x,y,z
var thetaLocCube2;
var translationLocCube2;
var translationCube2= -0.6;
var colorForCube2=[0.5, 0, 0, 1];
//Cube 3
var thetaCube3 = [ 0, 0, 0 ]; //x,y,z
var thetaLocCube3;
var translationLocCube3;
var translationCube3= 0.2;
var colorForCube3=[0, 1, 1, 1];
//Cube 4
var thetaCube4 = [ 0, 0, 0 ]; //x,y,z
var thetaLocCube4;
var translationLocCube4;
var translationCube4= -0.2;
var colorForCube4=[1, 0, 1, 1];





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



function render() {
    //Clear canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Draw
    renderObj1();
    renderObj2();
    renderCube1();
    renderCube2();
    renderCube3();
    renderCube4();

    //Calculate our new rotation and position/translation1 (For next Render).
    calculations();


    requestAnimFrame( render );
}

function renderObj1() {
    //Update variables
    var colorUpdate=translation1+0.4;
    color1= [0.5, colorUpdate, 0, 1];
    setDrawColor(color1);
    setUniforms(thetaLoc1,theta1,translationLoc1,translation1);
    bufferAndPointerObj();
    gl.drawArrays(gl.TRIANGLES, 0, size );
}
function renderObj2(){
    //Update variables
    var colorUpdate=translation2+0.4;
    color2= [0, 0.5 , colorUpdate, 1];
    setDrawColor(color2);
    setUniforms(thetaLoc2,theta2,translationLoc2,translation2);
    bufferAndPointerObj();
    gl.drawArrays(gl.TRIANGLES, 0, size );
}

function renderCube1(){
    thetaCube1[1] += 5.0;
    setDrawColor(colorForCube1);
    setUniforms(thetaLocCube1,thetaCube1,translationLocCube1,translationCube1);
    bufferAndPointerCube();
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
function renderCube2(){
    thetaCube2[1] += -5.0;
    setDrawColor(colorForCube2);
    setUniforms(thetaLocCube1,thetaCube2,translationLocCube1,translationCube2);
    bufferAndPointerCube();
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
function renderCube3(){
    thetaCube3[1] += 2.0;
    setDrawColor(colorForCube3);
    setUniforms(thetaLocCube3,thetaCube3,translationLocCube3,translationCube3);
    bufferAndPointerCube();
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
function renderCube4(){
    thetaCube4[1] += -2.0;
    setDrawColor(colorForCube4);
    setUniforms(thetaLocCube4,thetaCube4,translationLocCube4,translationCube4);
    bufferAndPointerCube();
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
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

function setDrawColor(colour){
    vColor = gl.getUniformLocation(program, "vColor");
    gl.uniform4fv( vColor, new Float32Array(colour) );
}

function setUniforms(thetaLocation,thetaValue,
                     translationLocation,translationValue){
    gl.uniform3fv(thetaLocation, thetaValue);
    gl.uniform1f(translationLocation, translationValue);
}

function calculations() {

    //****** Object 1 ******
    //Rotation
    theta1[1] += 1.0;

    //Translation
    if (leftToRight1 && translation1 <0.2){
        translation1+=updateTrans1;
    }
    else if (leftToRight1){
        leftToRight1=false;
    }

    if (!leftToRight1 && translation1 > -0.2){
        translation1-=updateTrans1;
    }
    else if(!leftToRight1){
        leftToRight1=true;
    }



    //****** Object 2 ******
    //Rotation
    theta2[1] += 5.0;

    //Translation
    if (leftToRight2 && translation2 <0.6){
        translation2+=updateTrans2;
    }
    else if (leftToRight2){
        leftToRight2=false;
    }

    if (!leftToRight2 && translation2 > -0.6){
        translation2-=updateTrans2;
    }
    else if(!leftToRight2){
        leftToRight2=true;
    }



}

function init(object) {
    //Bind and set up Canvas.
    var canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl');
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);
    //Init Webgl with shaders
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);

    createCube();

    //Create a WebGl buffer
    vertexBuffer = gl.createBuffer();
    //Bind buffer to the created variable
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //Fill buffer with data
    gl.bufferData(gl.ARRAY_BUFFER, object.vertices, gl.STATIC_DRAW);

    //Bind position from variable in HTML to Webgl.
    program.positionAttribute = gl.getAttribLocation(program, 'pos');
    gl.enableVertexAttribArray(program.positionAttribute);

    //Create a WebGl buffer
    vertexCubeBuffer = gl.createBuffer();
    //Bind buffer to the created variable
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexCubeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    //Object 1- Rotation and Translation positions/values.
    thetaLoc1 = gl.getUniformLocation(program, "theta");
    translationLoc1 = gl.getUniformLocation(program, "translation");

    //Object 2- Rotation and Translation positions/values.
    thetaLoc2 = gl.getUniformLocation(program, "theta");
    translationLoc2 = gl.getUniformLocation(program, "translation");

    //Cubes
    thetaLocCube1 = gl.getUniformLocation(program, "theta");
    translationLocCube1 = gl.getUniformLocation(program, "translation");

    thetaLocCube2 = gl.getUniformLocation(program, "theta");
    translationLocCube2 = gl.getUniformLocation(program, "translation");

    thetaLocCube3 = gl.getUniformLocation(program, "theta");
    translationLocCube3 = gl.getUniformLocation(program, "translation");

    thetaLocCube4 = gl.getUniformLocation(program, "theta");
    translationLocCube4 = gl.getUniformLocation(program, "translation");

    //Render
    size=object.vertexCount;
    render();

}
//**** Cube ******
function createCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function quad(a, b, c, d)
{
    var cS=0.05;
    var vertices = [
        vector3( -cS, -cS,  cS ),
        vector3( -cS,  cS,  cS ),
        vector3(  cS,  cS,  cS ),
        vector3(  cS, -cS,  cS ),
        vector3( -cS, -cS, -cS ),
        vector3( -cS,  cS, -cS ),
        vector3(  cS,  cS, -cS ),
        vector3(  cS, -cS, -cS )

    ];
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );

    }
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

function loadMesh(filename) {
    $.ajax({
        url: filename,
        dataType: 'text'
    }).done(function(data) {
        init(loadMeshData(data));
    }).fail(function() {
        alert('Failed to retrieve [' + filename + "]");
    });
}

$(document).ready(function() {
    loadMesh('../Resources/triangles.obj');
});

