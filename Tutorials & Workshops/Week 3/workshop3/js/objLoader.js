var gl;

function render(size) {
    //Clear canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Draw
    gl.drawArrays(gl.TRIANGLES, 0, size);
}

function init(object) {
    //Bind and set up Canvas.
    var canvas = document.getElementById('canvas');
    gl = canvas.getContext('webgl');
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clearColor(0.2, 0.2, 0.2, 0.3);
    //Init Webgl with shaders
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);

    //Create a WebGl buffer
    var vertexBuffer = gl.createBuffer();
    //Bind buffer to the created variable
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //Fill buffer with data
    gl.bufferData(gl.ARRAY_BUFFER, object.vertices, gl.STATIC_DRAW);

    //Bind position from variable in HTML to Webgl.
    program.positionAttribute = gl.getAttribLocation(program, 'pos');
    gl.enableVertexAttribArray(program.positionAttribute);
    //Set position to variable.
    gl.vertexAttribPointer(
        program.positionAttribute, 3, gl.FLOAT, gl.FALSE,
        Float32Array.BYTES_PER_ELEMENT * 6, 0);
    //Render
    render(object.vertexCount);

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
    loadMesh('js/monkey.obj')
});