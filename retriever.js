//Begin class

function RETRIEVER(){

	var offset = 0;
	var endPoint = "http://data.cityofchicago.org/resource/a95h-gwzm.json?$q=CTA&$offset=" + offset + "&$select=location,primary_type,block,date&$where=primary_type = 'ASSAULT' OR primary_type = 'BATTERY' OR primary_type = 'ROBBERY' OR primary_type = 'THEFT'";

	RETRIEVER.prototype.SodaCall = function(){

		var receptacle = new Object();

		var getData = $.ajax({
						url: endPoint,
						type: "GET",
						dataType: "json"
					});

					getData.done( function(response){

						for (var i = offset; i < response.length + offset; i++){
							receptacle[i] = response[i];
						}

					});//end of response

		return receptacle;

	}//end SodaCall

}