
function updateComparisonRows() {
    var columns = ['shaded_000', 'shaded_001', 'diffuse', 'specular', 'roughness', 'normal'];

    if (type == 'generation') {
        updateComparisonRow("Ours", 'ours', columns);
    } else {
        updateComparisonRow("Ours", 'ours_fine', columns);
        updateComparisonRow("Deschaintre et al.", 'deschaintre', columns);
        updateComparisonRow("Guo et al.", 'guo', columns);
        updateComparisonRow("Gao et al.", 'gao', columns);
        updateComparisonRow("Aitalla et al. (rendered at 3x3 tiles)", 'aittala', columns);
        updateComparisonRow("Zhao et al.", 'zhao', columns);
        updateComparisonRow("Ours non-tuned", 'ours', columns);
        updateComparisonRow("Ours single", 'ours_single', columns);
    }
}

function setComparisonRows() {
    var columns = ['shaded_000', 'shaded_001', 'diffuse', 'specular', 'roughness', 'normal'];

    if (type == 'generation') {
        var row = setComparisonRow("Ours", 'ours', columns);
        $('#tbDecomposition tbody').append(row);
    } else {
        var row = setComparisonRow("Ours", 'ours_fine', columns);
        row += setComparisonRow("Deschaintre et al.", 'deschaintre', columns);
        row += setComparisonRow("Guo et al.", 'guo', columns);
        row += setComparisonRow("Gao et al.", 'gao', columns);
        row += setComparisonRow("Aittala et al. (rendered at 3x3 tiles)", 'aittala', columns);
        row += setComparisonRow("Zhao et al.", 'zhao', columns);
        row += setComparisonRow("Ours non-tuned", 'ours', columns);
        row += setComparisonRow("Ours single", 'ours_single', columns);
        $('#tbDecomposition tbody').append(row);
    }
}

function updateComparisonRow(method, method_id, columns){
   $('#decomposition_'+method_id).innerHTML = method;
    var currentSeed = "_" + seed;

   for(var i = 0; i < columns.length; i++) {
        var column = columns[i];
        var postfix = 'jpg';
        if (!method_id.includes('ours')){
            currentSeed = "";
        }
        // if ((type == "generation" || method_id == 'ours_fine') && (column == 'diffuse' || column == 'specular' ||
        // column == 'roughness' || column == 'normal')) {
        //     postfix = 'png';
        // }
        $('#decomposition_'+method_id+'_'+i).attr('src', src=base + type + '/' + method_id + '/' + material_id + '/'+ column + currentSeed +'.' + postfix)
    }
}
function setComparisonRow(method, method_id, columns){
    var row = '<tr><td colspan="5" id="decomposition_'+ method_id +'">'+ method +' <tr>';
    var currentSeed = "_" + seed;

    for(var i = 0; i < columns.length; i++) {
        var column = columns[i];
        var postfix = 'jpg';

        if (method_id.includes('ours')){
            if ((type == "generation" || method_id == 'ours_fine') && (column == 'diffuse' || column == 'specular' ||
            column == 'roughness' || column == 'normal')) {
                // postfix = 'png';
            }
        }
        else {
            currentSeed = "";
        }
        row += '<td><img id="decomposition_'+method_id+'_'+i+'" width="100%" src="'+ base + type + '/' + method_id + '/' + material_id + '/'+ column + currentSeed + '.' +postfix+'"/></td>'

    }
    return row + "</tr>";
}

function setInterpolationRow(id2, method_id, method){
    var row = '<tr> <td id="inter_'+method_id+'">'+ method +'</td> <tr>';

    for(var i = 6; i >= 0; i--) {
        row += '<td><img id="inter_'+method_id+'_'+i+'" width="100%" src="'+ base +'interpolation/' + method_id + '/' + material_id + '_to_' + id2 + '/inter_'+i+'.jpg"/></td>'
    }

    return row;
}

