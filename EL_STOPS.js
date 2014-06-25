//Begin class

function EL_STOPS(){

	var endPoint = "http://data.cityofchicago.org/resource/8pix-ypme.json";
	var sR = new Object();

	EL_STOPS.prototype.listing = function() {

		var getData = $.ajax({
						url: endPoint,
						type: "GET",
						dataType: "json"
		});

		getData.done( function(response){

			sR.response = response;
			console.log(sR);

		});//end of response

		return this;

	}

	EL_STOPS.prototype.result = function() {

		console.log("result of stops");

		return sR;

	}

}

