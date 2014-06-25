//Begin class

function EL_STOPS(){

	var endPoint = "http://data.cityofchicago.org/resource/8pix-ypme.json";
	var data = new Object();

	EL_STOPS.prototype.listing = function() {
		console.log("listing");
		var getData = $.ajax({
						url: endPoint,
						context: this,
						type: "GET",
						dataType: "json"
		});

		getData.done( function(response){

			data = response;
			this.results(data);

		});//end of response

		return this;

	}

	EL_STOPS.prototype.results = function(suppliedData) {
		console.log("results");
		var theData = suppliedData;
		return data;
	}

}