function updateInterpolationRow(id2, method_id, method){
    $("#inter_"+method_id).innerHTML = method;

    for(var i = 6; i >= 0; i--) {
        $('#inter_'+method_id+'_'+i).attr('src', base + 'interpolation/' + method_id + '/' + material_id + '_to_' + id2 + '/inter_'+i+'.jpg')
    }
}

function setInterpolationRows(id2) {
    var row = setInterpolationRow(id2, 'ours_fine', 'Ours');
    row += setInterpolationRow(id2, 'guo', 'Guo et al.');
    row += setInterpolationRow(id2, 'ours_single', 'Ours single');
    row += setInterpolationRow(id2, 'ours', 'Ours none-finetuned');
    $('#tbInterpolation tbody').append(row);
}

function updateInterpolationRows(id2) {
    updateInterpolationRow(id2, 'ours_fine', 'Ours');
    updateInterpolationRow(id2, 'guo', 'Guo et al.');
    updateInterpolationRow(id2, 'ours_single', 'Ours single');
    updateInterpolationRow(id2, 'ours', 'Ours none-finetuned');
}

function updateInterpolation(){
    activeInterpolationId = 0;
    for(var i = 0; i < inter_ids.length; i++){
        var id2 = inter_ids[i];
        var src = base + "interpolation/ours_fine/" + material_id + "_to_" + id2 + "/"+id2+".jpg";
        $('#' + i).attr('src', src);
    }
}
function setInterpolation() {

    if (type == "resynthesis") {
        //Interpolation

        activeInterpolationId = 0;
        var images = "";
        for(var i = 0; i < inter_ids.length; i++){
            var id2 = inter_ids[i];
            var src = base + "interpolation/ours_fine/" + material_id + "_to_" + id2 + "/"+id2+".jpg";

            images += "<img data-interId='+id2+' width='128px' src='" + src +"' id='"+ i +"' style='border: 5px solid white;cursor: pointer;'>";
            // images += "<img width='25%' src='" + src +"' id='"+ id2 +"' style='border: 5px solid white;cursor: pointer;'>";
        }
        $('#interpolationImages').append(images);
        $('#'+activeInterpolationId).css("border","5px solid green");

        $('#interpolationImages img').click(function() {
            $('#interpolationImages img').css("border","5px solid white");
            updateInterpolationRows(inter_ids[this.id]);
            activeInterpolationId = this.id;
            $(this).css("border","5px solid green");
        });

        $('#interpolationImages img').hover(function() {
            if (this.id != activeInterpolationId) {
                $(this).css("border","5px solid grey");
            }
        });

        $('#interpolationImages img').mouseleave(function() {
            if (this.id != activeInterpolationId) {
                $(this).css("border","5px solid white");
            }
        });

        $('#interpolationImages img').mouseover(function() {
            if (this.id != activeInterpolationId) {
                $(this).css("border","5px solid grey");
            }
        });

        setInterpolationRows(inter_ids[0]);
    }
}

function shaderProgram(gl, vs, fs) {
	var prog = gl.createProgram();
	var addshader = function(type, source) {
		var s = gl.createShader((type == 'vertex') ?
			gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
		gl.shaderSource(s, source);
		gl.compileShader(s);
		if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
			throw "Could not compile "+type+
				" shader:\n\n"+gl.getShaderInfoLog(s);
		}
		gl.attachShader(prog, s);
	};
	addshader('vertex', vs);
	addshader('fragment', fs);
	gl.linkProgram(prog);
	if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		throw "Could not link the shader program!";
	}
	return prog;
}

function attributeSetFloats(gl, prog, attr_name, rsize, arr) {
	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr),
		gl.STATIC_DRAW);
	var attr = gl.getAttribLocation(prog, attr_name);
	gl.enableVertexAttribArray(attr);
	gl.vertexAttribPointer(attr, rsize, gl.FLOAT, false, 0, 0);
}

function updateMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();

    mousePositionX =
			(evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mousePositionY =
			(evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;

    if(gl) {
        drawBRDFNoise();
    }
}

function loadTexture(image) {

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // Upload the image into the texture.
    var mipLevel = 0;               // the largest mip
    var internalFormat = gl.RGB;   // format we want in the texture
    var srcFormat = gl.RGB;        // format of data we are supplying
    var srcType = gl.UNSIGNED_BYTE; // type of data we are supplying
    gl.texImage2D(gl.TEXTURE_2D,
                  mipLevel,
                  internalFormat,
                  srcFormat,
                  srcType,
                  image);

    return texture;
}

function getFilename(channel) {
    var method_id;
    if (type == 'generation') {
        method_id = 'ours';
    } else {
        method_id = 'ours_fine'
    }
    return base + type + '/'+ method_id +'/' + material_id + "/" +channel+ '_' + seed + "_rec.png";
}

function drawBRDFNoise() {

    try {
        var diffuseTexture = loadTexture(images[0]);
        var specularTexture = loadTexture(images[1]);
        var roughnessTexture = loadTexture(images[2]);
        var normalTexture = loadTexture(images[3]);
        $('#warning').hide();
    } catch (exception) {
        $('#warning').show();
        return;
    }

    gl.viewport(0, 0, webGLCanvas.width, webGLCanvas.height);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, diffuseTexture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, specularTexture);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, roughnessTexture);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, normalTexture);
    gl.useProgram(prog);

    var lightPosition = [
        (2 * mousePositionX / webGLCanvas.width - 1),
        0.7 * (1 - 2 * mousePositionY / webGLCanvas.height),
        2
    ];

    gl.uniform1i(gl.getUniformLocation(prog, 'diffuseTexture'), 0);
    gl.uniform1i(gl.getUniformLocation(prog, 'specularTexture'), 1);
    gl.uniform1i(gl.getUniformLocation(prog, 'roughnessTexture'), 2);
    gl.uniform1i(gl.getUniformLocation(prog, 'normalTexture'), 3);
    gl.uniform3f(gl.getUniformLocation(prog, 'lightPosition'), lightPosition[0], lightPosition[1], lightPosition[2]);

    var lightMode = document.getElementById("lightMode").selectedIndex;
    var useDiffuseMap = document.getElementById("diffuseMode").selectedIndex;
    var useSpecularMap = document.getElementById("specularMode").selectedIndex;
    var useRoughnessMap = document.getElementById("roughnessMode").selectedIndex;
    var useNormalMap = document.getElementById("normalMode").selectedIndex;
    gl.uniform1i(gl.getUniformLocation(prog, 'lightMode'), lightMode);
    gl.uniform1i(gl.getUniformLocation(prog, 'diffuseMode'), useDiffuseMap);
    gl.uniform1i(gl.getUniformLocation(prog, 'specularMode'), useSpecularMap);
    gl.uniform1i(gl.getUniformLocation(prog, 'roughnessMode'), useRoughnessMap);
    gl.uniform1i(gl.getUniformLocation(prog, 'normalMode'), useNormalMap);

    attributeSetFloats(gl, prog, "pos", 2, [
        1,1,
        -1,1,
        1,-1,
        -1,-1
    ]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function loadImage(channel, callback) {
  var image = new Image();
  var url = getFilename(channel);
  requestCORSIfNotSameOrigin(image, url);
  image.src = url;
  image.onload = callback;

  return image;
}

function render() {

    images = [];
    var channels = ['diffuse', 'specular', 'roughness', 'normal'];
    var imagesToLoad = channels.length;

    var onImageLoad = function() {
        --imagesToLoad;
        // If all the images are loaded call the callback.
        if (imagesToLoad === 0) {
            setupWebGL(images);
            if(gl) {
                drawBRDFNoise();
            }
        }
    };

    for (var ii = 0; ii < imagesToLoad; ++ii) {
        var image = loadImage(channels[ii], onImageLoad);
        images.push(image);
    }
}

function setupWebGL() {
  webGLCanvas = document.querySelector("#canvas");
  gl = webGLCanvas.getContext("webgl2");

  if (!gl) {

      $('#webGL').hide();
      $('#noWebGL').show();
      $('#backupImage').attr('src', base + 'resynthesis/ours_fine/' + material_id + '/shaded_000_0.jpg')
  } else {

    $('#webGL').show();
    $('#noWebGL').hide();

    prog = shaderProgram(gl,
        document.getElementById("renderingVertex").text,
        document.getElementById("renderingFragment").text
    );

    mousePositionX = 256;
    mousePositionY = 192;
  }



}

function getMaxMaterials() {
    if (type == 'generation') {
        return jsonData['gen_ids'].length;
    } else {
        return jsonData['ids'].length;
    }
}
function goBack() {
    document.location.href="../index.html";
}

function next() {
    id = ++id % getMaxMaterials();
    updateMaterialId(id);
    update();
}

function prev() {
    var max = getMaxMaterials();
    id = ((--id % max) + max) % max;
    updateMaterialId(id);
    update();
}

function update() {
    updateMaterialId(id);
    inter_ids = inter_mapping[material_id];

    if (type == 'generation') {
         $("#material_id").text(id);
    } else {
         $("#material_id").text(material_id);
    }

    render();
    updateComparisonRows();
    updateInterpolation();
    updateInterpolationRows(inter_ids[0]);

    if (type == 'generation') {
        $('#options').hide();
        $('#groundTruth').hide();
    } else {
        // Input image
        $('#inputImage').attr('src', base+ 'resynthesis/ours_fine/' + material_id + '/image_in.jpg')
    }
}

function refresh() {
    updateMaterialId(id);
    inter_ids = inter_mapping[material_id];

    if (type == 'generation') {
         $("#material_id").text(id);
    } else {
         $("#material_id").text(material_id);
    }

    render();
    // Comparison
    setComparisonRows();
    setInterpolation();

    if (type == 'generation') {
        $('#options').hide();
        $('#groundTruth').hide();
    } else {
        // Input image
        $('#inputImage').attr('src', base+ 'resynthesis/ours_fine/' + material_id + '/image_in.jpg')
    }
}

function updateMaterialId(id){

    if (type == 'generation') {
        material_id = jsonData['gen_ids'][id];
    } else {
        material_id = jsonData['ids'][id];
    }
}

var base = "../results/";
var prog;
var webGLCanvas;
var canvas;
var gl;
var images = [];
var mousePositionX;
var mousePositionY;
var seed;
var id;
var material_id;
var jsonData;
var type;
var activeInterpolationId;
var inter_mapping;
var inter_ids;

$(document).ready(function () {
    var params = new window.URLSearchParams(window.location.search);
    jsonData = JSON.parse(data);
    id = params.get('id');
    type = params.get('type');
    seed = $('#sSeed').val()-1;
    inter_mapping = jsonData['inter_mapping'];

    refresh();

    $("#interpolation").hide();
    $("#debugOptions").hide();

    $('input:radio').change(function() {
        if( $(this).is(":checked") ){
            var type = $(this).val();
            if (type == 'decomposition') {
                $('#decomposition').show();
                $('#interpolation').hide();
            } else {
                $('#decomposition').hide();
                $('#interpolation').show();
            }
        }
    });

    // handle seeds
    $('#sSeed').change(function(){
        seed = $('#sSeed').val()-1;
        updateComparisonRows();
        render();
    });
});

// This is needed if the images are not on the same domain
// NOTE: The server providing the images must give CORS permissions
// in order to be able to use the image with WebGL. Most sites
// do NOT give permission.
// See: http://webgl2fundamentals.org/webgl/lessons/webgl-cors-permission.html
function requestCORSIfNotSameOrigin(img, url) {
  if ((new URL(url, window.location.href)).origin !== window.location.origin) {
    img.crossOrigin = "";
  }
}
