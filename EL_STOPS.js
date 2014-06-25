//Begin class

function EL_STOPS(){

	var endPoint = "http://data.cityofchicago.org/resource/8pix-ypme.json";
	var data = new Object();

	EL_STOPS.prototype.listing = function() {
		console.log("listing");
		var getData = $.ajax({
						url: endPoint,
						type: "GET",
						dataType: "json",
						complete: function (data) {success(data);}

		});

		function success(data){
			console.log(data);
		}

	}

}

