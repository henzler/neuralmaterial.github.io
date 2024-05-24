
function generateGrid(type, method_id, ids) {

    for(var i = 0; i < ids.length; i++){

        var id = ids[i];
        var src = "results/"+ type +"/"+ method_id +"/" + id + "/shaded_000_0.jpg"
        var image = "<img src='" + src +"' data-type='"+ type +"' id='"+ i +"' style='border: 5px solid white;cursor: pointer;width:128px;'>";

        $('#'+ type).append(image);
    }

    $('img').click(function() {
    	window.location.href = "scripts/details.html?id="+this.id+"&type="+$(this).attr('data-type');
    });

    $('img').hover(function() {
    	$(this).css("border","5px solid grey")
    });

    $('img').mouseleave(function() {
    	$(this).css("border","5px solid white")
    });

    $('img').mouseover(function() {
    	$(this).css("border","5px solid grey")
    });
}

$(document).ready(function () {
    var jsonData = JSON.parse(data);
    var synIds = jsonData['ids'];
    var genIds = jsonData['gen_ids'];
    // var genIds = Array.from(Array(10).keys());

    generateGrid('generation', 'ours', genIds);
    generateGrid('resynthesis', 'ours_fine', synIds);

    if($('#iGeneration').is(':checked')){
        $('#resynthesis').hide();
        $('#generation').show();
    }

    if($('#iResynthesis').is(':checked')){
        $('#resynthesis').show();
        $('#generation').hide();
    }

    $('input:radio').change(function() {
        if( $(this).is(":checked") ){
            var type = $(this).val();
            if (type == 'resynthesis') {
                $('#resynthesis').show();
                $('#generation').hide();
            } else {
                $('#resynthesis').hide();
                $('#generation').show();
            }
        }
    });
});