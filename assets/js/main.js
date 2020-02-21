// profile image
var app = {
    imageHandler:function() {
        $("#upload").on('change', function() {
            //alert("alert");
            readUrl();
        });
        function readUrl (){
            var file = $("#upload")[0].files[0];
            //console.log(file);
            //reader interprets the file selected
            var reader = new FileReader();
                //console.log(reader.result);
            reader.onloadend = function (){
                //console.log(reader.result);
                $("#picture_preview").attr("src", reader.result);
                //$("#picture_preview")[0].src = "" + reader.results;
                //console.log($("#picture_preview"));
                //console.log(reader.result);
            }
            if(file){
                reader.readAsDataURL(file);
            }
        }
    }//end of imageHandler

}

app.imageHandler();

$("[data-toggle=popover]").popover({
    html: true, 
    content: function() {
        return $('#popover-content').html();
    }
});

// profile image end




// dashboard show and hide
    $('#openSidebar').click(function(){
    $('.leftbar').addClass('biger');
    });
    $('#closebtn').click(function(){
        $('.leftbar').removeClass('biger');
    });


    // product increase
    	$(document).ready(function() {
			$('.minus').click(function () {
				var $input = $(this).parent().find('input');
				var count = parseInt($input.val()) - 1;
				count = count < 0 ? 0 : count;
				$input.val(count);
				$input.change();
				return false;
			});
			$('.plus').click(function () {
				var $input = $(this).parent().find('input');
				$input.val(parseInt($input.val()) + 1);
				$input.change();
				return false;
			});
		});
    // product increase end

    // select to hide and show div
    $(document).ready(function(){
	    $("select").change(function(){
	        $(this).find("option:selected").each(function(){
	            var optionValue = $(this).attr("value");
	            if(optionValue){
	                $(".box").not("." + optionValue).hide();
	                $("." + optionValue).show();
	            } else{
	                $(".box").hide();
	            }
	        });
	    }).change();
	});
    // select to hide and show div end




    





